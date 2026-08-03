import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weapon",
  description: "Final Exam",
};
export default function Layout({children, modal} : LayoutProps<"/weapon">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}