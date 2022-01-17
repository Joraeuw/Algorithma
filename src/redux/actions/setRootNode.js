export const setRootNodeId = (nodeId, key = null, value = null) => {
  return {
    type: 'SET_ROOT_NODE_ID',
    payload: { nodeId, key, value },
  };
};
