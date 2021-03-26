import React,{ useState } from 'react'

import {Link} from 'react-router-dom'
import { Container, 
    Button, 
    Form, 
    Header,
    Icon,
    Segment,
    Grid,
    Image
} from 'semantic-ui-react'





export const Homepage = ({ onGraphChange }) => {
   const [graph, setGraph] = useState('')
   var uri="graph="

    
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
        <Segment style={{padding: '5em 0em'}} vertical>
        <Container text>
            <h2>
            Breaking The Grid, Grabs Your Attention
            </h2>
            <p>
            Instead of focusing on content creation and hard work, we have learned how to master the
            art of doing nothing by providing massive amounts of whitespace and generic content that
            can seem massive, monolithic and worth your attention.
            </p>
        </Container>
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
            <Container>
                <Header
                as='h3'
                content='Protecting Older Adults Online'
                floated='left'
                inverted
                color='blue'
                />
            </Container>
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
        uri=uri.concat(graph)
    }

    return(
        <>
        {renderHeroHeader()}
        {renderBody()}
        </>
    )
}