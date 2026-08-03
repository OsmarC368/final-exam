import { getListWeapon } from "@/app/_methods/mongo_methods"
import { Weapon } from "@/app/_methods/types"
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

const countMaterials = (list: Weapon[]) => {
    const count: Record<string, number> = {};

    list.forEach((item) => {
        const key = item.material;
        count[key] = (count[key] || 0) + 1;
    });

    return Object.entries(count).map(([material, total]) => ({ material, total }));
};

const Graphic = async () => {
    const lista = await getListWeapon();
    const dataset = countMaterials(lista) || [];
    console.log(dataset)
    const seriesData = dataset.map((count) => ({ value: count.total, label: `Material: ${count.material}` }));
    return (
        <Box sx={{ '& .MuiPieChart-legend text': { fill: '#FFFFFF' }, '& .MuiPieChart-legend, & .MuiPieChart-legendItem': { color: '#FFFFFF' } }}>
            <h1>Weapons by Material</h1>
            <PieChart
                series={[{ data: seriesData }]}
                width={200}
                height={200}
            />
        </Box>
    )
}

export default Graphic;