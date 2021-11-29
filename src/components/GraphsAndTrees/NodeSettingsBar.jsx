import store from '@redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';
import { setTargetNodeId } from '@/redux/actions/setTargetNodeId';
import { setRootNodeId } from '@/redux/actions/setRootNode';

const NodeSideBar = ({ isOpen, setOpen }) => {
  const nodeId = useSelector((state) => state.panelState.lastNodeId);
  const dispatch = useDispatch();

  const node = store.getState().panelState.nodes[nodeId];

  const [nodeValue, setNodeValue] = useState(node.value);

  const handleCloseSidebar = () => setOpen(!isOpen);
  const handleSetRoot = () => {
    dispatch(setRootNodeId(nodeId));
  };
  const handleSetTarget = () => {
    dispatch(setTargetNodeId(nodeId));
  };

  const rewriteNode = (e) => {
    e.preventDefault();

    console.log(e);
  };

  return (
    <div
      className={`${
        isOpen ? '' : 'closed-sidebar-container '
      }sidebar-container`}
    >
      <div onClick={handleCloseSidebar} className="close-open-sidebar">
        {isOpen ? (
          <IoChevronForwardOutline className="self-center w-9 h-9" />
        ) : (
          <IoChevronBackOutline className="self-center w-9 h-9" />
        )}
      </div>
      <div
        className={`${
          isOpen ? 'is-open' : 'is-closed'
        } flex flex-col align-middle w-full justify-self-center`}
      >
        <span className="flex my-8 text-4xl justify-center">{node.value}</span>
        <div className="options-container">
          <form
            className="flex flex-col flex-wrap align-middle justify-middle mx-5 my-10"
            onSubmit={rewriteNode}
          >
            <label className="block">
              <span className="mr-2">Value:</span>
              <input className="text-black" type="text" value={node.value} />
            </label>
            <input
              className="node-settings-button"
              type="button"
              value="set root"
              onClick={handleSetRoot}
            />
            <input
              className="node-settings-button"
              type="button"
              value="set target"
              onClick={handleSetTarget}
            />
            <input
              className="node-settings-button"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NodeSideBar;
