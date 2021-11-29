export const setTargetNodeId = (nodeId) => {
  return {
    type: 'SET_TARGET_NODE_ID',
    payload: { nodeId },
  };
};
