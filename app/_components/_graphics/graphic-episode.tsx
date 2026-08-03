import { getListEpisode } from "@/app/_methods/mongo_methods"
import { Episode } from "@/app/_methods/types"
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

const countSeasons = (list: Episode[]) => {
    const count: Record<string, number> = {};

    list.forEach((item) => {
        const key = item.season.toString();
        count[key] = (count[key] || 0) + 1;
    });

    return Object.entries(count).map(([season, total]) => ({ season, total }));
};

const Graphic = async () => {
    const lista = await getListEpisode();
    const dataset = countSeasons(lista) || [];
    console.log(dataset)
    const seriesData = dataset.map((count) => ({ value: count.total, label: `Season ${count.season}` }));
    return (
        <Box sx={{ '& .MuiPieChart-legend text': { fill: '#FFFFFF' }, '& .MuiPieChart-legend, & .MuiPieChart-legendItem': { color: '#FFFFFF' } }}>
            <h1>Number of Episodes by Season</h1>
            <PieChart
                series={[{ data: seriesData }]}
                width={200}
                height={200}
            />
        </Box>
    )
}

export default Graphic;