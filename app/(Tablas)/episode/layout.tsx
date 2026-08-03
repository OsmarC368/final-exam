import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Episode",
  description: "Final Exam",
};

export default function Layout({children, modal} : LayoutProps<"/episode">) {
    return (
        <>
        {modal}
        {children}
        </>
    )
}