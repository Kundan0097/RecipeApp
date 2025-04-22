"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../firebase/AuthContext";

export default function AdminDashboard() {
  const router = useRouter();
  const {isAdmin , getAllUsers} = useAuth()

  // const [search, setSearch] = useState("");
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

  const [users, setUsers] = useState<UserData[]>([]);
  

  // console.log("all users", users)
  useEffect(() => {
  
    if(!isAdmin){
      router.push("/")
    }
  }, [isAdmin,router]);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
      // console.log("all users in admin dashboard", userList);
    };

    fetchData();
  }, []);



  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center"><p className="text-2xl font-bold">Not authenticated</p></div>;
  // if(!isAdmin) return router.push('/dashboard/not-authorized')

  return (
    <div className="p-5 text-center min-h-screen">
      <h1 className="text-3xl font-bold mt-3">Welcome, Admin!</h1>
      <div className="p-6 space-y-6">

      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border rounded p-2 text-sm text-foreground bg-background"
        />
      
        
          
          <select className=" bg-black text-white border rounded p-2">
            <option> Filter by Plan</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Premium">Premium</option>
          </select>
      
      </div> */}

      <div className="p-4 overflow-x-auto">
  <div className="rounded-xl shadow-md border border-gray-200">
    <table className="min-w-full table-auto text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">UID</th>
          <th className="py-3 px-4">Subscription</th>
          <th className="py-3 px-4">CustomerId</th>
          <th className="py-3 px-4">SubscriptionId</th>
          <th className="py-3 px-4">Plan</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {users.map((user) => {
          const {
            displayName,
            email,
            id,
            subscriptionStatus,
            customer,
            customerId,
            uid,
            planType,
          } = user;
          return (
            <tr
              key={id}
              className="hover:bg-green-200 hover:text-black transition-colors duration-200"
            >
              <td className="py-3 px-4">{displayName}</td>
              <td className="py-3 px-4">{email}</td>
              <td className="py-3 px-4">{uid}</td>
              <td className="py-3 px-4">{subscriptionStatus}</td>
              <td className="py-3 px-4">{customer}</td>
              <td className="py-3 px-4">{customerId}</td>
              <td className="py-3 px-4">{planType}</td>
            </tr>
          );
        })}

        {users.length === 0 && (
          <tr>
            <td
              colSpan={6}
              className="text-center py-4 text-gray-500 italic"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
        
      

    </div>




    </div>
  );
}
