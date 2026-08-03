import { Modal } from "@/app/_components/_global/modal"
import FormHouses from "@/app/_components/_forms/form-house";
import { getHouseByID } from "@/app/_methods/postgre_methods"

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let house = null;
    if (id){
        house = await getHouseByID(id);
    }
    return (
        <div>
            <Modal>
                <FormHouses house={house}/>
            </Modal>
        </div>
    )
}

export default Page