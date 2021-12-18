import store from '@redux/store';

const nodes = store.getState().panelState.nodes;
let record = '';
let foundNode = null;

let findNodeRecursionDFS = (targetNodeValue, currentNode) => {
  if (!currentNode) return;

  if (currentNode.value === targetNodeValue) {
    foundNode = true;
    record += 'found at: ' + currentNode.value + '\n';
    record += currentNode.value + ' => ' + currentNode.parentNodeId + '\n';
    return;
  }
  if (currentNode.leftCurve.childId && !foundNode) {
    record += currentNode.value + ' => ' + currentNode.leftCurve.childId + '\n';
    findNodeRecursionDFS(targetNodeValue, nodes[currentNode.leftCurve.childId]);
  }
  if (currentNode.rightCurve.childId && !foundNode) {
    record +=
      currentNode.value + ' => ' + currentNode.rightCurve.childId + '\n';
    findNodeRecursionDFS(
      targetNodeValue,
      nodes[currentNode.rightCurve.childId]
    );
  }
  record += currentNode.value + ' => ' + currentNode.value + '\n';
};

let DFSByValue = (rootId, targetId) => {
  const root = nodes[rootId];
  const target = nodes[targetId];
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;
  console.log(root, target);
  findNodeRecursionDFS(target.value, root);

  return record;
};

export default DFSByValue;
