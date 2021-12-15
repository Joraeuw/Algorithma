import { getStartPoint } from '@/staticFunctions';
import { scale } from '@/settings/screen';

const initR = 50;
const offset = 0;
const init = { id: 0, r: 50 * scale, position: { x: 100, y: 100 } };
const startInitR = getStartPoint(init.position, init.r, -45);
const startInitL = getStartPoint(init.position, init.r, 225);

const init2 = { id: 1, r: 50 * scale, position: { x: 300, y: 300 } };
const startInitR2 = getStartPoint(init2.position, init2.r, -45);
const startInitL2 = getStartPoint(init2.position, init2.r, 225);
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
    {
      id: 'node1',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node1',
      rightCurve: {
        childId: null,
        baseId: 'node1',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node1',
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
      id: 'node2',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node2',
      rightCurve: {
        childId: null,
        baseId: 'node2',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node2',
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
      id: 'node3',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node3',
      rightCurve: {
        childId: null,
        baseId: 'node3',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node3',
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
      id: 'node4',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node4',
      rightCurve: {
        childId: null,
        baseId: 'node4',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node4',
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
      id: 'node5',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node5',
      rightCurve: {
        childId: null,
        baseId: 'node5',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node5',
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
      id: 'node6',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node6',
      rightCurve: {
        childId: null,
        baseId: 'node6',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node6',
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
      id: 'node7',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node7',
      rightCurve: {
        childId: null,
        baseId: 'node7',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node7',
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
      id: 'node8',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node8',
      rightCurve: {
        childId: null,
        baseId: 'node8',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node8',
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
      id: 'node9',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node9',
      rightCurve: {
        childId: null,
        baseId: 'node9',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node9',
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
      id: 'node10',
      parentNodeId: null,
      r: init2.r,
      position: { x: 300, y: 300 },
      value: 'node10',
      rightCurve: {
        childId: null,
        baseId: 'node10',
        isConnected: false,
        startPoint: startInitR2,
        controlPoint1: startInitR2,
        controlPoint2: startInitR2,
        endPoint: { x: startInitR2.x + 1, y: startInitR2.y + 1 },
      },
      leftCurve: {
        childId: null,
        baseId: 'node10',
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
  ],
  draggingObjectId: null,
};
stateInit = {
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
