import React from 'react'
import {Header,Container} from 'semantic-ui-react'

const header = () =>{
    return(
        <Container>
            <Header
            as='h3'
            content='Protecting Older Adults Online'
            floated='left'
            inverted
            color='blue'
            />
        </Container>
    )
}


export default header