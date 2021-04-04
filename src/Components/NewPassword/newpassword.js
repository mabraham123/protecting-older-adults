import React from 'react'
import {Popup,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const newpassword = ({password}) =>{
    
    return(
        <>
        <p><b>- Suggested new password</b> <Popup content='Password was randomly genereated' trigger={<Icon name='info circle' />} />: {password}</p>
        <p>(Make sure to save the password, once you leave the page it will be gone forever)</p>
        <Link to='/tools'>See more password generation options</Link>
        </>
    )
}


export default newpassword