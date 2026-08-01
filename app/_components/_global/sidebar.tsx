"use client"
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
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
                    <TreeItem itemId='obj-postgre1' label="Houses" onClick={() => router.push("/house")}/>
                    <TreeItem itemId='obj-postgre2' label="Monarchs" onClick={() => router.push("/monarch")}/>
                    <TreeItem itemId='obj-postgre3' label="Valyrian Dictionary" onClick={() => router.push("/valyrian")}/>
                    <TreeItem itemId='obj-postgre4' label="Castles" onClick={() => router.push("/castle")}/>
                </TreeItem>
                <TreeItem itemId='mongo' label="MongoDB">
                    <TreeItem itemId='obj-mongo1' label="Dragons" onClick={() => router.push("/dragons")}/>
                    <TreeItem itemId='obj-mongo2' label="Weapons" onClick={() => router.push("/weapon")}/>
                    <TreeItem itemId='obj-mongo3' label="Character" onClick={() => router.push("/character")}/>
                    <TreeItem itemId='obj-mongo4' label="Episodes" onClick={() => router.push("/episode")}/>
                </TreeItem>
            </SimpleTreeView>
        </div>
    )
}

export default Sidebar
