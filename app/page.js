import TodoApp from "./components/Todo";

export default function Home() {
  return (
    <section className="relative flex flex-col">
      <div className='bg-[url("/bg-mobile-dark.jpg")] min-h-[19rem] bg-no-repeat bg-cover md:bg-[url("/bg-desktop-dark.jpg")]'></div>
      <TodoApp />
    </section>
  );
}
