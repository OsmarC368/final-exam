export default function Layout({children, modal} : LayoutProps<"/valyrian">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}