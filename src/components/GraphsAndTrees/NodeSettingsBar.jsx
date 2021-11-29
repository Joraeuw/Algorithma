import store from '@redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';
import { setTargetNodeId } from '@/redux/actions/setTargetNodeId';
import { setRootNodeId } from '@/redux/actions/setRootNode';
import { setNodeValue as NodeValueSetter } from '@/redux/actions/setNodeValue';

const NodeSideBar = ({ isOpen, setOpen, path }) => {
  const nodeId = useSelector((state) => state.panelState.lastNodeId);
  const dispatch = useDispatch();

  const node = store.getState().panelState.nodes[nodeId];

  const [nodeValue, setNodeValue] = useState(node.value);

  const handleSettingNodeValue = (e) => setNodeValue(e.target.value);
  const handleCloseSidebar = () => setOpen(!isOpen);
  const handleSetRoot = () => {
    dispatch(setRootNodeId(nodeId));
    setNodeValue(node.value);
  };
  const handleSetTarget = () => {
    dispatch(setTargetNodeId(nodeId));
    setNodeValue(node.value);
  };

  const rewriteNode = (e) => {
    e.preventDefault();
    const data = { newValue: e.target[0].value, nodeId: nodeId };
    console.log(data);
    dispatch(NodeValueSetter(data));
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
              <input
                className="text-black"
                type="text"
                onChange={handleSettingNodeValue}
                value={nodeValue}
              />
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
          <textarea
            readOnly
            className="text-black"
            name="area"
            id="area"
            cols="30"
            rows="10"
            value={path}
          />
        </div>
      </div>
    </div>
  );
};

export default NodeSideBar;
