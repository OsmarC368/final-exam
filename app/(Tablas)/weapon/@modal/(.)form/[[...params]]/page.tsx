import { Modal } from "@/app/_components/_global/modal"
import FormWeapon from "@/app/_components/_forms/form-weapon";
import { getWeaponByID } from "@/app/_methods/mongo_methods";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let weapon = null;
    if (id){
        weapon = await getWeaponByID(id);
    }
    return (
        <div>
            <Modal>
                <FormWeapon weapon={weapon}/>
            </Modal>
        </div>
    )
}

export default Page