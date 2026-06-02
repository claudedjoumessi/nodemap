import Canvas from "./components/Canvas";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import GraphPlot from "./components/GraphPlot";
import { useEvaluate } from "./hooks/useEvaluate";

const App = () => {

  // const { evaluate } = useEvaluate()

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
            <GraphPlot fn={(x) => x * x} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default App;
