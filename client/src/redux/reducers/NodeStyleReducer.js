import { binaryNodesStyling } from '@/components/nodesStyling/nodeStyle';

const NodeStyleReducer = (state = binaryNodesStyling, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'SET_NODE_COLOR':
      state[action.nodeId].className = action.className;
      break;
    case 'SET_CURVE_COLOR':
      if (action.isRight)
        state[action.nodeId].rightCurve.className = action.className;
      else state[action.nodeId].leftCurve.className = action.className;

      break;
    default:
      break;
  }

  return newState;
};

export default NodeStyleReducer;
