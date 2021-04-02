import React from 'react'
import {Card} from 'semantic-ui-react'

const header = () =>{

        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>No Reused Passwords</h1></Card.Header>
                <Card.Meta>
                    <h5>Good job!</h5>
                </Card.Meta>
                <Card.Description>
                    <p>Every password you use is unique.</p>
                    </Card.Description>
            </Card.Content>
            </Card>
        )
}


export default header