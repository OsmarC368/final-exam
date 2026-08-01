export default function Layout({children, modal} : LayoutProps<"/monarch">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}