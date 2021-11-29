import store from '@redux/store';

const state = store.getState().panelState;
const nodes = state.nodes;
let record = '';
let foundNode = null;

let findNodeRecursionDFS = (targetNodeValue, currentNode) => {
  if (!currentNode) return;

  if (currentNode.value === targetNodeValue) {
    foundNode = true;
    record += 'found at: ' + currentNode.id + '\n';
    record += currentNode.id + ' => ' + currentNode.parentNodeId + '\n';
    return;
  }
  if (currentNode.leftCurve.childId && !foundNode) {
    record += currentNode.id + ' => ' + currentNode.leftCurve.childId + '\n';
    findNodeRecursionDFS(targetNodeValue, nodes[currentNode.leftCurve.childId]);
  }
  if (currentNode.rightCurve.childId && !foundNode) {
    record += currentNode.id + ' => ' + currentNode.rightCurve.childId + '\n';
    findNodeRecursionDFS(
      targetNodeValue,
      nodes[currentNode.rightCurve.childId]
    );
  }
  record += currentNode.id + ' => ' + currentNode.parentNodeId + '\n';
};

let DFSByValue = (rootId, tragetId) => {
  const root = nodes[rootId];
  const target = nodes[tragetId];
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;

  findNodeRecursionDFS(target.value, root);

  return record;
};

export default DFSByValue;
