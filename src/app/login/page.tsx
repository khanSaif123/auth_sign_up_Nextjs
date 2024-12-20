"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Successfully");
            router.push("/profile");
        } catch (error: any) {

        if(error.response){
            const err = error.response.data.error
            console.log("failed", error.response.data.error); 
            toast.error(err)
            return
        }
        
        } finally {
            setLoading(false);
        }
    };

    const buttonDisabled = user.email.length === 0 || user.password.length === 0; // Set buttonDisabled based on user input

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onLogin}
                disabled={buttonDisabled} // Disable button if either input is empty
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Optional: style for disabled button
            >
                Login here
            </button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    );
}
