import { getListCastles } from "@/app/_methods/postgre_methods"
import { Castle } from "@/app/_methods/types"
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

const countLocations = (list: Castle[]) => {
    const count: Record<string, number> = {};

    list.forEach((item) => {
        const key = item.location;
        count[key] = (count[key] || 0) + 1;
    });

    return Object.entries(count).map(([location, total]) => ({ location, total }));
};

const Graphic = async () => {
    const lista = await getListCastles();
    const dataset = countLocations(lista) || [];
    console.log(dataset)
    const seriesData = dataset.map((count) => ({ value: count.total, label: `Location: ${count.location}` }));
    return (
        <Box sx={{ '& .MuiPieChart-legend text': { fill: '#FFFFFF' }, '& .MuiPieChart-legend, & .MuiPieChart-legendItem': { color: '#FFFFFF' } }}>
            <h1>Castles by Location</h1>
            <PieChart
                series={[{ data: seriesData }]}
                width={200}
                height={200}
            />
        </Box>
    )
}

export default Graphic;