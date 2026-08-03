import Sidebar from "@/app/_components/_global/sidebar"
import { GetUser } from "@/app/_methods/dal"

const Page = async () => {
    const user = await GetUser();
    return (user) ? <Sidebar role={user!.userType}/> : null
}

export default Page