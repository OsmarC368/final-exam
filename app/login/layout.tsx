import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOGIN",
  description: "Final Exam",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-950-100">
      <div className=" max-w-md p-8 bg-red-900 rounded-2xl shadow-md border-amber-950 border-2">
        {children}
      </div>
    </div>
  );
}