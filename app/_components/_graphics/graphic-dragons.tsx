import { getListDragon } from "@/app/_methods/mongo_methods"
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

const Graphic = async () => {
    const lista = await getListDragon();

    return (
        <Box>
            <h1>Dragons Graphic (Age)</h1>
            <BarChart
                dataset={lista}
                xAxis={[{ dataKey: "name", scaleType: "band", tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                yAxis={[{ tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                series={[{ dataKey: "age", label: "Age" }]}
                width={400}
                height={200}
            />
        </Box>
    )
}

export default Graphic;