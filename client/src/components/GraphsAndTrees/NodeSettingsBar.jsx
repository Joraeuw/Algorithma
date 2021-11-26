import { setDraggingObjectId } from '@/redux/actions/setDraggingObjectId';
import store from '@redux/store';
import { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

const NodeSideBar = ({ isOpen, setOpen, nodeId }) => {
  //const state = store.getState().panelState.nodes[nodeId];
  const handleCloseSidebar = () => setOpen(!isOpen);

  return (
    <div
      className={`${
        isOpen ? null : 'closed-sidebar-container'
      } sidebar-container`}
    >
      <div onClick={handleCloseSidebar} className="close-open-sidebar">
        <IoChevronForwardOutline className="self-center w-9 h-9" />
      </div>
      <div
        className={`${
          isOpen ? 'is-open' : 'is-closed'
        } flex flex-col align-middle w-full justify-self-center`}
      >
        <span className="flex my-8 text-4xl justify-center">Fetch Node Id</span>
        <span className="flex my-8 text-4xl justify-center">Fetch Node Id</span>
        <span className="flex my-8 text-4xl justify-center">Fetch Node Id</span>
        <div className="options-container">
          {/* <form onSubmit={rewriteNode}></form> */}
        </div>
      </div>
    </div>
  );
};

export default NodeSideBar;
