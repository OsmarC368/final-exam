import Image from "next/image";
import spinner from "@/app/_resources/icons/spinner.png";
const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <div className="animate-spin">
                <Image
                    src={spinner}
                    alt="Loading"
                    width={100}
                    height={100}
                />

            </div>
        </div>
    )
}

export default Loading