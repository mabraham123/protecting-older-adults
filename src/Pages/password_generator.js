import React,{ useState, useEffect } from 'react'

import {Link} from 'react-router-dom'
import { Container, 
    Button, 
    Divider,
    Grid,
    Checkbox,
    Segment,
    Input
} from 'semantic-ui-react'

import Title from '../Components/Header/title'
import Footer from '../Components/Footer/footer'


export const PasswordGenerator = () => {

    const [password, setPassword] = useState('')
    const [uppercase, setUppercase] = useState(true)
    const toggleUppercase = () => setUppercase(value => !value);
    const [lowercase, setLowercase] = useState(true)
    const toggleLowercase = () => setLowercase(value => !value);
    const [numbers, setNumbers] = useState(true)
    const toggleNumbers = () => setNumbers(value => !value);
    const [symbols, setSymbols] = useState(true)
    const toggleSymbols = () => setSymbols(value => !value);
    const [length, setLength] = useState(12)
    const addLength = () => setLength(value => value+1);
    const subtractLengthValue = () => setLength(value => value-1);

    const generate_password = () =>{
        fetch('/generate_password',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "upper":uppercase,
                "lower":lowercase,
                "numbers":numbers,
                "symbols":symbols,
                "length":length
            })
        }).then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(data => setPassword(data.password))
    }

 
    
    const renderHeroHeader = () => {
        return(
        <Segment
        inverted
        textAlign='center'
        className='header'
        vertical
        >
            <Title passgen={true}/>
            <Container text>
                <h1 className='headerContent'>Generate Secure Passwords Instantly</h1>
            </Container>
        </Segment>
        )
    }

    const subtractLength = () =>{
        if(length>0){
            subtractLengthValue()
        }
    }

    const renderBody = () => {
        return (
        <Segment vertical>
            <div className='segment'>
        <Container text>
            <h2>Password Generator</h2>
            <Segment>
            <h1>{password}</h1>
            </Segment>
            <Segment textAlign="center">
                <h1>Customize your password</h1>
                <Divider/>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <h3>{length}</h3>
                        <Button onClick={addLength}>+</Button>
                        <Button onClick={subtractLength}>-</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Checkbox defaultChecked className='checkbox' label="Uppercase" onChange={toggleUppercase}/>
                            <Checkbox defaultChecked className='checkbox' label="Lowercase" onChange={toggleLowercase}/>
                            <Checkbox defaultChecked className='checkbox' label="Numbers" onChange={toggleNumbers}/>
                            <Checkbox defaultChecked className='checkbox' label="Symbols" onChange={toggleSymbols}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
                <Button floated='right' primary  onClick={generate_password}>Generate</Button>
        </Container>
        </div>
        </Segment>
        )
    }

    

    return(
        <>
        {renderHeroHeader()}
        {renderBody()}
        <Footer/>
        </>
    )
}