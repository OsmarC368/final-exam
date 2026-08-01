import FormMonarch from "@/app/_components/_forms/form-monarch";
import { getMonarchByID } from "@/app/_methods/postgre_methods"

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let monarch = null;
    if (id){
        monarch = await getMonarchByID(id);
    }
    return (
        <div>
            <FormMonarch monarch={monarch}/>
        </div>
    )
}

export default Page