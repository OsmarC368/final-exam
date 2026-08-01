import { NextRequest } from "next/server";
import { Castles } from "@/app/_methods/models";
import { Castle } from "@/app/_methods/types";

const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    try {
        if(id) {
            const db = await Castles.findByPk(+id);
            return Response.json({
                info: `Castle con ID ${id}`,
                data: db
            }, { status: 200 });
        }        
        const db = await Castles.findAll();
        return Response.json({
            info: "Castle table",
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
    const body = await request.json() as Castle
    console.log(body)
    try {
        await Castles.create({
            name: body.name,
            house: body.house,
            inCharge: body.inCharge,
            location: body.location
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
        await Castles.destroy({
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
    const body = await request.json() as Castle;
    console.log(body);
    try {
        await Castles.update({
            name: body.name,
            house: body.house,
            inCharge: body.inCharge,
            location: body.location
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