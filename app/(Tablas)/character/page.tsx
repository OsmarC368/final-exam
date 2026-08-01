"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState, useTransition } from "react";
import { Character } from "@/app/_methods/types";
import { useRouter } from "next/navigation";
import { deleteCharacter, getListCharacter } from "@/app/_methods/mongo_methods";

const Page = () => {
    const [lista, setList] = useState<Character[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListCharacter();
                setList(req.map((character: Character) => ({ ...character, id: character._id!.toString() })));
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteCharacter(id);
                window.location.href = "/character";
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "_id", description: "id TEST", width: 200},
    {field: "name", description: "Name TEST", width: 200},
    {field: "house", description: "House TEST", width: 200},
    {field: "alias", description: "Alias TEST", width: 200},
    {field: "Actions", description: "Acciones con Botones", width: 200, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/character/form/${params.row._id.toString()}`)}>Modificar</button>
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
            <Link href="/character/form">
                <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
            </Link>
            <h1>Lista de Characters</h1>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page