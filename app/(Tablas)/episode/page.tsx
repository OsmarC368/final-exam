"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState, useTransition } from "react";
import { Episode } from "@/app/_methods/types";
import { useRouter } from "next/navigation";
import { deleteEpisode, getListEpisode } from "@/app/_methods/mongo_methods";

const Page = () => {
    const [lista, setList] = useState<Episode[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListEpisode();
                setList(req.map((episode: Episode) => ({ ...episode, id: episode._id!.toString() })));
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteEpisode(id);
                window.location.href = "/episode";
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "_id", description: "id TEST", width: 200},
    {field: "title", description: "Title TEST", width: 200},
    {field: "season", description: "Season TEST", width: 200},
    {field: "episodeNumber", description: "Episode Number TEST", width: 200},
    {field: "Actions", description: "Acciones con Botones", width: 200, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/episode/form/${params.row._id.toString()}`)}>Modificar</button>
                        <button style={{padding: "5px 15px", backgroundColor: "red", borderRadius: "10px", color: "white"}} 
                        onClick={() => {handleDelete(params.row._id.toString())}} disabled={isPending}>{isPending ? "Eliminando...": "Eliminar"}</button>
                    </div>
                )
            }
        }
    ]

    return (
        <div style={{
            padding: "1rem",
            border: "1px solid gray",
            
        }}>
            <Link href="/episode/form">
                <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
            </Link>
            <h1>Lista de Episodes</h1>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page