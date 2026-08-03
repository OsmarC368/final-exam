"use client"
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState, useTransition } from "react";
import { Episode } from "@/app/_methods/types";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteEpisode, getListEpisode } from "@/app/_methods/mongo_methods";

const EpisodesTable = () => {
    const [lista, setList] = useState<Episode[]>([])
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
            const req = await getListEpisode();
            setList(req.map((episode: Episode) => ({ ...episode, id: episode._id!.toString() })));
        }
        method()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("estas seguro?")) {
            setTransition(async () => {
                await deleteEpisode(id);
                window.location.href = "/episode?message=Deleted Succesfully!";
            })
        }
    }


    const columns: GridColDef[] = [
        { field: "_id", description: "id TEST", width: 200 },
        { field: "title", description: "Title TEST", width: 200 },
        { field: "season", description: "Season TEST", width: 200 },
        { field: "episodeNumber", description: "Episode Number TEST", width: 200 },
        {
            field: "Actions", description: "Acciones con Botones", width: 200, sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <button style={{ padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white" }} onClick={() => router.push(`/episode/form/${params.row._id.toString()}`)}>Modificar</button>
                        <button style={{ padding: "5px 15px", backgroundColor: "red", borderRadius: "10px", color: "white" }}
                            onClick={() => { handleDelete(params.row._id.toString()) }} disabled={isPending}>{isPending ? "Eliminando..." : "Eliminar"}</button>
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

            <Link href="/episode/form">
                <button style={{ color: "white", backgroundColor: "green", padding: "5px 15px" }}>Add New Episode +</button>
            </Link>
            <h1>Episodes List</h1>
            <DataGrid columns={columns} rows={lista} showToolbar />
        </div>
    )
}

export default EpisodesTable