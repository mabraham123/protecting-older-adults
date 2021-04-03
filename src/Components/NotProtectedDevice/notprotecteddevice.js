import React from 'react'
import {Card} from 'semantic-ui-react'

const header = ({name, secure}) =>{
    
    if(!secure){
        //Display the non password protect accounts
        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Unprotected Device</h1></Card.Header>
                <Card.Meta>
                    <h5>Critical Issue</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>{name}</h3>
                    <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                    <h3>Recommendation(s)</h3>
                    <p>Put passwords on your devices</p>
                </Card.Description>
            </Card.Content>
        </Card>
        )
    }else{
        //Display the password protect accounts
        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Device is Protected</h1></Card.Header>
                <Card.Meta>
                    <h5>Good job!</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>{name}</h3>
                    <p>Your device is secure as there is no way to access the device without proper authentication</p>
                </Card.Description>
            </Card.Content>
        </Card>
        )
    }

}


export default header