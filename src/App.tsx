import NavBar from "./panels/NavBar";
import LeftBar from "./panels/LeftBar";
import RightBar from "./panels/RightBar";

function App() {

  return (
    <div className="flex bg-gray-100 font-sans text-gray-900">
      <LeftBar />
      <div className="flex h-screen bg-gray-300 flex-1 flex-col">
        <NavBar />
      </div>
      <RightBar />
    </div>
  );
}

export default App;
