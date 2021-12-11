import { stateInit } from '../../components/GraphsAndTrees/node/initialNodeData';
import { nodesIdMap } from '@/staticFunctions';
import { act } from 'react-dom/test-utils';

const NodesStateReducer = (
  state = { ...stateInit, nodes: nodesIdMap(stateInit.nodes) },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case 'SET_DRAGGING_OBJECT_ID':
      newState.draggingObjectId = action.payload.draggingObjectId;
      break;
    case 'SET_PARENT_CONNECTION_AREA':
      newState = parentConnectionArea(newState, action.payload);
      break;
    case 'SET_OVERALL_STATE':
      newState = action.payload.state;
      break;
    case 'ADD_NEW_NODE':
      newState = addNewNode(newState, action.payload);
      break;
    case 'SET_LAST_NODE_ID':
      newState.lastNodeId = action.payload.nodeId;
      break;
    case 'SET_ROOT_NODE_ID':
      newState.nodes[newState.rootNodeId].isRoot = false;
      newState.nodes[action.payload.nodeId].isRoot = true;
      newState.rootNodeId = action.payload.nodeId;
      break;
    case 'SET_TARGET_NODE_ID':
      newState.nodes[newState.targetNodeId].isTarget = false;
      newState.nodes[action.payload.nodeId].isTarget = true;
      newState.targetNodeId = action.payload.nodeId;
      break;
    case 'SET_NODE_VALUE':
      newState.nodes[action.payload.nodeId].value = action.payload.newValue;
      break;
    default:
      break;
  }
  return newState;
};
export default NodesStateReducer;

const parentConnectionArea = (state, { isLeft, node, curve }) => {
  const newState = { ...state };

  if (isLeft) newState.nodes[node.id].leftCurve = curve;
  else newState.nodes[node.id].rightCurve = curve;

  return newState;
};

const addNewNode = (state, { newNode }) => {
  const newState = { ...state };

  newState.nodes[newNode.id] = {
    ...newNode,
  };
  return newState;
};
