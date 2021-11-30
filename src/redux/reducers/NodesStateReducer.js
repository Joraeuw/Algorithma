import { stateInit } from '../../components/GraphsAndTrees/node/initialNodeData';
import { nodesIdMap } from '@/staticFunctions';
import { act } from 'react-dom/test-utils';

const NodesStateReducer = (
  state = { ...stateInit, nodes: nodesIdMap(stateInit.nodes) },
  action
) => {
  switch (action.type) {
    case 'SET_DRAGGING_OBJECT_ID':
      state.draggingObjectId = action.payload.draggingObjectId;
      break;
    case 'SET_PARENT_CONNECTION_AREA':
      state = parentConnectionArea(state, action.payload);
      break;
    case 'SET_OVERALL_STATE':
      state = action.payload.state;
      break;
    case 'ADD_NEW_NODE':
      state = addNewNode(state, action.payload);
      break;
    case 'SET_LAST_NODE_ID':
      state.lastNodeId = action.payload.nodeId;
      break;
    case 'SET_ROOT_NODE_ID':
      state.nodes[state.rootNodeId].isRoot = false;
      state.nodes[action.payload.nodeId].isRoot = true;
      state.rootNodeId = action.payload.nodeId;
      break;
    case 'SET_TARGET_NODE_ID':
      state.nodes[state.targetNodeId].isTarget = false;
      state.nodes[action.payload.nodeId].isTarget = true;
      state.targetNodeId = action.payload.nodeId;
      break;
    case 'SET_NODE_VALUE':
      state.nodes[action.payload.nodeId].value = action.payload.newValue;
      break;
    default:
      break;
  }
  return state;
};
export default NodesStateReducer;

const parentConnectionArea = (state, { isLeft, node, curve }) => {
  const newState = { ...state };

  if (isLeft) newState.nodes[node.id].leftCurve = curve;
  else newState.nodes[node.id].rightCurve = curve;

  return newState;
};

const addNewNode = (state, { newNode }) => {
  return (state[newNode.id] = newNode);
};
