"use server"
import { Message, Payload } from "@/app/_methods/types"
import { URL_ACTUAL } from "./variables";
import { createSession } from "@/app/_methods/sesion";
import { redirect } from "next/navigation";


const Login = async (_: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    const request = await fetch(`${URL_ACTUAL}access`, {
        method: "POST",
        body: JSON.stringify({
            "username": btoa(username),
            "password": btoa(password)
        })
    });

    const body = await request.json();

    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
        const user = body["body"] as Payload;
        console.log("User Info:", user);
        await createSession(user);
        redirect("/")

    }

    return ({
        message: message_info,
        auth: auth_info
    })
}

const Register = async (_ : Message, formData : FormData) => {
    let message = "";
    let auth = false;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordAgain = formData.get("passwordAgain") as string;
    const userType = formData.get("userType") as string;
    const date = formData.get("selectedDate") as string;

    if (password != passwordAgain) {
        message = "The Paswwords Dont Match";
        auth = false;
    }

    const usuarios = await fetch(`${URL_ACTUAL}signin`, {
        method: "POST",
        body: JSON.stringify(
            {
                email: email,
                username: username,
                password: password,
                userType: userType,
                birthDate: date
            }
        )
    });


    if (usuarios.status == 200)
    {
        const body = await usuarios.json();
        message = body["info"];
        auth = true;
    }
    else
    {
        message = "ERROR";
        auth = false;
    }

    return { message, auth}
}

export { Login, Register }
