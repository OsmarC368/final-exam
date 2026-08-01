import { Modal } from "@/app/_components/_global/modal"
import FormEpisode from "@/app/_components/_forms/form-episode";
import { getEpisodeByID } from "@/app/_methods/mongo_methods";

const Page = async ({params}: { params: { params?: string[] } }) => {
    const param = await params;
    const id = param?.params?.[0];
    let episode = null;
    if (id){
        episode = await getEpisodeByID(id);
    }
    return (
        <div>
            <Modal>
                <FormEpisode episode={episode}/>
            </Modal>
        </div>
    )
}

export default Page