//TODO: Store all the curve and node styling data

let binaryNodesStyling = {
  target: 'node0',
  root: 'node0',
  node0: {
    id: 'node0',

    leftCurve: {
      isWithinTriplet: false,
      isInPath: false,
      isVisited: false,
      stroke: 'rgb(213, 0, 249)',
    },
    rightCurve: {
      isWithinTriplet: false,
      isVisited: false,
      isInPath: false,
      stroke: 'rgb(213, 0, 249)',
    },
    //styling
    isVisited: false,
    isTarget: true,
    isRoot: true,
    isWithinTriplet: false,
    isInPath: false,

    className: 'default_node',
    stroke: 'green',
  },
};

export { binaryNodesStyling };

/*
classes:
  default_node
  visited_node
  triplet_node
  target
  root

*/
