export default function Layout({children, modal} : LayoutProps<"/dragons">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}