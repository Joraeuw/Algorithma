import { stateInit } from "../../components/GraphsAndTrees/node/initialNodeData";

const NodesStateReducer = (state = stateInit, action) => {
  switch (action.type) {
    case 'SET_DRAGGING_OBJECT_ID':
      return { ...state, draggingObjectId: action.payload.draggingObjectId };
    default:
      return state;
  }
};
export default NodesStateReducer;
