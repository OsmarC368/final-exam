import { Metadata } from "next";

export const metadata: Metadata = {
  title: "House",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/house">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}