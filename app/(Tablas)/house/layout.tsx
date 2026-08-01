export default function Layout({children, modal} : LayoutProps<"/house">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}