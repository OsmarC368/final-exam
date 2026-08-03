import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monarch",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/monarch">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}