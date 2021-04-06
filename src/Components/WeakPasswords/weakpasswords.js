import React from 'react'
import {Card} from 'semantic-ui-react'
import NewPassword from '../NewPassword/newpassword'

const header = ({name,solution,password,affected}) =>{
    
    const render_accounts_at_risk_line =() =>{
        if(affected.length===1){
            return <h3 className="red">{affected.length} account is at risk:</h3>
        }else{
            return <h3 className="red">{affected.length} accounts are at risk:</h3>
        }
    }
    
    const render_at__accounts_at_risk = (linked) =>{
        var namesList = linked.map(function(link){
            return <li key={link}>{link}</li>;
          })

        return <ol>{ namesList }</ol>
      
    }


    return(
        <Card>
            <Card.Content>
                <Card.Header><h1>Weak Password Strength</h1></Card.Header>
                <Card.Meta>
                    <h5>Critical Issue</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Weak Password: {name}</h3>
                    <p>You use the password <b>'{name}'</b> to access more than one account. If a hacker steals <b>'{name}'</b> then you have compramised every account where that password is used.</p>
                    {render_accounts_at_risk_line()}
                    {render_at__accounts_at_risk(affected)}  
                    <h3>Recommendation(s)</h3>
                    <p>{solution}</p>
                    <NewPassword password={password}/>                    
                </Card.Description>
            </Card.Content>
        </Card>
    )
}


export default header