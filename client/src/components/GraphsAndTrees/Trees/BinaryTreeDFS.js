import { setMaxFrames } from '@/redux/actions/setMaxFrames';
import store from '@redux/store';

const nodes = store.getState().panelState.nodes;
let record = '';
let foundNode = null;

let findNodeRecursionDFS = (targetNode, currentNode) => {
  if (!currentNode) return;
  //console.log(currentNode);

  if (currentNode.id === targetNode.id) {
    foundNode = true;
    record += `found at: ${currentNode.id}\n`;
    record += `${currentNode.parentNodeId} <= ${currentNode.id}\n`;

    return;
  }
  if (currentNode.leftCurve.childId && !foundNode) {
    record += `${currentNode.id} => ${currentNode.leftCurve.childId}\n`;
    findNodeRecursionDFS(targetNode, nodes[currentNode.leftCurve.childId]);
  }
  if (currentNode.rightCurve.childId && !foundNode) {
    record += `${currentNode.id} => ${currentNode.rightCurve.childId}\n`;
    findNodeRecursionDFS(targetNode, nodes[currentNode.rightCurve.childId]);
  }
  record += `${currentNode.parentNodeId} <= ${currentNode.id}\n`;
};

let DFSByValue = (rootId, targetId) => {
  //Id to value mapping for node
  const root = nodes[rootId];
  const target = nodes[targetId];
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;
  findNodeRecursionDFS(target, root);

  //Sets the maxFrames
  record = record.substring(0, record.length - 1);
  store.dispatch(setMaxFrames(record.split(/\n/).length));
  return record;
};

// function getMap() {
//   const map = {};

//   for (const node in nodes) {
//     map[node.toString()] = nodes[node].value;
//   }

//   return map;
// }

export default DFSByValue;
