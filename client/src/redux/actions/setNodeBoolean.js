export const setNodeBoolean = (nodeId, key, value) => {
  return {
    type: 'SET_NODE_BOOLEAN',
    payload: { nodeId, key, value },
  };
};
