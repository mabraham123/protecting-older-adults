import React from 'react'
import {Card} from 'semantic-ui-react'

const header = ({present}) =>{
    
    if (present){

        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Uses of Password Manager</h1></Card.Header>
                <Card.Meta>
                    <h5>Good job!</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Password Managers</h3>
                    <p>We spotted that you are using a password manager, this means you are safer online than if you weren’t using one at all.</p>
                    <h3>Tips</h3>
                    <p>If you are using a non-digital password manager such as a notebook or diary then you could maybe consider looking into digital password managers. A digital password manager is something you can pay for which helps create complex passwords and store them in an encrypted password vault.</p>
                    </Card.Description>
            </Card.Content>
            </Card>
        )
    }else{
        return(
            <Card>
            <Card.Content>
                <Card.Header><h1>Not Using a Password Manager</h1></Card.Header>
                <Card.Meta>
                    <h5>Best Practice Issue</h5>
                </Card.Meta>
                <Card.Description>
                    <h3>Password Managers</h3>
                    <p>A password manager is something that helps manage your passwords for your accounts this can be both digital or non-digital. A non-digital password manager can be something as simple as a notebook where you store your passwords. A digital password manager is something you can pay for which helps create complex passwords and store them in an encrypted password vault.</p> 
                    <h3>Recommendation(s)</h3>
                    <p>Look into using a password manager as this is a good way of having secure complex passwords for your accounts which you won’t have to memories.</p>
                </Card.Description>
            </Card.Content>
            </Card>
        )
    }
}


export default header