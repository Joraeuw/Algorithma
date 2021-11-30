export const setParentConnectionArea = (draggingObjectId) => {
  return {
    type: 'SET_PARENT_CONNECTION_AREA',
    payload: { ...draggingObjectId },
  };
};
