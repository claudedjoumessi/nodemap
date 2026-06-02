import Canvas from "./components/Canvas";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const App = () => {
  return (
    // <Canvas />
    <div className="h-screen w-screen p-3">
      <div className="h-full w-full">
        <ResizablePanelGroup orientation="horizontal" className="rounded-lg">
          <ResizablePanel className="pr-1" defaultSize={"60%"} >
            <Canvas />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            Graph Editor
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default App;
