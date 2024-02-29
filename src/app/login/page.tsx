"use client";

import * as React from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const Login = () => {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const [data, setData] = React.useState({ username: "", password: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/login/', data);
            router.push('/');
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center h-full px-4 py-2">
            <Card className="w-full max-w-96">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to your account here...</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid w-full items-center gap-4">
                        <Input onChange={(e) => handleChange(e)} name="username" placeholder="Username" autoComplete="on" required value={data.username} />
                        <Input onChange={(e) => handleChange(e)} name="password" placeholder="Password" type="password" autoComplete="on" required value={data.password} />
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col w-full">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                        <Button onClick={() => setData({ username: "", password: "" })} variant="outline">Clear</Button>
                        <Button onClick={() => handleSubmit()} disabled={loading}>{loading ? "Logging in" : "Log in"}</Button>
                    </div>
                    <div className="flex justify-end items-end w-full pt-4 text-sm">If you don't have account, <Link href="/signup" className="text-blue-500" >click here</Link></div>
                </CardFooter>
            </Card>
        </div >
    )
}

export default Login
