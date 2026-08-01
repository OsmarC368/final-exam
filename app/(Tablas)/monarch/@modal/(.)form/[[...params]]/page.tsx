import { Modal } from "@/app/_components/_global/modal"
import { getMonarchByID } from "@/app/_methods/postgre_methods"
import FormMonarch from "@/app/_components/_forms/form-monarch";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let monarch = null;
    if (id){
        monarch = await getMonarchByID(id);
    }
    return (
        <div>
            <Modal>
                <FormMonarch monarch={monarch}/>
            </Modal>
        </div>
    )
}

export default Page