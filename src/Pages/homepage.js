import React,{ useState } from 'react'

import {Link} from 'react-router-dom'
import { 
    Container, 
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
            <Container text textAlign='justified'>
                <h2>This project was created to improve the resilience of older-adults towards cyber-security attacks</h2>
                <p>
                This is accomplished by analysing their account’s structure, to find account security weaknesses and vulnerabilities in order to communicate personalised yet appropriate protections and information to empower older adults to be more secure online.
                </p>
                <p>Creating an environment that supports older adults to defend and more importantly, provide independence to protect themselves from cyber-attacks compromising their account security. </p>
            
                <h2>What exactly are you analysing?</h2>
                <p>
                Earlier in this project an Account Access Interview was taken place to capture the accounts and connections between each
                other and real-life physical items, this was then collated to form of the older adults personal account ecosystem.
                </p>

                <h2>How does this analysis take place?</h2>
                <p>
                The account structure data is passed through several tests in order to find security vulnerabilities and when best practices are not being followed.
                After the tests the older adult’s ecosystem is then given a security Grade (A+, A, B+, B, C, D and F).  
                </p>
                <Link to='/grades'>Learn more about how the grades are calculated here.</Link>

                <h3>Objectives of the Security Analysis:</h3>
                <ol>
                    <li>Identify reused passwords and which accounts are at risk</li>
                    <li>Detect how many of the accounts are configured to use Multi-Factor Authentication automatically</li>
                    <li>If a Password Manager (digital or non-digital) is being used</li>
                    <li>Identify Weak and Average strength passwords with the account at risk</li>
                    <li>Check which devices are configured to use proper authentication methods</li>
                </ol>



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