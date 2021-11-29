import { stateInit } from '../../components/GraphsAndTrees/node/initialNodeData';
import { nodesIdMap } from '@/staticFunctions';
import { act } from 'react-dom/test-utils';

const NodesStateReducer = (
  state = { ...stateInit, nodes: nodesIdMap(stateInit.nodes) },
  action
) => {
  switch (action.type) {
    case 'SET_DRAGGING_OBJECT_ID':
      return { ...state, draggingObjectId: action.payload.draggingObjectId };
    case 'SET_PARENT_CONNECTION_AREA':
      return parentConnectionArea(state, action.payload);
    case 'SET_OVERALL_STATE':
      return action.payload.state;
    case 'ADD_NEW_NODE':
      return addNewNode(state, action.payload);
    case 'SET_LAST_NODE_ID':
      return { ...state, lastNodeId: action.payload.nodeId };
    case 'SET_ROOT_NODE_ID':
      state.nodes[state.rootNodeId].isRoot = false;
      state.nodes[action.payload.nodeId].isRoot = true;
      return { ...state, rootNodeId: action.payload.nodeId };
    case 'SET_TARGET_NODE_ID':
      state.nodes[state.targetNodeId].isTarget = false;
      state.nodes[action.payload.nodeId].isTarget = true;
      return { ...state, targetNodeId: action.payload.nodeId };
    default:
      return state;
  }
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
