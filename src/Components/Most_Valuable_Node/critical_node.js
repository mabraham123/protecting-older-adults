import React from 'react'
import {Card} from 'semantic-ui-react'

const most_critical_node = ({name,solution}) =>{
    
    return(
        <Card>
            <Card.Content>
                <Card.Header><h1>Security Advice</h1></Card.Header>
                <Card.Meta>
                    <h5>Most Critical part of Ecosystem</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Most Imporant- {name}</h3>
                    <p>You need to be very careful when it comes to {name} as it is the most imporant part fo your whole personal account ecosystem.</p>   
                    <h3>Recommendation(s)</h3>
                    {solution}
                </Card.Description>
            </Card.Content>
         </Card>
    )
}


export default most_critical_node