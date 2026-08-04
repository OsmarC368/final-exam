"use client"
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
    role: string
}

const Sidebar = ({ role = "dragonseed" }: SidebarProps) => {
    const router = useRouter();
    const path = usePathname();
    const pathSelected = (currentPath: string) => path === currentPath
    return (
        <div style={{
            background: "black",
            borderRight: "1px solid #e2e8f0",
            minHeight: "100%",
            padding: "1.25rem",
            width: "14rem"
        }}>
            <h3 style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "white",
                margin: "0 0 0.9rem"
            }}>
                Navigation
            </h3>
            <SimpleTreeView
                defaultExpandedItems={['postgre', 'mongo']}
            >
                <TreeItem itemId='postgre' label="PostgreSQL">
                    {(role == "dragonrider" || role == "hand_of_the_king") ? (
                        <>
                            <TreeItem itemId='obj-postgre2' label="Monarchs" onClick={() => router.push("/monarch")} style={{ backgroundColor: pathSelected("/monarch") ? "#910904" : "transparent"}} />
                            <TreeItem itemId='obj-postgre3' label="Valyrian Dictionary" onClick={() => router.push("/valyrian")} style={{ backgroundColor: pathSelected("/valyrian") ? "#910904" : "transparent"}} />
                        </>
                    ) : null}
                    <TreeItem itemId='obj-postgre1' label="Houses" onClick={() => router.push("/house")} style={{ backgroundColor: pathSelected("/house") ? "#910904" : "transparent"}}/>
                    <TreeItem itemId='obj-postgre4' label="Castles" onClick={() => router.push("/castle")} style={{ backgroundColor: pathSelected("/castle") ? "#910904" : "transparent"}} />
                </TreeItem>
                {(role == "hand_of_the_king") ? (
                    <TreeItem itemId='mongo' label="MongoDB">
                        <TreeItem itemId='obj-mongo1' label="Dragons" onClick={() => router.push("/dragons")} style={{ backgroundColor: pathSelected("/dragons") ? "#910904" : "transparent"}} />
                        <TreeItem itemId='obj-mongo2' label="Weapons" onClick={() => router.push("/weapon")} style={{ backgroundColor: pathSelected("//weapon") ? "#910904" : "transparent"}} />
                        <TreeItem itemId='obj-mongo3' label="Character" onClick={() => router.push("/character")} style={{ backgroundColor: pathSelected("/character") ? "#910904" : "transparent"}} />
                        <TreeItem itemId='obj-mongo4' label="Episodes" onClick={() => router.push("/episode")} style={{ backgroundColor: pathSelected("/episode") ? "#910904" : "transparent"}} />
                    </TreeItem>
                ) : null}

            </SimpleTreeView>
        </div>
    )
}

export default Sidebar
