import { getStartPoint } from '../../../staticFunctions';

const initR = 50;
const offset = 0;
const init = { id: 0, r: 50, position: { x: 100, y: 100 } };
const startInitR = getStartPoint(init.position, init.r, -45);
const startInitL = getStartPoint(init.position, init.r, 225);

const init2 = { id: 1, r: 50, position: { x: 300, y: 300 } };
const startInitR2 = getStartPoint(init2.position, init2.r, -45);
const startInitL2 = getStartPoint(init2.position, init2.r, 225);
const stateInit = {
  nodes: [
    {
      id: 'whateverTheDUCKINGStringOR NUM u want',
      r: init.r,
      position: init.position,
      value: 'node0',
      rightCurve: {
        childId: 1,
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
        child: 'node2',
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
    {
      id: 1,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node1',
      rightCurve: {
        childId: null,
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        child: 'node2',
        isConnected: false,
        startPoint: startInitL2,
        controlPoint1: startInitL2,
        controlPoint2: startInitL2,
        endPoint: { x: startInitL2.x - 1, y: startInitL2.y + 1 },
      },

      parentConnectionArea: {
        r: initR,
        x: init2.position.x,
        y: init2.position.y - init2.r + offset,
      },
    },
    {
      id: '4324',
      r: init.r,
      position: init.position,
      value: 'node0',
      rightCurve: {
        childId: 1,
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
        child: 'node2',
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
    {
      id: 'wrtfyhugf',
      r: init.r,
      position: init.position,
      value: 'node0',
      rightCurve: {
        childId: 1,
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
        child: 'node2',
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
};
export { stateInit, init2, offset };
