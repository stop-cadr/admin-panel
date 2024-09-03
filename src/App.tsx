import { Content, Sidebar } from "@/components";

function App() {
  return (
    <div className=" bg-[#1A1919] min-h-screen grid grid-cols-[250px_auto] gap-5 h-full w-full p-5">
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;
