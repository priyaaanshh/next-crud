"use client";
import React from 'react'

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2,
        { message: "Username must be at least 2 characters long." }
    ),
    password: z.string().min(8,
        { message: "Password must be at least 8 characters long." }
    ),
})

const handleSubmit = (form: UseFormReturn<z.infer<typeof formSchema>>) => {
    console.log(form.getValues())
    console.log("Submitted form.")
}

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => handleSubmit(form))} className="flex flex-col justify-center gap-2 w-full max-w-96 border shadow rounded py-4 px-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="email" type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="password" type='password' autoComplete='on' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login
