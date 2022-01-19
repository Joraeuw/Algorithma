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
      if (
        state[action.payload.nodeId][action.payload.key] ===
        action.payload.value
      ) {
        console.log('on break!');
        break;
      }

      if (
        action.type === 'SET_ROOT_NODE_ID' ||
        action.type === 'SET_TARGET_NODE_ID'
      ) {
        const oldNodeId =
          newState[action.type === 'SET_TARGET_NODE_ID' ? 'target' : 'root'];

        newState[oldNodeId][action.payload.key] = false;
        newState[action.payload.nodeId][action.payload.key] = true;
        newState[action.payload.key === 'isRoot' ? 'root' : 'target'] =
          action.payload.nodeId;

        newState[action.payload.nodeId] = setStroke(
          newState[action.payload.nodeId]
        );
        newState[oldNodeId] = setStroke(newState[oldNodeId]);
      }
      console.log(action.payload.key);
      switch (action.payload.key) {
        case 'isVisited':
          if (newState[action.payload.nodeId].isVisited)
            newState.className = removeClass(
              newState.className,
              'visited_node'
            );
          else
            newState.className = addClass(newState.className, 'visited_node');
          break;
        case 'isWithinTriplet':
          if (newState[action.payload.nodeId].isWithinTriplet)
            newState.className = removeClass(
              newState.className,
              'triplet_node'
            );
          else
            newState.className = addClass(newState.className, 'triplet_node');
          break;
        //! IT NEVER VISITS IS TARGET FOR SOME REASON FIND
        //! OUT WHI MIGHT BE MISSCARENES FROM STATE AND NEWSTATE
        /*case 'isTarget':
          console.log(action.payload);
          if (newState[action.payload.nodeId].ísTarget) {
            newState[action.payload.nodeId].stroke = 'blue';
            newState[newState.target].stroke = newState[newState.target].isRoot
              ? 'green'
              : 'rgb(244, 0, 137)';
          } else newState[action.payload.nodeId].stroke = 'rgb(244, 0, 137)';
          break;
        case 'isRoot':
          if (newState[action.payload.nodeId].isRoot) {
            newState[action.payload.nodeId].stroke = 'green';
            newState[newState.root].stroke = newState[newState.root].isTarget
              ? 'blue'
              : 'rgb(244, 0, 137)';
            console.log(newState[newState.root].stroke);
          } else newState[action.payload.nodeId].stroke = 'rgb(244, 0, 137)';
          break;
      }*/
      }
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
      delete newState[action.payload.nodeId];
      break;
    default:
      break;
  }

  return newState;
};

function setStroke(node) {
  if (node.isTarget) node.stroke = 'green';
  else if (node.isRoot) node.stroke = 'blue';
  else node.stroke = 'rgb(244, 0, 137)';
  return node;
}

export default NodeStyleReducer;
