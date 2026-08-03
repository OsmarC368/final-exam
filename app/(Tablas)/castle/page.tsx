import { Suspense } from "react";
import Graphic from "@/app/_components/_graphics/graphic-castle";
import CastleTable from "@/app/_components/_data-grids/castles-tables";

const Waiting = () => <div><h1>Cargando gráfico...</h1></div>;

export default function Page() {
  return (
    <div style={{ padding: "1rem", border: "1px solid gray" }}>
      <CastleTable />

      <hr style={{ margin: "2rem 0" }} />

      <Suspense fallback={<Waiting />}>
        <Graphic />
      </Suspense>
    </div>
  );
}