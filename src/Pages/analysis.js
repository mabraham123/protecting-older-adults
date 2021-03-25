import React,{useState, useEffect} from 'react'

import {Container, Card, Segment, Divider} from 'semantic-ui-react'

import Head from '../Components/Header/header'
import Reused from '../Components/Reused_Passwords/reused_passwords'

export const Analysis = ({graph}) => {


    const [analysis, setAnalysis] = useState({})
    const [reached_data, setReached_Data] = useState(false)

    useEffect(()=> {
        fetch('/analysis',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graph)
        }).then(res => {
            if (res.ok){
                return res.json()
            }
        }).then(data => {
            console.log(data)
            setAnalysis(data)
            setReached_Data(true)})
    },[])

    const reused_passwords_renderer = (can_render) =>{
        if(can_render){
            var array=analysis.analysis.reused_passwords.reused
            var renders = analysis.analysis.reused_passwords.reused.map((pass) =>
                <Reused key={pass.name} name={pass.name} linked={pass.account_liked} solution={analysis.analysis.reused_passwords.solution} /> 
            );

            return renders
        }
    }


    return(
        <>
        <Segment padded="very">
        <Head />

        <Divider/>

        <Container>
            {reused_passwords_renderer(reached_data)}
        </Container>
        </Segment>

        
        </>
    )
}