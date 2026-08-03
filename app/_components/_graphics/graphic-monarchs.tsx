import { getListMonarch } from "@/app/_methods/postgre_methods"
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

const Graphic = async () => {
    const lista = await getListMonarch();

    return (
        <Box>
            <h1>Monarchs (Reign)</h1>
            <BarChart
                dataset={lista}
                xAxis={[{ dataKey: "name", scaleType: "band", tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                yAxis={[{ tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                series={[{ dataKey: "reign", label: "Reign" }]}
                width={400}
                height={200}
            />
        </Box>
    )
}

export default Graphic;