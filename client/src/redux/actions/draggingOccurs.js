export const draggingOccurs = (isDragging) => {
  return {
    type: 'DRAGGING_OCCURS',
    payload: { isDragging },
  };
};
