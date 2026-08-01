"use client"
import Form from "next/form"
import { useActionState, useEffect } from "react"
import { Login } from "@/app/_methods/auth"
import { Activity } from "react"
import Link from "next/link";
import Estilos from "@/app/login/styles.module.css"
import { useRouter } from "next/navigation"


const Page = () => {
    const [message, action, waiting] = useActionState(Login, {message: "", auth: false});
    const router = useRouter()
    useEffect(()=> {
        const redirect = () =>{
            if (message.auth) {
                router.push("/")
            }
        }
        redirect();
    },[message, router])

    
    return (
        <div className="main">
            <Form action={action} className={Estilos["form-container"]}>
                <fieldset>
                    <legend style={{color:"white"}}>A Song of Ice and Fire</legend>
                    <label style={{color:"white", margin:"1rem"}} htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required disabled={waiting}/> <br />
                    <label style={{color:"white", margin:"1rem"}} htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required disabled={waiting}/> <br /><br />
                    <button className="" type="submit" disabled={waiting}>Inciar sesión</button> 
                    <Activity mode={(!message.auth && message.message) ? "visible": "hidden"}>
                        <br /><span className={Estilos["mensaje-error"]}>Error: {message.message}</span>
                    </Activity>
                    <Activity mode={(message.auth && message.message) ? "visible": "hidden"}>
                        <br /><span className={Estilos["mensaje-exito"]}>Success: {message.message}</span>
                    </Activity>
                </fieldset>
            </Form>
            <Link href={"/register"} style={{margin:"0.5rem", textAlign: "center"}} className="m-11rem font-medium text-decoration-none hover:underline">
                <p style={{color:"white"}}>Create an Account</p>
            </Link>
        </div>
    );

}

export default Page