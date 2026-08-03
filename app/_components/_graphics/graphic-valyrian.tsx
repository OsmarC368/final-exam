import { getListValyrians } from "@/app/_methods/postgre_methods"
import Box from "@mui/material/Box";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const Graphic = async () => {
    const lista = await getListValyrians();
    const value = (lista.length * 100) / 2000

    return (
        <Box>
            <h1>Dictionry % Completed (2000 words)</h1>
            <Gauge width={100} height={100} value={value} startAngle={-90} endAngle={90}
            sx={{[`& .${gaugeClasses.valueText}`]: {
      fontSize: 30,
      fill: '#F4F4F4',
    }}}/>
        </Box>
    )
}

export default Graphic;