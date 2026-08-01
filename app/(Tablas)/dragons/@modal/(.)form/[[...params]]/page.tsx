import { Modal } from "@/app/_components/_global/modal"
import FormDragon from "@/app/_components/_forms/form-dragon";
import { getDragonByID } from "@/app/_methods/mongo_methods";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let dragon = null;
    if (id){
        dragon = await getDragonByID(id);
    }
    return (
        <div>
            <Modal>
                <FormDragon dragon={dragon}/>
            </Modal>
        </div>
    )
}

export default Page