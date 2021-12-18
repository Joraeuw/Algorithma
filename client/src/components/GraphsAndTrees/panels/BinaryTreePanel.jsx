import mouseEvents from '../MouseEvents/mouseEvents';
import Node from '../node/Node';
import { useSelector } from 'react-redux';
import { Zoom } from '@/redux/actions/Zoom';
import store from '@/redux/store';

//Handle drag by changeing is dragging if its true and
//has no dragging id it measn that svg is being dragged
//Implement onMouseDownOnSvg, onMosueUpOnSvg and edit
//onMosueMove to change viewBox x and y given mouse positions
const handleDrag = (event) => {
  if (event.target.getAttribute('id') !== 'svgRoot') return;
  let viewBoxDigits = event.target.getAttribute('viewBox');
  viewBoxDigits = viewBoxDigits.split(',').map(Number);
  console.log(viewBoxDigits);

  const viewBox = {
    x: viewBoxDigits[0],
    y: viewBoxDigits[1],
    width: viewBoxDigits[2],
    height: viewBoxDigits[3],
  };
  store.dispatch(Zoom(viewBox));
};

const BinaryTreePanel = () => {
  const nodesData = useSelector((state) => state.panelState).nodes;
  const viewBox = useSelector((state) => state.viewBox);

  const nodes = Object.values(nodesData).map((nodeData) => (
    <Node
      key={nodeData.id}
      nodeId={nodeData.id}
      handleMouseDownOnNode={(e) => {
        mouseEvents.handleMouseDownOnNode(e, nodeData.id);
      }}
      handleMouseUpOnNode={mouseEvents.handleMouseUpOnNode}
      handleMouseDown={mouseEvents.handleMouseDown}
      handleMouseUp={mouseEvents.handleMouseUp}
    />
  ));

  return (
    <svg
      id="svgRoot"
      className="self-stretch h-full"
      viewBox={`${viewBox.x},${viewBox.y},${viewBox.width},${viewBox.height}`}
      onMouseMove={(event) => mouseEvents.handleMouseMove(event)}
      onMouseLeave={() => mouseEvents.handleMouseLeave()}
      // onMouseUp={}
    >
      {nodes}
    </svg>
  );
};

export default BinaryTreePanel;
