import { setNodeValue as NodeValueSetter } from '@/redux/actions/setNodeValue';
import { setOverallState } from '@/redux/actions/setOverallState';
import { setRootNodeId } from '@/redux/actions/setRootNode';
import { setTargetNodeId } from '@/redux/actions/setTargetNodeId';
import Button from '@material-tailwind/react/Button';
import {
  default as Input,
  default as Textarea,
} from '@material-tailwind/react/Input';
import store from '@redux/store';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const NodeSideBar = ({ isOpen, setOpen, path }) => {
  const nodeId = useSelector((state) => state.panelState.lastNodeId);
  //Change the status of last selected node when watching the action

  const dispatch = useDispatch();

  const node = useSelector((state) => state.panelState.nodes)[nodeId];

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
    const dataBox = document.getElementById('nodeInputValueBox');
    const data = { newValue: dataBox.value, nodeId: nodeId };
    console.log(data);
    dispatch(NodeValueSetter(data));
  };
  const handleRemoveNode = () => {
    let state = { ...store.getState().panelState };
    delete state.nodes[nodeId];
    store.dispatch(setOverallState(state));
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
        <div className="options-container flex flex-col justify-center">
          <Input
            id="nodeInputValueBox"
            className="node-settings-button"
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Input"
            onChange={handleSettingNodeValue}
            value={nodeValue}
          />

          <Button
            className="node-settings-button"
            color="blueGray"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleSetRoot}
          >
            set root
          </Button>
          <Button
            className="node-settings-button"
            color="blueGray"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleSetTarget}
          >
            set target
          </Button>
          <Button
            className="node-settings-button"
            color="blueGray"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleRemoveNode}
          >
            remove node
          </Button>
          <Button
            className="node-settings-button"
            color="blueGray"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={rewriteNode}
          >
            set node value
          </Button>
          {/* <Textarea
            readOnly
            color="lightBlue"
            size="xl"
            outline={true}
            className="text-white h-80"
            name="area"
            id="area"
            cols="30"
            rows="10"
            value={path}
            placeholder="Path"
          /> */}
          <textarea
            className="text-black"
            readOnly
            defaultValue={path}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NodeSideBar;
