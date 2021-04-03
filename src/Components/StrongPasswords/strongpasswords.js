import React from 'react'
import {Card} from 'semantic-ui-react'

const StrongPasswords = ({linked}) =>{
    const render_at_strong_passwords = () =>{
        var namesList = linked.map(function(link){
            return <li key={link}>{link}</li>;
          })

        return <ol>{ namesList }</ol>
    }

    return(
        <Card>
        <Card.Content>
            <Card.Header><h1>Strong Passwords</h1></Card.Header>
            <Card.Meta>
                <h5>Good job!</h5>
            </Card.Meta>
            <Card.Description>
                <h1>The following password(s) are very secure:</h1>
                    {render_at_strong_passwords()}   
                </Card.Description>
        </Card.Content>
        </Card>
    )
}


export default StrongPasswords
