import { mongodbConexion } from "@/app/_methods/db";
import { NextRequest } from "next/server";
import { Episode } from "@/app/_methods/types";
import { ObjectId } from "mongodb";

const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") as string;
    
    try {
        const client = await mongodbConexion;
        const db = client.db("nextjs_test");
        const colection = db.collection("episodes")
        if(id) {
            const data = await colection.findOne({"_id": new ObjectId(id)});
            return Response.json({
                info: `Episode con ID ${id}`,
                data: data
            }, { status: 200 });
        }         
        const data = await colection.find().toArray();
        return Response.json({
            info: "Test table",
            data: data
        }, {status: 200})
        
    } catch (error) {
        console.error(error)
        return Response.json({
            info: "ERROR"
        }, {status: 400})
    }

};

const POST = async (request: NextRequest) => {
    const body = await request.json() as Episode
    console.log(body)
    try {
        const client = await mongodbConexion;
        const db = client.db("nextjs_test");
        const colection = db.collection("episodes")
        const newEpisode = await colection.insertOne({
            title: body.title,
            season: body.season,
            episodeNumber: body.episodeNumber
        })
        if (newEpisode.acknowledged)
        {
            return Response.json({
                info: "Se guardo!"
            }, {status: 200})
        } 
        else 
        {
            return Response.json({
                info: "Error"
            }, {status: 200})
        }
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
        const client = await mongodbConexion;
        const db = client.db("nextjs_test");
        const colection = db.collection("episodes")
        const res = await colection.deleteOne({_id: new ObjectId(body.id)})

        if (res.deletedCount === 0)
        {
            return Response.json({
                info: "not found"
            }, {status: 404})    
        }

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
    const body = await request.json();
    console.log(body);
    try {
        const client = await mongodbConexion;
        const db = client.db("nextjs_test");
        const colection = db.collection("episodes")

        const res = await colection.updateOne(
            {_id: new ObjectId(body.id)},
            { $set: body }
        )
        if (res.acknowledged)
        {
            return Response.json({
                info: "Se actualizó!"
            }, {status: 200});
        }
        else 
        {
            return Response.json({
                info: "Se actualizó!"
            }, {status: 404});
        }
        
    } catch (error) {
        console.error(error);
        return Response.json({
            info: "ERROR :( " + error
        }, {status: 400});
    }
};

export { GET, POST, DELETE, PUT}