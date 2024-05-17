import { createContext, useContext, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";

const FlowContext = createContext();
const FlowProvider = ({ children }) => {
    const[selectedNodes,setSelectedNodes]=useState(null)
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const[optionCountForId,setOptionCountForId]=useState({
        message:1
    })
    return (
        <FlowContext.Provider
        value={{selectedNodes,setSelectedNodes,
                nodes,setNodes,
                edges,setEdges,
                optionCountForId,setOptionCountForId,
                
                
            }}
        >
        {children}
        </FlowContext.Provider>
    );
}

const useFlowContext = () => {
    return useContext(FlowContext);
};

export { useFlowContext, FlowProvider };