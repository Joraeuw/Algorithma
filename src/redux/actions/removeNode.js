export const removeNode = (nodeId) => {
  return {
    type: 'REMOVE_NODE',
    payload: { nodeId },
  };
};
