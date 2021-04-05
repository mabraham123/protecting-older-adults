import React from 'react'
import {Card} from 'semantic-ui-react'
import{Link} from 'react-router-dom'

const header = ({name,linked,solution}) =>{
    
  
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
                    <h3>Password Reused: {name}</h3>
                            <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                            <h3 className="red">{linked.length} accounts at risk:</h3>
                            {render_at__accounts_at_risk()}   
                            <h3>Recommendation(s)</h3>
                            <p>{solution}</p>
                            <Link to='/tools'>See more password generation options</Link>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}


export default header