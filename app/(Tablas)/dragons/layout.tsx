import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dragons",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/dragons">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}