import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Castle",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/castle">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}