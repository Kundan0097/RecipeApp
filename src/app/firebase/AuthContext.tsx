
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/app/firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  subscriptionStatus?: string;
  customer?: string;
  customerId?: string;
  planType?: string;
}

interface AuthContextType {
  user: User | null;
  message: string | null;
  userMessage: string | null;
  isAdmin: boolean;
  isSubscribed: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  getAllUsers: () => Promise<UserData[]>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  message: null,
  userMessage: null,
  isAdmin: false,
  isSubscribed: false,
  logout: () => { },
  login: async () => Promise.resolve(),
  register: async () => Promise.resolve(),
  getAllUsers: async () => Promise.resolve([]),
  refreshUserData: async () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const router = useRouter();
  // console.log("subscription" ,isSubscribed)

  // console.log("isAdmin in context", isAdmin)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserMessage(`Welcome, ${currentUser.displayName || "User"}`)

        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const querySnapshot = getDocs(q);

        querySnapshot.then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const userData = doc.data();
              // console.log("User Data:", userData);
              if (userData?.role === "admin") {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }

              if(userData?.subscriptionStatus === "active"){
                setIsSubscribed(true)
              }else{
                setIsSubscribed(false)
              }

              
            });
          }
        });


      }
    })

    if(!user){
      setIsSubscribed(false)
    }
    return () => unsubscribe()
  }, [isAdmin , user ,isSubscribed ,setMessage ]);


  // login function+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const user = response.user
      console.log("user", user)

      // Check if the user exists in Firestore
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      // console.log("QuerySnapshot" , querySnapshot)

      if (querySnapshot.empty) {
        throw new Error("User not found in database. Please sign up first.");
      }

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // console.log("User Data:", doc.data());
          const userData = doc.data()
          // console.log("userData", userData)
          if (userData?.role === "admin") {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }

          if(userData?.subscriptionStatus === "active"){
            setIsSubscribed(true)
          }else{
            setIsSubscribed(false)
          }

          localStorage.setItem("UserData", JSON.stringify(userData))
        });
      } else {
        console.log("No user found with this UID");
      }

      const token = await user.getIdToken();
      localStorage.setItem("userToken", token || "");
      setMessage("User logged in successfully");
    } catch (error) {
      console.log("User not Found", error)
      setMessage("Invalid email or password");
      throw error
    }
  }


  // register function =+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 const register = async (email:string , password:string , fullName:string)=>{
        try {
            const response = await createUserWithEmailAndPassword(auth , email ,password);
            const user = response.user;
              console.log("user",user)
              
              // update user profile
            await updateProfile(user, {
              displayName:fullName,
            })

          const database =  await addDoc(collection(db , "users"),{
                uid:user.uid,
                email:user.email,
                displayName:fullName,
                password:password,
                role:"user",
                createdAt:new Date(),
            })

            console.log("Database" , database)

            const token = await user.getIdToken();
            // console.log("token" , token)
            localStorage.setItem("userToken", token);
            localStorage.setItem("userInfo" , JSON.stringify(user))
            setMessage("User logged in successfully");
            router.push("/")
        } catch (error) {
          setMessage("Error creating user");
          console.error("Signup Error" ,error)
            throw error
        }
}


  // logout function
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear()
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("userInfo")
      // localStorage.removeItem("UserData")

      setUser(null);
      setIsAdmin(false);
      setMessage("Logout successful 👋");
      router.push("/")
    } catch (error) {
      console.error("Logout Error", error);
      setMessage("Error logging out ❌");
    }
  };

  // for message timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  // get all users from firebase
  const getAllUsers = async (): Promise<UserData[]> => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
  
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
  
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  // refresh user data
  const refreshUserData = async () => {
    if (!user) return;
  
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
  
      setIsAdmin(userData.role === "admin");
      setIsSubscribed(userData.subscriptionStatus === "active");
      setUserMessage(`Welcome, ${userData.displayName || "User"}`);
      localStorage.setItem("UserData", JSON.stringify(userData));
    }
  };


  return (
    <AuthContext.Provider value={{ user, message, isAdmin, logout, login ,register ,isSubscribed ,userMessage ,getAllUsers ,refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




