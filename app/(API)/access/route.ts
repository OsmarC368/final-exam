import { NextRequest } from "next/server"
import { mongodbConexion } from "@/app/_methods/db";
import { User } from "@/app/_methods/types";
import { console } from "inspector";


const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        console.log(body)
        const username = body["username"]
        const password = body["password"]
        const client = await mongodbConexion;
        const db = client.db("hotd_db");
        const colection = db.collection("users")
        const user = await colection.findOne({
            "username": atob(username)
        }) as User | null;

        if (user == null) {
            return Response.json({
                "info": "Usuario Error"
            }, {status: 400})
        }

        if(atob(username) == user.username && atob(password) == atob(user.password)) {
            return Response.json({info: "Login Success",
                body: {
                    user : user.username,
                    email : user.email,
                    userType : user.userType
                }
            }, {status: 200})
            
        }
        
    } catch (error) {
        console.error(error)
    }
    
    return Response.json({info: "Error al Iniciar Sesión"}, {status: 400})
}


export { POST }