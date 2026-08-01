"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState, useTransition } from "react";
import { Dragon } from "@/app/_methods/types";
import { useRouter } from "next/navigation";
import { deleteDragon, getListDragon } from "@/app/_methods/mongo_methods";

const Page = () => {
    const [lista, setList] = useState<Dragon[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListDragon();
                setList(req.map((dragon: Dragon) => ({ ...dragon, id: dragon._id!.toString() })));
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        window.location.href = "/dragons";
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteDragon(id);
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "_id", description: "id TEST", width: 200},
    {field: "name", description: "Name TEST", width: 200},
    {field: "rider", description: "Rider TEST", width: 200},
    {field: "age", description: "Age TEST", width: 200},
    {field: "Actions", description: "Acciones con Botones", width: 200, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/dragons/form/${params.row._id.toString()}`)}>Modificar</button>
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
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 className="text-2xl">Lista de Dragones</h1>
                <Link href="/dragons/form">
                    <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
                </Link>
            </div>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page