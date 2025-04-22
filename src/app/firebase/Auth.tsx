"use client"
import { signInWithPopup } from "firebase/auth"
import { auth, db } from "./firebase"
import { googleProvider ,facebookProvider } from "./firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
// import { useRouter } from "next/router"


// const router = useRouter()
export const signInWithGoogle = async() =>{
  try{
      const result = await signInWithPopup(auth , googleProvider)
      const user = result.user
      // console.log("User Info :" , result.user)
      localStorage.setItem("userInfo" , JSON.stringify(result.user) )

          // const database =  await addDoc(collection(db, "user"), {
          //   displayName:user.displayName,
          //   uid:user.uid,
          //   email: user.email,
          //   createdAt: new Date(),
          // });
        
              // 🔍 Check if the user already exists in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 🆕 User does not exist, so add to Firestore
          const database = await addDoc(usersRef, {
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            role: "user",
            createdAt: new Date(),
          });
          console.log(database);
        }  
        // router.push('/')
  }catch(error){
      console.error(error)
  }
}


export const signInWithFacebook = async() =>{
  try{
      const result = await signInWithPopup(auth , facebookProvider)
      // console.log("User Info :" , result.user)
      localStorage.setItem("userInfo" , JSON.stringify(result.user) )
      const user = result.user
      
      //   const database =  await addDoc(collection(db, "user"), {
      //   displayName:user.displayName,
      //   uid:user.uid,
      //   email: user.email,
      //   createdAt: new Date(),
      // });

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // 🆕 User does not exist, so add to Firestore
        const database = await addDoc(usersRef, {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
        // console.log(database);
      }  
      // router.push('/')
  }catch(error){
      console.error(error)
  }
}