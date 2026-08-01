"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState, useTransition } from "react";
import { Weapon } from "@/app/_methods/types";
import { useRouter } from "next/navigation";
import { deleteWeapon, getListWeapon } from "@/app/_methods/mongo_methods";

const Page = () => {
    const [lista, setList] = useState<Weapon[]>([])
    const [isPending, setTransition] = useTransition();
    const router = useRouter();
    
    useEffect(() => {
            const method = async() => {
                const req = await getListWeapon();
                setList(req.map((weapon : Weapon) => ({ ...weapon, id: weapon._id!.toString() })));
            }
            method()
        }, [])

    const handleDelete = async (id: string) => {
        if(confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteWeapon(id);
                window.location.href = "/weapons";
            })
        }
    }


    const columns : GridColDef[] = [
    {field: "_id", description: "id TEST", width: 200},
    {field: "name", description: "Name TEST", width: 200},
    {field: "type", description: "Type TEST", width: 200},
    {field: "material", description: "Material TEST", width: 200},
    {field: "Actions", description: "Acciones con Botones", width: 200, sortable: false, 
        renderCell: (params) => {
            return (
                    <div>
                        <button style={{padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white"}} onClick={() => router.push(`/weapon/form/${params.row._id.toString()}`)}>Modificar</button>
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
            <h1>Lista de Weapons</h1>
            <Link href="/weapon/form">
                <button style={{color: "white", backgroundColor: "green", padding:"5px 15px"}}>Agregar Nuevo +</button>
            </Link>
            <DataGrid columns={columns} rows={lista} showToolbar/>
        </div>
    )
}

export default Page