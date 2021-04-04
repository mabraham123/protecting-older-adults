import React,{ useState } from 'react'

import {Link} from 'react-router-dom'
import { Container, 
    Button, 
    Form, 
    Icon,
    Segment
} from 'semantic-ui-react'

import Title from '../Components/Header/title'
import Footer from '../Components/Footer/footer'




export const Homepage = ({ onGraphChange, onDataReached }) => {
   const [graph, setGraph] = useState('')

    
    const isFileJson = (file) => {
        // Check if the file is an image.
        if (file.type && file.type.indexOf('json') === -1) {
            console.log('File is not json.', file.type, file);
            return false;
        }
        return true;
    }
      
    
    
    function onFileSelected(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        if (isFileJson(file)){
            reader.onload = (event) => {
                setGraph(event.target.result);
                alert('File uplaoded successfully');
            }
            reader.readAsText(file);
        }else{
            alert('Error: The correct file was not uploaded');
        }
    }

    const renderBody = () => {
        return (
        <Segment vertical>
            <div className='segment'>
        <Container text>
            <h2>Remember to add text here
            </h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Container>
        </div>
        </Segment>
        )
    }

    const renderHeroHeader = () => {
        return(
        <Segment
        inverted
        textAlign='center'
        className='header'
        vertical
        >
            <Title/>
            <Container text>
                <h1 className='headerContent'>Find Vulnerabilities in your Personal Account Ecosystem</h1>
                
                <Form inverted className='headerForm'>
                    <Form.Field>
                        <label for="load_aag">Upload account access interview data</label>
                        <input id="load_aag" name="load_aag" type="file" onChange={(e)=> onFileSelected(e)} accept=".json"/>
                    </Form.Field>
                    <Link to={`/analysis`}> <Button primary size='massive' onClick={handleChange}>Get Started <Icon name='right arrow' /></Button></Link>
                </Form>
            </Container>
        </Segment>
        )
    }
    
    const handleChange = (event) => {
        console.log(graph)
        onGraphChange(JSON.parse(graph))
        onDataReached(true)
    }

    return(
        <>
        {renderHeroHeader()}
        {renderBody()}
        <Footer/>
        </>
    )
}