import React from 'react'
import {Card} from 'semantic-ui-react'

const mfa = ({accounts,solution,MFA}) =>{
    
    const render_at__accounts_at_risk = () =>{

        var namesList = accounts.map(function(account){
            return <li key={account}>{account}</li>;
          })

        return <ol>{ namesList }</ol>
      
    }
    
    if(MFA){
        //Render the Multi Factor Authentication Accounts here
        return(
            <Card>
                <Card.Content>
                    <Card.Header><h1>Multi-Factor Authentication in Use</h1></Card.Header>
                    <Card.Meta>
                    <h5>Good job!</h5>
                    </Card.Meta>
                    <Card.Description>
                        <h3>Mutli-Factor Authentication</h3>
                        <p>Multi-factor authentication is an electronic authentication method in which a device user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism: knowledge, possession, and inherence.</p>
                        
                        <h3 className="green">{accounts.length} account(s) at protected:</h3>
                        {render_at__accounts_at_risk()}   
                    </Card.Description>
                </Card.Content>
             </Card>
        )
    }else{
        //Render the Non Multi Factor Authentication Accounts here
        return(
            <Card>
                <Card.Content>
                    <Card.Header><h1>Not Using Multi-Factor Authentication</h1></Card.Header>
                    <Card.Meta>
                        <h5>Best Practice Issue</h5>
                    </Card.Meta>
                    <Card.Description>
                        <h3>Multi-Factor Authentication</h3>
                        <p>Multi-factor authentication is an electronic authentication method in which a device user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism: knowledge, possession, and inherence.</p>
                        <h3 className="red">{accounts.length} account(s) at risk:</h3>
                        {render_at__accounts_at_risk()}   
                        <h3>Recommendation(s)</h3>
                        {solution}
                    </Card.Description>
                </Card.Content>
             </Card>
        )
    }
}


export default mfa