export const setNodeValue = (data) => {
  return {
    type: 'SET_NODE_VALUE',
    payload: { ...data },
  };
};
