import { getListCharacter } from "@/app/_methods/mongo_methods"
import { Character } from "@/app/_methods/types"
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

const countHouses = (list: Character[]) => {
    const count: Record<string, number> = {};

    list.forEach((item) => {
        const key = item.house;
        count[key] = (count[key] || 0) + 1;
    });

    return Object.entries(count).map(([house, total]) => ({ house, total }));
};

const Graphic = async () => {
    const lista = await getListCharacter();
    const dataset = countHouses(lista);
    console.log(dataset)
    return (
        <Box>
            <h1>Characters by House</h1>
            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: "house", scaleType: "band", tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                yAxis={[{ tickLabelStyle: { fontSize: 14, fill: "#F4F4F4" } }]}
                series={[{ dataKey: "total", label: "Characters" }]}
                width={400}
                height={200}
            />
        </Box>
    )
}

export default Graphic;