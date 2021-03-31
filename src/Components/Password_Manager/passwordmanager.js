import React from 'react'
import {Card} from 'semantic-ui-react'

const header = ({present}) =>{
    
    if (present){

        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Uses of Password Manager</h1></Card.Header>
                <Card.Meta>
                    <h5>Good job!</h5>
                </Card.Meta>
                <Card.Description>
                    <p>Good job for using password managers</p>
                    </Card.Description>
            </Card.Content>
            </Card>
        )
    }else{
        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Best Practice Issue</h1></Card.Header>
                <Card.Meta>
                    <h5>No Password Manager</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Recommendation(s)</h3>
                    <p>Use a password manager</p>
                </Card.Description>
            </Card.Content>
            </Card>
        )
    }
}


export default header