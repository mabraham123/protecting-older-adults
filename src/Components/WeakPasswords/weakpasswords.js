import React from 'react'
import {Card} from 'semantic-ui-react'

const header = ({name,solution}) =>{
    
    return(
        <Card>
            <Card.Content>
                <Card.Header><h1>Critical Issue</h1></Card.Header>
                <Card.Meta>
                    <h5>Weak Password Strength</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Weak Password: {name}</h3>
                    <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                    <h3>Recommendation(s)</h3>
                    {solution}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}


export default header