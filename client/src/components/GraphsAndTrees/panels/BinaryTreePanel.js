import mouseEvents from '../MouseEvents/mouseEvents';
import Node from '../node/Node';
import { viewBoxWidth, viewBoxHeight } from '@/settings/screen';
import store from '@redux/store';

const state = store.getState().panelState;

const BinaryTreePanel = () => {
  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(event) => mouseEvents.handleMouseMove(event)}
      onMouseLeave={() => mouseEvents.handleMouseLeave()}
    >
      {nodes}
    </svg>
  );
};

const nodes = Object.keys(state.nodes).map((nodeId) => (
  <Node
    key={nodeId}
    nodeId={nodeId}
    handleMouseDownOnNode={(e) => {
      mouseEvents.handleMouseDownOnNode(e, nodeId);
    }}
    handleMouseUpOnNode={mouseEvents.handleMouseUpOnNode}
    handleMouseDown={mouseEvents.handleMouseDown}
    handleMouseUp={mouseEvents.handleMouseUp}
  />
));

export default BinaryTreePanel;
