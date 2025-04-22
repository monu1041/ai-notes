"use client"

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from "./ui/button"
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { logOutAction } from '@/actions/users'

function LogOutButton() {
    const {toast} = useToast();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true)

        

        const { errorMessage } = await logOutAction(); 

        if(!errorMessage){
            toast({
                title:"Logged out",
                description:" You have been successfully logged out"
            })
            router.push("/");
        }else{
            toast({
                title:"Error",
                description: errorMessage
            })
        }

        setLoading(false);
    }

    return (
        <Button variant="outline"
            onClick={handleLogout}
            disabled={loading}
            className='w-24'
            >
            {loading ? <Loader2 className='animate-spin' /> : "Log Out"}
        </Button>
    )
}

export default LogOutButton