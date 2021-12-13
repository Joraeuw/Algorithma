import mouseEvents from '../MouseEvents/mouseEvents';
import Node from '../node/Node';
import { viewBoxWidth, viewBoxHeight } from '@/settings/screen';
import store from '@redux/store';
import { useSelector } from 'react-redux';
// import { getStartPoint } from '@/staticFunctions';
// import { R } from '@/settings/screen';
// import { v4 as generateUID } from 'uuid';
// import { addNewNode } from '@/redux/actions/addNewNode';

// const genewrateNewNode = (coordinates) => {
//   const nodeId = generateUID();
//   const startInitR = getStartPoint(coordinates, R, -45);
//   const startInitL = getStartPoint(coordinates, R, 225);

//   let newNode = {
//     id: nodeId,
//     parentNodeId: null,
//     //Create public var radius
//     r: R,
//     //Take position form dropping postiion from react dnd
//     position: coordinates,
//     //Default value would be empty string
//     value: '',
//     rightCurve: {
//       childId: null,
//       baseId: nodeId,
//       isConnected: false,
//       //
//       startPoint: startInitR,
//       //shit
//       controlPoint1: startInitR,
//       //shit
//       controlPoint2: startInitR,
//       //shit
//       endPoint: { x: startInitR.x + 1, y: startInitR.y + 1 },
//     },
//     leftCurve: {
//       childId: null,
//       baseId: nodeId,
//       isConnected: false,
//       startPoint: startInitL,
//       controlPoint1: startInitL,
//       controlPoint2: startInitL,
//       endPoint: { x: startInitL.x - 1, y: startInitL.y + 1 },
//     },

//     parentConnectionArea: {
//       r: R,
//       x: coordinates.x,
//       y: coordinates.y - R + offset,
//     },
//   };

//   store.dispath(addNewNode(newNode));
//   return nodeId;
// };

const BinaryTreePanel = () => {
  let nodesData = useSelector((state) => state.panelState).nodes;
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
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(event) => mouseEvents.handleMouseMove(event)}
      onMouseLeave={() => mouseEvents.handleMouseLeave()}
    >
      {nodes}
    </svg>
  );
};

export default BinaryTreePanel;
