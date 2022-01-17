import { binaryNodesStyling } from '@/components/nodesStyling/nodeStyle';
import { addString as addClass, removeString as removeClass } from '@utils';

const NodeStyleReducer = (state = binaryNodesStyling, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_NEW_NODE_STYLE':
      newState[action.payload.nodeStyle.id] = action.payload.nodeStyle;
      break;
    case 'SET_NODE_BOOLEAN':
    case 'SET_ROOT_NODE_ID':
    case 'SET_TARGET_NODE_ID':
      console.log(state[action.payload.nodeId][action.payload.key], action.payload.value);
      if (
        !state[action.payload.nodeId][action.payload.key] ===
        action.payload.value
      )
        break;

        if(action.type === 'SET_ROOT_NODE_ID')
      newState[action.payload.nodeId][action.payload.key] =
        action.payload.value;
      console.log(action.payload.value);

      switch (action.payload.key) {
        case 'isVisited':
          if (state[action.payload.nodeId].isVisited)
            removeClass(newState.className, 'visited_node');
          else addClass(newState.className, 'visited_node');
          break;
        case 'isWithinTriplet':
          if (state[action.payload.nodeId].isWithinTriplet)
            removeClass(newState.className, 'triplet_node');
          else addClass(newState.className, 'triplet_node');
          break;
        case 'ísTarget':
          if (state[action.payload.nodeId].ísTarget)
            newState[action.payload.nodeId].stroke = 'blue';
          else newState[action.payload.nodeId].stroke = 'rgb(244, 0, 137)';
          break;
        case 'isRoot':
          if (state[action.payload.nodeId].isRoot)
            newState[action.payload.nodeId].stroke = 'green';
          else newState[action.payload.nodeId].stroke = 'rgb(244, 0, 137)';
          break;
        default:
          break;
      }
      break;
    case 'SET_CURVE_BOOLEAN':
      const curve = action.payload.isRight ? 'rightCurve' : 'leftCurve';

      if (
        !state[action.payload.nodeId][curve][action.payload.key] ===
        action.payload.value
      ) {
        break;
      }
      newState[action.payload.nodeId][curve][action.payload.key] =
        action.payload.value;

      switch (action.payload.key) {
        case 'isVisited':
          if (state[curve][action.payload.nodeId].isVisited)
            newState[curve].stroke = 'rgb(211, 211, 211)';
          //!SELECTED SECTION OF CURVE (MUST CHOOSE APP COLOR)
          else newState[curve].stroke = 'rgb(213, 0, 249)';
          break;
        case 'isWithinTriplet':
          if (state[curve][action.payload.nodeId].isWithinTriplet)
            newState[curve].stroke = 'rgb(213, 0, 249)';
          else newState[curve].stroke = 'rgb(255, 195, 0)';
          break;
        default:
          break;
      }

      break;
    case 'REMOVE_NODE':
      console.log(4);
      delete newState[action.payload.nodeId];
      break;
    default:
      break;
  }

  return newState;
};

export default NodeStyleReducer;
