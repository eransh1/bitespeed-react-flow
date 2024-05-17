import React from 'react'
import styles from "./OptionSelectionBar.module.css"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import EditContainer from '../Edit Container/EditContainer';
import { useFlowContext } from '../../context/FlowSetupContext';

const OptionSelectionBar = () => {
    const {selectedNodes} = useFlowContext();

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

  return (
   <>
    <aside className={styles.outerCont}>
    {selectedNodes?
    <><EditContainer/></>
    :
    <div className={styles.innerCont}>
    <div className={styles.messageOptionCont} onDragStart={(event) => onDragStart(event, 'message')} draggable>
        <IoChatbubbleEllipsesOutline/>
        <p>Message</p>
    </div>
    </div>
    }
    </aside>
   </>
  )
}

export default OptionSelectionBar