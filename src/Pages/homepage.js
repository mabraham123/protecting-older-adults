import React,{ useState } from 'react'

import {Link} from 'react-router-dom'
import { Container, Button, Form, Card } from 'semantic-ui-react'


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

    
    const handleChange = (event) => {
        console.log(graph)
        onGraphChange(JSON.parse(graph))
        uri=uri.concat(graph)
    }

    return(
        <>
            <Container>
                <h1>Home</h1>     

                <Card>
                    <Card.Content>
                    <Card.Header>Upload Data</Card.Header>
                    <Card.Description>
                        <Form>
                            <Form.Field>
                                <label>Upload Access Interview Data</label>
                                <input type="file" onChange={(e)=> onFileSelected(e)} accept=".json"/>
                            </Form.Field>
                            <Link to={`/analysis`}> <Button primary onClick={handleChange}>Primary</Button></Link>
                        </Form>
                    </Card.Description>
                    </Card.Content>
                </Card>
            </Container>
        </>
    )
}