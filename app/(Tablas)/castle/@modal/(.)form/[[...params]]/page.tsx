import { Modal } from "@/app/_components/_global/modal"
import { getCastleByID } from "@/app/_methods/postgre_methods"
import FormCastles from "@/app/_components/_forms/form-castle";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let castle = null;
    if (id){
        castle = await getCastleByID(id);
    }
    return (
        <div>
            <Modal>
                <FormCastles castle={castle}/>
            </Modal>
        </div>
    )
}

export default Page