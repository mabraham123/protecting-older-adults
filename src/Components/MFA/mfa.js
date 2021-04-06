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
                        <p>These accounts use Multi-Factor Authentication (MFA), this is when you need more than just a password to access an account. If a hacker cracks your password then you have layer of security to stop them getting into your account. Multi-Factor usually means at least 2 (sometimes referred to as two factor authentication) or more of these three categories: ‘Something you know’ (a password), ‘Something you have’ (a phone or book etc.) and ‘Something you are’ (Thumbprint, Face Authentication etc.). </p>
                        
                        <h3 className="green">{accounts.length} account(s) at protected:</h3>
                        {render_at__accounts_at_risk()}   
                        
                        <h3>Tips: </h3>
                        <p>Have a look at other multi-factor methods such as Authenticator Apps</p>
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
                        <p>These accounts doesn’t use Multi-Factor Authentication (MFA), this is when you need more than just a password to access an account. If a hacker cracks your password then there is another layer of security to stop them getting into your account. Multi-Factor usually means at least 2 or more of these three categories: ‘Something you know’ (a password), ‘Something you have’ (a phone or book etc.) and ‘Something you are’ (Thumbprint, Face Authentication etc.). </p>
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