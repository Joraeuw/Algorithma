import mouseEvents from '../MouseEvents/mouseEvents';
import Node from '../node/Node';
import { useSelector } from 'react-redux';
import { Zoom } from '@/redux/actions/Zoom';
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

const handleScroll = (e) => {
  const target = e.target.getAttribute('viewBox');

  //store.dispath(Zoom());
  console.log(target);
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
  console.log(viewBox);
  return (
    <svg
      id="svgRoot"
      className="self-stretch h-full"
      viewBox={`${viewBox.x},${viewBox.y},${viewBox.width},${viewBox.height}`}
      onMouseMove={(event) => mouseEvents.handleMouseMove(event)}
      onMouseLeave={() => mouseEvents.handleMouseLeave()}
      onScroll={handleScroll}
    >
      {nodes}
    </svg>
  );
};

export default BinaryTreePanel;
