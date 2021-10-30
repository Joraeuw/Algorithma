import { stateInit } from '../../components/GraphsAndTrees/node/initialNodeData';
import { nodesIdMap } from '../../staticFunctions';

const NodesStateReducer = (
  state = { ...stateInit, nodes: nodesIdMap(stateInit.nodes) },
  action
) => {
  //console.log(state.nodes[1])
  switch (action.type) {
    case 'SET_DRAGGING_OBJECT_ID':
      return { ...state, draggingObjectId: action.payload.draggingObjectId };
    case 'SET_PARENT_CONNECTION_AREA':
      return parentConnectionArea(state, action.payload);
    case 'SET_OVERALL_STATE':
      return action.payload.state;
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
