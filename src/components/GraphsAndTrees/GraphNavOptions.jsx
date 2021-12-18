import DFSByValue from './Trees/BinaryTreeDFS';
import { useSelector } from 'react-redux';
import store from '@redux/store';
import { defaultCoordinates as coordinates, offset } from '@/settings/screen';
import { getStartPoint } from '@/staticFunctions';
import { R } from '@/settings/screen';
import { v4 as generateUID } from 'uuid';
import { addNewNode } from '@/redux/actions/addNewNode';
import { setOverallState } from '@/redux/actions/setOverallState';
//import { useDrag } from 'react-dnd';
//import Node from './node/Node';

const handleClick = (setPath, rootNodeId, targetNodeId) => {
  const path = DFSByValue(rootNodeId, targetNodeId);
  setPath(path);
};

const handleNewNode = (state) => {
  const nodeId = generateUID();
  const startInitR = getStartPoint(coordinates, R, -45);
  const startInitL = getStartPoint(coordinates, R, 225);
  let newNode = {
    id: nodeId,
    parentNodeId: null,
    //Create public var radius
    r: R,
    //Take position form dropping postiion from react dnd
    position: coordinates,
    //Default value would be empty string
    value: '',
    rightCurve: {
      childId: null,
      baseId: nodeId,
      isConnected: false,
      //
      startPoint: startInitR,
      //shit
      controlPoint1: startInitR,
      //shit
      controlPoint2: startInitR,
      //shit
      endPoint: { x: startInitR.x + 1, y: startInitR.y + 1 },
    },
    leftCurve: {
      childId: null,
      baseId: nodeId,
      isConnected: false,
      startPoint: startInitL,
      controlPoint1: startInitL,
      controlPoint2: startInitL,
      endPoint: { x: startInitL.x - 1, y: startInitL.y + 1 },
    },

    parentConnectionArea: {
      r: R,
      x: coordinates.x,
      y: coordinates.y - R + offset,
    },
  };

  // state.nodes[newNode.id] = newNode;
  // store.dispatch(setOverallState(state));
  store.dispatch(addNewNode(newNode));
};

const GraphNavOptions = ({ setPath }) => {
  const rootNodeId = useSelector((state) => state.panelState.rootNodeId);
  const targetNodeId = useSelector((state) => state.panelState.targetNodeId);

  const state = { ...useSelector((state) => state.panelState) };

  return (
    <div className="h-20">
      <button
        className="bg-pink-500 rounded-md text-white p-5"
        onClick={() => handleClick(setPath, rootNodeId, targetNodeId)}
      >
        Calculate
      </button>
      {/* Dragable NODE MIGHT BE IMPLEMENTED LATER! */}
      <button
        className="bg-pink-500 rounded-md text-white p-5"
        onClick={() => handleNewNode(state)}
      >
        Add node
      </button>
    </div>
  );
};

// let Drag = (id) => {
//   //I must add the function generateNwNode on the
//   const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
//     type: 'Node',
//     // The collect function utilizes a "monitor" instance (see the Overview for what this is)
//     // to pull important pieces of state from the DnD system.
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));
//   return <Node id={id} />;
// };

export default GraphNavOptions;
