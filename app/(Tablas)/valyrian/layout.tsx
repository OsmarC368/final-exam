import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valyrian Dictionary",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/valyrian">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}