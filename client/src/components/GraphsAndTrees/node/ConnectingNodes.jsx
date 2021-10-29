import Node from './Node';

const makeConnection = (parent, child, isLeft) => {
  if (isLeft) parent.leftCurve.childId = child.id;
  else parent.rightCurve.childId = child.id;
};

export { makeConnection };
