import { NextRequest } from "next/server";
import { Houses } from "@/app/_methods/models";
import { House } from "@/app/_methods/types";

const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    try {
        if(id) {
            const db = await Houses.findByPk(+id);
            return Response.json({
                info: `House con ID ${id}`,
                data: db
            }, { status: 200 });
        }        
        const db = await Houses.findAll();
        return Response.json({
            info: "Houses table",
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
    const body = await request.json() as House
    console.log(body)
    try {
        await Houses.create({
            name: body.name,
            motto: body.motto,
            animal: body.animal,
            region: body.region,
            shield: body.shield
        })
        return Response.json({
            info: "Se guardo!"
        }, {status: 200})
    } catch (error) {
        console.error(error)
        return Response.json({
            info: "ERROR :( "+error
        }, {status: 400})
    }
};

const DELETE = async (request: NextRequest) => {
    const body = await request.json()
    console.log(body)
    try {
        await Houses.destroy({
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
    const body = await request.json() as House;
    console.log(body);
    try {
        await Houses.update({
            name: body.name,
            motto: body.motto,
            animal: body.animal,
            region: body.region,
            shield: body.shield
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

export { GET, POST, DELETE, PUT}