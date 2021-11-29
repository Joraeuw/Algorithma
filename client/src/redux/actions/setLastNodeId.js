export const setLastNodeId = (nodeId) => {
  return {
    type: 'SET_LAST_NODE_ID',
    payload: { nodeId },
  };
};
