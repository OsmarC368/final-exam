import { NextRequest } from "next/server";
import { Monarchs } from "@/app/_methods/models";
import { Monarch } from "@/app/_methods/types";

const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    try {
        if(id) {
            const db = await Monarchs.findByPk(+id);
            return Response.json({
                info: `Monarch con ID ${id}`,
                data: db
            }, { status: 200 });
        }        
        const db = await Monarchs.findAll();
        return Response.json({
            info: "Monarch table",
            data: db
        }, {status: 200})
        
    } catch (error) {
        console.error(error)
        return Response.json({
            info: "ERROR"
        }, {status: 400})
    }

};

const POST = async (request: NextRequest) => {
    const body = await request.json() as Monarch
    console.log(body)
    try {
        await Monarchs.create({
            name: body.name,
            reign: body.reign,
            predecessor: body.predecessor,
            successor: body.successor
        })
        return Response.json({
            info: "Se guardo!"
        }, {status: 200})
    } catch (error) {
        return Response.json({
            info: "ERROR :( "+error
        }, {status: 400})
    }
};

const DELETE = async (request: NextRequest) => {
    const body = await request.json()
    console.log(body)
    try {
        await Monarchs.destroy({
            where: {
                id: +body.id
            }
        })
        return Response.json({
            info: "Se Elimino!"
        }, {status: 200})
    } catch (error) {
        console.error(error)
        return Response.json({
            info: "ERROR :( "+error
        }, {status: 400})
    }
}

const PUT = async (request: NextRequest) => {
    const body = await request.json() as Monarch;
    console.log(body);
    try {
        await Monarchs.update({
            name: body.name,
            reign: body.reign,
            predecessor: body.predecessor,
            successor: body.successor
        }, {
            where: {
                id: +body.id!
            }
        });
        
        return Response.json({
            info: "Se actualizó!"
        }, {status: 200});
        
    } catch (error) {
        console.error(error);
        return Response.json({
            info: "ERROR :( " + error
        }, {status: 400});
    }
};

export { GET, POST, DELETE, PUT }