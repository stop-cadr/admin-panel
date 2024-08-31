import { Content } from "./components/content/Content"
import { Sidebar } from "./components/sidebar/Sidebar"


function App() {

  return (
    <>
        <div className="bg-black relative min-h-screen grid grid-cols-[250px_auto] h-full w-full">
        <Sidebar/>
        <Content/>

        </div>
    </>
  )
}

export default App
