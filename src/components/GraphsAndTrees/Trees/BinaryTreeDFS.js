import store from '@redux/store';

const nodes = store.getState().panelState.nodes;
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

let DFSByValue = (targetNodeValue, rootId = 'node6') => {
  const root = nodes[rootId];
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;
  findNodeRecursionDFS(targetNodeValue, root);

  return record;
};

export default DFSByValue;
