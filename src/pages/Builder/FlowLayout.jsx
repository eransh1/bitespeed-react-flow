import React,{useCallback, useEffect, useState} from 'react'
import ReactFlow, {
    Controls,
    Background,
    // useNodesState,
    // useEdgesState,
    addEdge,
    ReactFlowProvider,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';
  import CustomNode from './Custom Node/CustomNode.jsx'; 
  import 'reactflow/dist/style.css';
import OptionSelectionBar from './Option Selection Bar/OptionSelectionBar';
import { getId, returnInfoForNode,getNumberOfNodesAvailableForParticularNodeType } from './functions.jsx';
import { useFlowContext } from '../context/FlowSetupContext.jsx';
import CustomButtonEdge from './Custom Button Edge/CustomButtonEdge.jsx';
   
const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    buttonedge: CustomButtonEdge,
};


const FlowLayout = () => {
    const {nodes, setNodes,edges, setEdges,setSelectedNodes,optionCountForId,setOptionCountForId} = useFlowContext();

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
   
   
useEffect(()=>{
  const initialNodes=localStorage.getItem('biteSpeedInitialNodes')
  if(initialNodes){
    setNodes(JSON.parse(initialNodes))
    setOptionCountForId(prev=>({...prev,message:getNumberOfNodesAvailableForParticularNodeType(JSON.parse(initialNodes),'message')}))
  }
  else{
    setNodes([{id: '1',type: 'input',data: {label: 'Start',}, position: {x:-507, y: -249}}])
  }
  const initialEdges=localStorage.getItem('biteSpeedInitialEdges')
  if(initialEdges){
    setEdges(JSON.parse(initialEdges))  
  }
  else{
    setEdges([])
  }

//eslint-disable-next-line
},[])

const onNodesChange = useCallback(
    (changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    },[setNodes]
    )
    
const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

 const onConnect = useCallback(
      (params) => {
    
        const newEdge = {
            ...params,
            type: "buttonedge",
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "black",
            },
        }
        setEdges((eds) => addEdge(newEdge, eds))
    },

      [setEdges],
    );

  // handle nodes position changes here
  let timeoutId = null;

  const onNodeDragStart = (event, node) => {
      return
  }
  const onNodeDragStop = (event, node) => {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
     
      timeoutId = setTimeout(() => {
          // console.log("nodeDraging Node", node);
          // console.log("nodeDraging Event", event);
          //make api call here
      }, 500);
  };
  
  //On Node click
  const onNodeClick = (event, node) => {
    // console.log("nodeClick Node", node);
    // console.log("nodeClick Event", event);
    setSelectedNodes(node)
  };


  //DND
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}, []);

  const onDrop = useCallback(
    async (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow")

        // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

    let count=optionCountForId[type]

    setOptionCountForId((prev)=>({...prev,[type]:count+1}))
      const newNode = {
        id: getId(type,count),
        type:'custom',
        position,
        data: returnInfoForNode(type,count),
      };

      setNodes((nds) => nds.concat(newNode));

  //eslint-disable-next-line  
    },[reactFlowInstance,optionCountForId]
  )
  return (
   <>
     <ReactFlowProvider>
     <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeDragStop={onNodeDragStop}
        onNodeDragStart={onNodeDragStart}
        onInit={setReactFlowInstance}
        fitView
        fitViewOptions={{ minZoom: 0.7, maxZoom: 1 }}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onDragOver={onDragOver}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    <OptionSelectionBar/>
      </ReactFlowProvider>
   </>
  )
}

export default FlowLayout