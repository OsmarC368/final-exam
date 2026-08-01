import { NextRequest } from "next/server";
import { Valyrians } from "@/app/_methods/models";
import { Valyrian } from "@/app/_methods/types";

const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    
    try {
        if(id) {
            const db = await Valyrians.findByPk(+id);
            return Response.json({
                info: `Valyrian con ID ${id}`,
                data: db
            }, { status: 200 });
        }        
        const db = await Valyrians.findAll();
        return Response.json({
            info: "Valyrian table",
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
    const body = await request.json() as Valyrian
    console.log(body)
    try {
        await Valyrians.create({
            word: body.word,
            translation: body.translation,
            pronunciation: body.pronunciation
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
        await Valyrians.destroy({
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
    const body = await request.json() as Valyrian;
    console.log(body);
    try {
        await Valyrians.update({
            word: body.word,
            translation: body.translation,
            pronunciation: body.pronunciation
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