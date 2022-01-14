export const setNodeColor = (nodeId, className) => {
  return {
    type: 'SET_NODE_COLOR',
    payload: { nodeId, className },
  };
};
