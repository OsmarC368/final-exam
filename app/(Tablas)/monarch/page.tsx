"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { getListMonarch, deleteMonarch } from "@/app/_methods/postgre_methods";
import { useEffect, useState, useTransition } from "react";
import { Monarch } from "@/app/_methods/types";
import { useRouter } from "next/navigation";

const Page = () => {
    const [lista, setList] = useState<Monarch[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListMonarch();
                setList(req)
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteMonarch(id);
                window.location.href = "/monarch";
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "name", description: "Name TEST", width: 220},
    {field: "reign", description: "Description rating", width: 220},
    {field: "predecessor", description: "Description TEST", width: 220},
    {field: "successor", description: "Description TEST", width: 220},
    {field: "Actions", description: "Acciones con Botones", width: 220, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/monarch/form/${params.row.id}`)}>Modificar</button>
                        <button style={{padding: "5px 15px", backgroundColor: "red", borderRadius: "10px", color: "white"}} 
                        onClick={() => {handleDelete(params.row.id)}} disabled={isPending}>{isPending ? "Eliminando...": "Eliminar"}</button>
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
                <h1>Monarchs</h1>
                <Link href="/monarch/form">
                    <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
                </Link>
            </div>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page