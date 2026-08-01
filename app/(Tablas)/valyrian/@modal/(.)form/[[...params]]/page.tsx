import { Modal } from "@/app/_components/_global/modal"
import { getValyrianByID } from "@/app/_methods/postgre_methods"
import FormValyrian from "@/app/_components/_forms/form-valyrian";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let valyrian = null;
    if (id){
        valyrian = await getValyrianByID(id);
    }
    return (
        <div>
            <Modal>
                <FormValyrian valyrian={valyrian}/>
            </Modal>
        </div>
    )
}

export default Page