import Canvas from "./components/Canvas";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import GraphPlot from "./components/GraphPlot";
import { NodeProvider } from "./context/NodeContext";

const App = () => {
  return (
    <NodeProvider>
      <div className="h-screen w-screen p-3">
        <div className="h-full w-full">
          <ResizablePanelGroup orientation="horizontal" className="rounded-lg">
            <ResizablePanel className="pr-1" defaultSize={"55%"}>
              <Canvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <GraphPlot />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </NodeProvider>
  );
};

export default App;
