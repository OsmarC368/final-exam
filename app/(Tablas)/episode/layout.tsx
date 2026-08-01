export default function Layout({children, modal} : LayoutProps<"/episode">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}