import { ChevronDown } from 'lucide-react'

const Node = () => {
  return (
    <div className='node'>
      <div className="node-header">
        <ChevronDown size={22} />
        <div className='node-name'>Multiply</div>
      </div>
      <div className="node-body">
        <div className="node-ports node-outputs">
          <div className="port">
            <div className="port-name">Result</div>
            <div className="port-noodle"></div>
          </div>
        </div>
        <div className="node-ports node-inputs">
          <div className="port">
            <div className="port-name">X</div>
            <div className="port-noodle"></div>
          </div>
          <div className="port">
            <div className="port-name">Y</div>
            <div className="port-noodle"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Node