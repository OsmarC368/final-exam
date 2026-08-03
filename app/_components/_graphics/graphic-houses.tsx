import { getListHouses } from "@/app/_methods/postgre_methods"
import { House } from "@/app/_methods/types"
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

const countRegion = (list: House[]) => {
    const count: Record<string, number> = {};

    list.forEach((item) => {
        const key = item.region;
        count[key] = (count[key] || 0) + 1;
    });

    return Object.entries(count).map(([region, total]) => ({ region, total }));
};

const Graphic = async () => {
    const lista = await getListHouses();
    const dataset = countRegion(lista);
    console.log(dataset)
    return (
        <Box>
            <h1>Characters by House</h1>
            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: "region", scaleType: "band", tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                yAxis={[{ tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                series={[{ dataKey: "total", label: "Characters" }]}
                width={400}
                height={200}
            />
        </Box>
    )
}

export default Graphic;