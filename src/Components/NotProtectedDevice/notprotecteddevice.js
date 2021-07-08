import React from 'react'
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const header = ({name, secure, affected}) =>{
    
    const affect_accounts_render =()=>{

        if(affected.length>0){
            return(
                <>
                <h3 className="red">{affected.length} account(s) at risk:</h3>
                {render_at__accounts_at_risk(affected)}
                </>
            )
        }
    }

    const render_at__accounts_at_risk = (linked) =>{

        var namesList = linked.map(function(link){
            return <li key={link}>{link}</li>;
          })

        return<ol>{ namesList }</ol>
      
    }

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
                    <p>This specific device can be used by anyone that can access it, as there are no protections in place, such as a passcode or Biometric Authentication (E.g. Thumb print, FaceID). </p>
                    {affect_accounts_render()}
                    <h3>Recommendation(s)</h3>
                    <p>Make it difficult for someone else who isn’t you to access anything if they have your device. For example, add a layer of security such as a password or make sure you are not logged in anywhere on this device.</p>
                    <Link to='/tools'>See more password/pincode generation options</Link>
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
                    <p>You have a layer of security to protect this device as there is no way to access the device without proper authentication. This means it would be a bit harder for an attacker to get into your device if it was stolen.</p>
                </Card.Description>
            </Card.Content>
        </Card>
        )
    }

}


export default header
