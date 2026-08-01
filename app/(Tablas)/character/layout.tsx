export default function Layout({children, modal} : LayoutProps<"/character">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}