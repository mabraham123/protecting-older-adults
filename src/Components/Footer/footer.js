import React from 'react'
import {Grid, List, Header,Segment,Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const footer = () =>{
    return(
        <Segment inverted
        style={{ padding: '5em 0em' }}
        textAlign='center'
        vertical>
        <Container>
        <p>Final Year Honours Project by <Link to={{ pathname: "https://mabraham123.github.io/CV/MelvinAbraham_CV.pdf" }} target="_blank"><u>Melvin Abraham</u> </Link> </p>
        </Container>
      </Segment>
    )
}


export default footer