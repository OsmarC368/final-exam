"use client";

import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState, useTransition } from "react";
import { Dragon } from "@/app/_methods/types";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteDragon, getListDragon } from "@/app/_methods/mongo_methods";

export default function DragonsTable() {
  const [lista, setList] = useState<Dragon[]>([]);
  const [isPending, startTransition] = useTransition();
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
    const fetchDragons = async () => {
      const req = await getListDragon();
      setList(req.map((dragon: Dragon) => ({ ...dragon, id: dragon._id!.toString() })));
    };
    fetchDragons();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este dragón?")) {
      startTransition(async () => {
        await deleteDragon(id);
        window.location.href = "/dragons?message=Deleted Succesfully!";

      });
    }
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "rider", headerName: "Jinete", width: 200 },
    { field: "age", headerName: "Edad", width: 200 },
    {
      field: "Actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button
            style={{ padding: "5px 15px", backgroundColor: "orange", borderRadius: "10px", color: "white" }}
            onClick={() => router.push(`/dragons/form/${params.row._id.toString()}`)}
          >
            Modificar
          </button>
          <button
            style={{ padding: "5px 15px", backgroundColor: "red", borderRadius: "10px", color: "white", marginLeft: "5px" }}
            onClick={() => handleDelete(params.row._id.toString())}
            disabled={isPending}
          >
            {isPending ? "..." : "Eliminar"}
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        {message && (
          <div style={MessageCard}>
            <span>{message}</span>
          </div>
        )}
        <h1 className="text-2xl">Dragons List</h1>
        <Link href="/dragons/form">
          <button style={{ color: "white", backgroundColor: "green", padding: "5px 15px" }}>
            Add New Dragon +
          </button>
        </Link>
      </div>
      <DataGrid rows={lista} columns={columns} />
    </div>
  );
}