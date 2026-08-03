import { NextRequest } from "next/server";
import { mongodbConexion } from "@/app/_methods/db";

const POST = async (request: NextRequest) => {
    const body =  await request.json();
    console.log(body);
    const email = body["email"] as string;
    const username = body["username"] as string;
    const password = body["password"] as string;
    const userType = body["userType"] as string;
    const birthDate = body["birthDate"] as string;

    try {
        const client = await mongodbConexion;
        const db = client.db("hotd_db");
        const colection = db.collection("users")
        const users = await colection.find({
            "username": username
        }).toArray();

        const valEmail = await colection.find({
            "email": email
        }).toArray();

        if (users.length > 0){
            return Response.json({
                "info": "User already exist"
            }, {status: 400})
        }

        if (valEmail.length > 0){
            return Response.json({
                "info": "Email already in use"
            }, {status: 400})
        }

        const newUser = await colection.insertOne({
            email,
            username,
            password: btoa(password),
            userType,
            birthDate
        })

        if (newUser.acknowledged)
        {
            return Response.json({info: "User Registered Correctly"}, {status: 200});
        }
        else
        {
            return Response.json({info: "ERROR, ERROR WHILE SAVING NEW USER"}, {status: 400});
        }

    } 
    catch (error) 
    {
        console.log(error)
        return Response.json({info: error}, {status: 500})
    }
}

export { POST }