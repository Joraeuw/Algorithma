import { setNodeBoolean } from '@/redux/actions/setNodeBoolean';
import store from '@/redux/store';

const getStartPoint = ({ x, y }, r, theta) => {
  theta *= Math.PI / 180;
  const result = { x: x + r * Math.cos(theta), y: y - r * Math.sin(theta) };
  return result;
};

const isWithingPerimeter = (state, currentLocation) => {
  for (const nodeId in state.nodes) {
    const node = state.nodes[nodeId];
    const area = node.parentConnectionArea;
    //Distance between currentLocation and node.ParrentConnectionArea.position
    const distance = Math.sqrt(
      Math.pow(area.x - currentLocation.x, 2) +
        Math.pow(area.y - currentLocation.y, 2)
    );
    if (distance <= area.r) return [true, node];
  }
  return [false, null];
};

//Determines the position of the end point
const recalculateEndPoint = ({ x, y }, r, theta, offsetX, offsetY) => {
  theta *= Math.PI / 180;
  const result = {
    x: x + r * Math.cos(theta) + offsetX,
    y: y - r * Math.sin(theta) + offsetY,
  };
  return result;
};
//Calculating the angle at which the arrow must be displayed
// 1. Evaluate the derivative at end point
// 2. calculate the roration angle
const ArrowAngle = (crl, end) => {
  //Full bezie curve term
  //const by =
  //3 * (1 - t) ** 2 * (crl1.y - start.y) +
  //6 * (1 - t) * t * (crl2.y - crl1.y) +
  //3 * t ** 2 * (end.y - crl2.y);

  // Fix at crl2.x === end.x
  if (crl.x === end.x) return crl.y > end.y ? -30 : 30;

  //determine in which quadrant the point is:
  //Q stands for quadrant
  //Q1 adds 0 deg
  let additional = 0;
  //Q4 add 360 deg
  if (crl.y > end.y && crl.x > end.x) additional = 360;
  //Q2 and Q3 add 180 deg
  else if (crl.x < end.x) additional = 180;

  const unitVelocityVector = {
    x: end.x - crl.x,
    y: end.y - crl.y,
  };

  //Angle of arrow
  const theta =
    (Math.atan(unitVelocityVector.y / unitVelocityVector.x) * 180) / Math.PI;

  return theta + additional;
};

const nodesIdMap = (flatArrayOfNodes) =>
  flatArrayOfNodes.reduce(
    (state, node) => ({
      ...state,
      [node.id]: node,
    }),
    {}
  );

const getCurrentOperation = (data, index) => {
  const lines = data.split('\n');
  const past = lines.slice(0, index);
  console.log(index, lines.length);
  let stack = [];
  let visited = new Set();
  if (lines.length <= 1) return;

  if (index + 1 === lines.length) visited.add(operationType(lines[0]).match[1]);

  for (const operation of past) {
    let { type: oldType, match: oldMatch } = operationType(operation);
    if (oldType === 'transition' && index !== 0) {
      stack.push(oldMatch[1]);
    } else if (oldType === 'return') {
      stack.pop();
      visited.add(oldMatch[2]);
    } else if (oldType === 'exit') {
      stack.pop();
      stack.pop();
    } else if (oldType === 'target') {
      visited.add(oldMatch[1]);
      stack.pop();
    }
    console.log(stack, visited);
  }

  // for (const operation of past) {
  // }

  let { type, match } = operationType(lines[index]);
  let nodeAId, nodeBId;

  if (type === 'transition') {
    [nodeAId, nodeBId] = [match[1], match[2]];
  } else if (type === 'exit') {
    nodeAId = match[2];
  } else if (type === 'target') {
    nodeAId = match[1];
  } else if (type === 'return') {
    [nodeAId, nodeBId] = [match[2], match[1]];
  }

  return {
    nodeAId,
    nodeBId,
    size: lines.length,
    type,
    stack,
    visited,
  };
};

function operationType(operation) {
  const regOfTransition = /(.+) => (.+)/;
  const regOfReturn = /(.+) <= (.+)/;
  const regOfTargetReached = /found at: (.+)/;
  const regOfExit = /(undefined|null) <= (.+)/;

  let type = '';
  let match;
  let text = '';
  if (regOfTransition.test(operation)) {
    text = 'This operation is of type transition!';
    type = 'transition';
    match = regOfTransition.exec(operation);
  } else if (regOfExit.test(operation)) {
    text = 'This operation is of type exit!';
    type = 'exit';
    match = regOfExit.exec(operation);
  } else if (regOfTargetReached.test(operation)) {
    text = 'This operation is of type target reached!';
    type = 'target';
    match = regOfTargetReached.exec(operation);
  } else if (regOfReturn.test(operation)) {
    text = 'This operation is of type return!';
    type = 'return';
    match = regOfReturn.exec(operation);
  }
  //console.log(text);
  return { type, match };
}

function addString(string, newString) {
  string += `${newString} `;
  return string;
}

function removeString(string, removeable) {
  string.replace(removeable, '');
  return string;
}

export {
  getStartPoint,
  ArrowAngle,
  recalculateEndPoint as getEndAndControlPoint,
  isWithingPerimeter,
  nodesIdMap,
  addString,
  removeString,
  getCurrentOperation,
};
