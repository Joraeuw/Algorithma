//TODO: Store all the curve and node styling data

let binaryNodesStyling = {
  node0: {
    id: 'node0',

    leftCurve: {
      isWithinTriplet: false,
      isVisited: false,
      className: 'default_curve',
    },
    rightCurve: {
      isWithinTriplet: false,
      isVisited: false,
      className: 'default_curve',
    },
    //styling
    isVisited: false,
    isTarget: false,
    isRoot: false,
    isWithinTriplet: false,
    className: 'default_node',
  },
};

export { binaryNodesStyling };
