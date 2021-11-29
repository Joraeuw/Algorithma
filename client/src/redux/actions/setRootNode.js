export const setRootNodeId = (nodeId) => {
  return {
    type: 'SET_ROOT_NODE_ID',
    payload: { nodeId },
  };
};
