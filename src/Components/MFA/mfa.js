import React from 'react'
import {Card, List} from 'semantic-ui-react'

const mfa = ({accounts,solution}) =>{
    
    const render_at__accounts_at_risk = () =>{

        var namesList = accounts.map(function(account){
            return <li key={account}>{account}</li>;
          })

        return <ol>{ namesList }</ol>
      
    }
    
    return(
        <Card>
            <Card.Content>
                <Card.Header><h1>Security Issue</h1></Card.Header>
                <Card.Meta>
                    <h5>Not Best Practice</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Lack of Multi-Factor Authentication</h3>
                    <p>Multi-factor authentication is an electronic authentication method in which a device user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism: knowledge, possession, and inherence.</p>
                    <h3 className="red">{accounts.length} accounts at risk:</h3>
                    {render_at__accounts_at_risk()}   
                    <h3>Recommendation(s)</h3>
                    {solution}
                </Card.Description>
            </Card.Content>
         </Card>
    )
}


export default mfa