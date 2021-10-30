export const addNewNode = (newNode) => {
  return {
    type: 'ADD_NEW_NODE',
    payload: { newNode },
  };
};
