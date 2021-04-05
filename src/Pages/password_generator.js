import React,{ useState, useEffect } from 'react'
import { Container, 
    Button, 
    Divider,
    Grid,
    Checkbox,
    Segment,
    Popup,
    Icon,
    List
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

    useEffect(()=> {
        fetch('/generate_password').then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(data => setPassword(data.password))
    },[])


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

    const copyPassword = () =>{
        navigator.clipboard.writeText(password)
    }

    const PasswordGeneratorTool = () =>{
        return (
            <Segment vertical>
                <div className='segment'>
            <Container text>
                <h1>Random Password Generator</h1>
                <Segment raised>
                    <Container>
                        <h4>Result:</h4>
                        
                        <Popup content='Genereate' trigger={<Button floated='right' primary  onClick={generate_password}><Icon name='redo alternate' size='large' onClick={generate_password}/></Button>} />
    
                        <Popup
                            content='Copied'
                            on='click'
                            pinned
                            position='top right'
                            trigger={<Button floated='right' onClick={copyPassword}><Icon name='copy outline' size='large'/>Copy Password</Button>}
                        />
                        
                        <h1>{password}</h1>
                    </Container>
                </Segment>
                <Segment textAlign="center">
                    <h2>Customize your password</h2>
                    <Divider/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Pasword Length: {length}</h3>
                                <Button onClick={subtractLength}>-</Button>
                                <Button onClick={addLength}>+</Button>
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

    const passwordCreationInformation = () =>{
        return(
        <Segment vertical>
        <div className='segment'>
            <Container text>
            <h1>What counts as a strong password nowdays?</h1>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                <p><b>Long-</b> Longer the length of a password, the more secure it is. A strong password is at least 12 characters long. (A good strategy to create passwords that are easy to remember is to combine at least 3 words together E.g. 'This is an easy to remember long password')</p>
                <p><b>Random-</b> Use a mix  of letters (both upper and lowercase), numbers, and symbols to form something that can't be predicted (Remember this shouldn't resemble identifiably information such as names or dates).</p>
                <p><b>Unique-</b> A password should never be used to access more than one account.</p>
                <br/>
                </Grid.Row>
                </Grid>
            </Container>
        </div>
        </Segment>
        )
    }


    

    return(
        <>
        {renderHeroHeader()}
        {PasswordGeneratorTool()}
        {passwordCreationInformation()}
        <Footer/>
        </>
    )
}