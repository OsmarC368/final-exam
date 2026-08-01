import FormValyrian from "@/app/_components/_forms/form-valyrian";
import { getValyrianByID } from "@/app/_methods/postgre_methods"

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let valyrian = null;
    if (id){
        valyrian = await getValyrianByID(id);
    }
    return (
        <div>
            <FormValyrian valyrian={valyrian}/>
        </div>
    )
}

export default Page