import { getStartPoint } from '@utils';

const initR = 50;
const offset = 0;
const init = { id: 0, r: 50, position: { x: 100, y: 100 } };
const startInitR = getStartPoint(init.position, init.r, -45);
const startInitL = getStartPoint(init.position, init.r, 225);

const init2 = { id: 1, r: 50, position: { x: 300, y: 300 } };
let stateInit = {
  lastNodeId: 'node0',
  rootNodeId: 'node0',
  targetNodeId: 'node0',
  nodes: [
    {
      id: 'node0',
      parentNodeId: null,
      r: init.r,
      position: init.position,
      value: 'node0',
      rightCurve: {
        childId: null,
        baseId: 'node0',
        isConnected: false,
        //perfect
        startPoint: startInitR,
        //shit
        controlPoint1: startInitR,
        //shit
        controlPoint2: startInitR,
        //shit
        endPoint: { x: startInitR.x + 1, y: startInitR.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node0',
        isConnected: false,
        startPoint: startInitL,
        controlPoint1: startInitL,
        controlPoint2: startInitL,
        endPoint: { x: startInitL.x - 1, y: startInitL.y + 1 },
      },

      parentConnectionArea: {
        r: initR,
        x: init.position.x,
        y: init.position.y - init.r + offset,
      },
    },
  ],
  draggingObjectId: null,
  isDragging: false,
};
export { stateInit, init2, offset };
