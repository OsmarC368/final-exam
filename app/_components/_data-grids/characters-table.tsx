"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React, { useEffect, useState, useTransition } from "react";
import { Character } from "@/app/_methods/types";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteCharacter, getListCharacter } from "@/app/_methods/mongo_methods";

const CharactersTable = () => {
    const [lista, setList] = useState<Character[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();

    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    console.log(message)
    
    const MessageCard: React.CSSProperties = {
        padding: "1rem",
        marginBottom: "15px",
        marginTop: "15px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "green",
        border: "2px solid green"

    }

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
                window.location.href = "/character?message=Deleted Succesfully!";
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
            {message && (
                <div style={MessageCard}>
                    <span>{message}</span>
                </div>
            )}

            <Link href="/character/form">
                <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
            </Link>
            <h1>Lista de Characters</h1>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default CharactersTable