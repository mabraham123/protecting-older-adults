import React from 'react'
import {Card,Grid} from 'semantic-ui-react'
import ReactFlow from 'react-flow-renderer';
const header = ({name,linked,solution}) =>{
    
    // const elements = [
    //     { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 5 } },
    //     // you can also pass a React component as a label
    //     { id: '2', data: { label: <div>Node 2</div> }, position: { x: 200, y: 200 } },
    //     { id: '3', data: { label: <div>Node 3</div> }, position: { x: 50, y: 200 } },
    //     { id: 'e2-1', source: '2', target: '1', arrowHeadType: 'arrowclosed' },
    //     { id: 'e2-1', source: '3', target: '1', arrowHeadType: 'arrowclosed' }
    //   ]
  

    const render_at__accounts_at_risk = () =>{

        var namesList = linked.map(function(link){
            return <li key={link}>{link}</li>;
          })

        return <ol>{ namesList }</ol>
      
    }
    
    return(
        <Card>
            <Card.Content>
                <Card.Header><h1>Password Reused</h1></Card.Header>
                <Card.Meta>
                    <h5>Critical Issue</h5>
                </Card.Meta>
                <Card.Description>
                    {/* <Grid>
                    <Grid.Column width={5}>
                        <ReactFlow elements={elements} 
                            style={{
                                width:"100%"
                            }}
                            nodesConnectable={false}
                            nodesDraggable={false}
                            zoomOnScroll={false}
                            panOnScroll={false}
                            panOnScrollMode={false}
                            zoomOnDoubleClick={false}
                            paneMoveable={false}
                            />
                    </Grid.Column>
                    <Grid.Column width={10}>

                            <h3>Password Reused: {name}</h3>
                            <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                            <h3 className="red">{linked.length} accounts at risk:</h3>
                            {render_at__accounts_at_risk()}   
                            <h3>Recommendation(s)</h3>
                            {solution}
                    </Grid.Column>
                    </Grid> */}

                    <h3>Password Reused: {name}</h3>
                            <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                            <h3 className="red">{linked.length} accounts at risk:</h3>
                            {render_at__accounts_at_risk()}   
                            <h3>Recommendation(s)</h3>
                            {solution}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}


export default header