import React from 'react'
import {Header,Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const header = () =>{
    return(
        <Container>
            <Link to='/'><Header
            as='h3'
            content='Protecting Older Adults Online'
            floated='left'
            inverted
            color='blue'
            className='link'
            /></Link>
        </Container>
    )
}


export default header