import React from 'react'
import {Card} from 'semantic-ui-react'
import NewPassword from '../NewPassword/newpassword'

const header = ({name,solution, password, affected}) =>{
    
    const render_accounts_at_risk_line =() =>{
        if(affected.length===1){
            return <h3 className="amber">{affected.length} account is potentially vulnerable:</h3>
        }else{
            return <h3 className="amber">{affected.length} accounts are potentially vulnerable:</h3>
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
                <Card.Header><h1>Potential Password Strength Issue</h1></Card.Header>
                <Card.Meta>
                    <h5>Secuirty Advice</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>{name}</h3>
                    <p>If your password is short consider changing this password for a more secure one. Longer the password more secure it is (at least 12 character). If you are writing your passwords down somewhere, it might as well be a strong password.</p>
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