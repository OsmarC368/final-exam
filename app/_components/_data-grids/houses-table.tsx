"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { getListHouses, deleteHouse } from "@/app/_methods/postgre_methods";
import { useEffect, useState, useTransition } from "react";
import { House } from "@/app/_methods/types";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const HousesTable = () => {
    const [lista, setList] = useState<House[]>([])
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
            const req = await getListHouses();
            setList(req)
        }
        method()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteHouse(id);
                window.location.href = "/house?message=Deleted Succesfully!";
            })
        }
    }

    const PINTERES_URL = "https://i.pinimg.com/"

    const columns: GridColDef[] = [
        { field: "name", description: "Name TEST", width: 220 },
        { field: "motto", description: "Description TEST", width: 220 },
        { field: "animal", description: "Description TEST", width: 220 },
        { field: "region", description: "Description TEST", width: 220 },
        {
            field: "shield", description: "imagen del escudlo", width: 220, sortable: false,
            renderCell: (params) => {
                const shieldUrl = params.row?.shield;
                const shouldRenderImage = shieldUrl.startsWith(PINTERES_URL);

                return (
                    <div>
                        {shouldRenderImage && (
                            <Image src={shieldUrl} alt="Shield" style={{ width: "100%", height: "auto" }} width={40} height={40} />
                        )}
                    </div>
                );
            }
        },
        {
            field: "Actions", description: "Acciones con Botones", width: 220, sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <button onClick={() => router.push(`/house/form/${params.row.id}`)}>Modificar</button>
                        <button
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
                <h1>Houses List</h1>
                <Link href="/house/form">
                    <button style={{ color: "white", backgroundColor: "green", padding: "5px 15px" }}>Add New House +</button>
                </Link>
            </div>
            <DataGrid columns={columns} rows={lista} showToolbar />
        </div>
    )
}

export default HousesTable