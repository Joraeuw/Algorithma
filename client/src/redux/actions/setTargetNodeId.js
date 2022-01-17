export const setTargetNodeId = (nodeId, key = null, value = null) => {
  return {
    type: 'SET_TARGET_NODE_ID',
    payload: { nodeId, key, value },
  };
};
