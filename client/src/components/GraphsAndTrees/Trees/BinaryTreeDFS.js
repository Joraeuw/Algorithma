import store from '../../../redux/store';

const nodes = store.getState().panelState.nodes;
let record = '';
let foundNode = null;
const _root = nodes['node6'];

let findNodeRecursion = (targetNodeValue, currentNode) => {
  if (!currentNode) return;

  if (currentNode.value === targetNodeValue) {
    foundNode = true;
    record += 'found at: ' + currentNode.id + '\n';
    record += currentNode.id + ' => ' + currentNode.parentNodeId + '\n';
    return;
  }
  if (currentNode.leftCurve.childId && !foundNode) {
    record += currentNode.id + ' => ' + currentNode.leftCurve.childId + '\n';
    findNodeRecursion(targetNodeValue, nodes[currentNode.leftCurve.childId]);
  }
  if (currentNode.rightCurve.childId && !foundNode) {
    record += currentNode.id + ' => ' + currentNode.rightCurve.childId + '\n';
    findNodeRecursion(targetNodeValue, nodes[currentNode.rightCurve.childId]);
  }
  record += currentNode.id + ' => ' + currentNode.parentNodeId + '\n';
};

let DFSByValue = (targetNodeValue, root = _root) => {
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;
  findNodeRecursion(targetNodeValue, root);

  return record;
};

export default DFSByValue;
