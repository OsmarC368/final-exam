export default function Layout({children, modal} : LayoutProps<"/castle">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}