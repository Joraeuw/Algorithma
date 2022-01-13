import store from '@redux/store';

const nodes = store.getState().panelState.nodes;
let record = '';
let foundNode = null;

//! FIX:
//node0 => set value
//found at: set value
//set value => undefined
//node0 => node0

let findNodeRecursionDFS = (targetNodeValue, currentNode, idToValue) => {
  if (!currentNode) return;
  console.log(currentNode);

  if (currentNode.value === targetNodeValue) {
    foundNode = true;
    console.log(idToValue);
    console.log(currentNode.parentNodeId);
    record += `found at: ${currentNode.value}\n`;
    record += `${currentNode.value} => ${
      idToValue?.[currentNode.parentNodeId]
    }\n`;

    return;
  }
  if (currentNode.leftCurve.childId && !foundNode) {
    record += `${currentNode.value} => ${
      idToValue?.[currentNode.leftCurve.childId]
    }\n`;
    findNodeRecursionDFS(
      targetNodeValue,
      nodes[currentNode.leftCurve.childId],
      idToValue
    );
  }
  if (currentNode.rightCurve.childId && !foundNode) {
    record += `${currentNode.value} => ${
      idToValue?.[currentNode.rightCurve.childId]
    }\n`;
    findNodeRecursionDFS(
      targetNodeValue,
      nodes[currentNode.rightCurve.childId],
      idToValue
    );
  }
  record += `${currentNode.value} => ${currentNode.parentNodeId}\n`;
};

let DFSByValue = (rootId, targetId) => {
  //Id to value mapping for node
  const idToValue = getMap();
  console.log(idToValue);
  const root = nodes[rootId];
  const target = nodes[targetId];
  //RECORD/ PATH SAME THING
  record = '';
  foundNode = null;
  findNodeRecursionDFS(target.value, root, idToValue);

  return record;
};

function getMap() {
  const map = {};

  for (const node in nodes) {
    map[node.toString()] = nodes[node].value;
  }

  return map;
}

export default DFSByValue;
