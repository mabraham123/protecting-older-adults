import React from 'react';
import ReactFlow, {Background} from 'react-flow-renderer';


export const Test = () => {
    
    const elements = [
      { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      // you can also pass a React component as a label
      { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
      { id: 'e1-2', source: '1', target: '2', arrowHeadType: 'arrowclosed' }
    ]


    return(
        <>
        <div>
            <h1>Hi</h1>
            <ReactFlow elements={elements} 
            style={{
                width:"500px",
                height:'500px',
            }}
            />
        </div>
        </>
    )
}
