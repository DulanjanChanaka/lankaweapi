'use client'
import React from "react";
import { useAuthContext} from '../../context/AuthContext'
import { useRouter } from "next/navigation";
function Find() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Find;