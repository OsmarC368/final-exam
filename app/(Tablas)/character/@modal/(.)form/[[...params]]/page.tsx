import { Modal } from "@/app/_components/_global/modal"
import FormCharacter from "@/app/_components/_forms/form-character";
import { getCharacterByID } from "@/app/_methods/mongo_methods";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let character = null;
    if (id){
        character = await getCharacterByID(id);
    }
    return (
        <div>
            <Modal>
                <FormCharacter character={character}/>
            </Modal>
        </div>
    )
}

export default Page