import store from '@redux/store';

//Mouse Handlers
import handleMouseUpOnNode from './MouseEvents/handleMouseUpOnNode';
import handleMouseDown from './MouseEvents/handleMouseDown';
import handleMouseLeave from './MouseEvents/handleMouseLeave';
import handleMouseUp from './MouseEvents/handleMouseUp';
import handleMouseDownOnNode from './MouseEvents/handleMouseDownOnNode';
import handleMouseMove from './MouseEvents/handleMouseMove';
//Others
import Node from './node/Node';
import { viewBoxWidth, viewBoxHeight } from '@/settings/screen';
import { scaleSVG } from '@/redux/actions/scaleSVG';

//const scale = store.getState().scale;
const state = store.getState().panelState;

// const handleZoom = (event) => {
//   //event..preventDefault();
//   console.log(event);
//   let newScale = scale + event.deltaY * -0.01;

//   //Restrict to be bigger than 0
//   newScale = Math.min(Math.max(0, newScale), 4);
//   console.log(newScale);

//   store.dispatch(scaleSVG(newScale));
// };
const Panel = (props) => {
  //console.log(nodes);
  //const viewBoxWidth = 1500;
  //const viewBoxHeight = 1500;

  return (
    <div /*onWheel={handleZoom}*/ className="svg-container overflow-scroll">
      <svg
        id="svgRoot"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseLeave={() => handleMouseLeave()}
      >
        {nodes}
      </svg>
    </div>
  );
};
const nodes = Object.keys(state.nodes).map((nodeId) => (
  <Node
    key={nodeId}
    nodeId={nodeId}
    handleMouseDownOnNode={(e) => {
      handleMouseDownOnNode(e, nodeId);
    }}
    handleMouseUpOnNode={handleMouseUpOnNode}
    handleMouseDown={handleMouseDown}
    handleMouseUp={handleMouseUp}
  />
));
export default Panel;
