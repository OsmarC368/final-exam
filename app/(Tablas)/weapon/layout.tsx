export default function Layout({children, modal} : LayoutProps<"/weapon">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}