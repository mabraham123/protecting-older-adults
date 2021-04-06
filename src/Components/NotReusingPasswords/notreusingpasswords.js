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
                    <p>You are using a different password for all of your accounts.  This protects you as if one account is compromised the rest of your accounts are safe as they are not linked by passwords.</p>
                    </Card.Description>
            </Card.Content>
            </Card>
        )
}


export default header