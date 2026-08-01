"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { getListValyrians, deleteValyrian } from "@/app/_methods/postgre_methods";
import { useEffect, useState, useTransition } from "react";
import { Valyrian } from "@/app/_methods/types";
import { useRouter } from "next/navigation";

const Page = () => {
    const [lista, setList] = useState<Valyrian[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListValyrians();
                setList(req)
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteValyrian(id);
                window.location.href = "/valyrian";
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "word", description: "Name TEST", width: 220},
    {field: "translation", description: "Description stock", width: 220},
    {field: "pronunciation", description: "Description TEST", width: 220},
    {field: "Actions", description: "Acciones con Botones", width: 220, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/valyrian/form/${params.row.id}`)}>Modificar</button>
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
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        }}>
            <h1 className="text-2x1">Valyrian Dictionary</h1>
            <Link href="/valyrian/form">
                <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Add New Word +</button>
            </Link>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page