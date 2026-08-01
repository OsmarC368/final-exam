import FormCastles from "@/app/_components/_forms/form-castle";
import { getCastleByID } from "@/app/_methods/postgre_methods"

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let castle = null;
    if (id){
        castle = await getCastleByID(id);
    }
    return (
        <div>
            <FormCastles castle={castle}/>
        </div>
    )
}

export default Page