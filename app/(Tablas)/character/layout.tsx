import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/character">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}