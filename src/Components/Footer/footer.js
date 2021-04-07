import React from 'react'
import {Segment,Container} from 'semantic-ui-react'


const footer = () =>{
    return(
      <div className="footer">
        <Segment inverted
        style={{ padding: '5em 0em'}}
        textAlign='center'
        vertical>
        <Container>
        <p>Final Year Honours Project by <a href='https://mabraham123.github.io/CV/MelvinAbraham_CV.pdf' target="_blank"><u>Melvin Abraham</u></a> </p>
        </Container>
      </Segment>
      </div>
    )
}


export default footer