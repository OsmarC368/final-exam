
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-6xl">
            Game of Thrones
          </h1>
        </div>
      </main>
    </div>
  );
}
