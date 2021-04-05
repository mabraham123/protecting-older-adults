import React from 'react'
import {Container,Menu,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const header = ({passgen}) =>{

  const active_password_generator_page_render= ()=>{
    if(passgen){
      return <Link to='/tools'><Button primary>Password Generator</Button></Link>
    }else{
      return <Link to='/tools'><Button secondary>Password Generator</Button></Link>
    }
  }

    return(
        <Container>
        <Menu text color='blue' size='mini'>
        <Link to='/'>
        <Menu.Item
          name='Protecting Older Adults Online'
          active
          className='link'
        /> 
        </Link>
        
        <Menu.Menu position='right'>
        {active_password_generator_page_render()}
        </Menu.Menu>


      </Menu>
      </Container>
    )
}


export default header