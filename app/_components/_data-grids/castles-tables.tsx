"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { getListCastles, deleteCastle } from "@/app/_methods/postgre_methods";
import { useEffect, useState, useTransition } from "react";
import { Castle } from "@/app/_methods/types";
import { useRouter, useSearchParams } from "next/navigation";

const CastlesTable = () => {
    const [lista, setList] = useState<Castle[]>([])
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
        const method = async () => {
            const req = await getListCastles();
            setList(req)
        }
        method()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteCastle(id);
                window.location.href = "/castle?message=Deleted Succesfully!";
            })
        }
    }


    const columns: GridColDef[] = [
        { field: "name", description: "Name TEST", width: 220 },
        { field: "house", description: "Description rating", width: 220 },
        { field: "inCharge", description: "Description TEST", width: 220 },
        { field: "location", description: "location", width: 220 },
        {
            field: "Actions", description: "Acciones con Botones", width: 220, sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <button style={{ padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white" }} onClick={() => router.push(`/castle/form/${params.row.id}`)}>Modificar</button>
                        <button style={{ padding: "5px 15px", backgroundColor: "red", borderRadius: "10px", color: "white" }}
                            onClick={() => { handleDelete(params.row.id) }} disabled={isPending}>{isPending ? "Eliminando..." : "Eliminar"}</button>
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

                {message && (
                    <div style={MessageCard}>
                        <span>{message}</span>
                    </div>
                )}

                <h1 className="text-3xl">Castles List</h1>
                <Link href="/castle/form">
                    <button style={{ color: "white", backgroundColor: "green", padding: "5px 15px" }}>Add New Castle +</button>
                </Link>
            </div>
            <DataGrid columns={columns} rows={lista} showToolbar />
        </div>
    )
}

export default CastlesTable