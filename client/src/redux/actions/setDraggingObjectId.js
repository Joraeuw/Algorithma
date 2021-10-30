export const setDraggingObjectId = (draggingObjectId) => {
  return {
    type: 'SET_DRAGGING_OBJECT_ID',
    payload: { draggingObjectId },
  };
};
