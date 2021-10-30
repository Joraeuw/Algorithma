import store from '../../redux/store';

//Mouse Handlers
import handleMouseUpOnNode from './MouseEvents/handleMouseUpOnNode';
import handleMouseDown from './MouseEvents/handleMouseDown';
import handleMouseLeave from './MouseEvents/handleMouseLeave';
import handleMouseUp from './MouseEvents/handleMouseUp';
import handleMouseDownOnNode from './MouseEvents/handleMouseDownOnNode';
import handleMouseMove from './MouseEvents/handleMouseMove';

import Node from './node/Node';
const state = store.getState().panelState;

const Panel = (props) => {
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;
  //console.log(nodes);
  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseLeave={() => handleMouseLeave()}
    >
      {nodes}
    </svg>
  );
};

const nodes = Object.keys(state.nodes).map((nodeId) => (
  <Node
    key={nodeId}
    handleMouseDownOnNode={() => handleMouseDownOnNode(nodeId)}
    handleMouseUpOnNode={handleMouseUpOnNode}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
    nodeId={nodeId}
  />
));

export default Panel;
