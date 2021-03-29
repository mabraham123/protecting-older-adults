import React,{useState, useEffect} from 'react'

import { Container, 
    Segment,
    Grid,
    Card,
} from 'semantic-ui-react'

import Title from '../Components/Header/title'
import SecurityGrade from '../Components/Header/grade'
import AnalysisHeader from '../Components/Header/analysisTitle'
import Reused from '../Components/Reused_Passwords/reused_passwords'
import MFA from '../Components/MFA/mfa'
import CriticalNode from '../Components/Most_Valuable_Node/critical_node'
import Footer from '../Components/Footer/footer'

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
    },[graph])

    const renderHeroHeader = () => {
        return(
        <div>
        <Segment
        textAlign='center'
        vertical
        inverted
        >
        
        <Title/>
        <Container>
            <div className='top'>
            <Grid columns={2} divided stackable>
                <Grid.Row textAlign='center'>
                    <AnalysisHeader title="You're on safe grounds" subheading="We spotted a few things you can do to be safer online and be aware of"/>
                    <SecurityGrade finalgrade='B+'/>
                </Grid.Row>
            </Grid>
            </div>
        </Container>
        </Segment>
        </div>
        )
    }

    const reused_passwords_renderer = (can_render) =>{
        if(can_render){
            var renders = analysis.analysis.reused_passwords.reused.map((pass) =>
                <Reused key={pass.name} name={pass.name} linked={pass.account_liked} solution={analysis.analysis.reused_passwords.solution} /> 
            );

            return renders
        }
    }

    const non_MFA_account_renderer = (can_render) =>{
        if(can_render){
            return <MFA accounts={analysis.analysis.non_MFA_accounts.non_MFA} solution={analysis.analysis.non_MFA_accounts.solution}/>
        }
    }

    const critical_node_renderer = (can_render) => {
        if(can_render){
            return <CriticalNode name={analysis.analysis.most_critical_node} solution="be careful of spam"/>
        }
    }


    return(
        <>
        {renderHeroHeader()}

        <Segment vertical>
        <div className='segment'>
            <Container>
                <Card.Group centered itemsPerRow={reached_data ? analysis.analysis.reused_passwords.reused.length: 0}>
                    {reused_passwords_renderer(reached_data)}
                </Card.Group>

                <Card.Group centered itemsPerRow={reached_data ? 1 : 0}>
                    {non_MFA_account_renderer(reached_data)}
                </Card.Group>

                <Card.Group centered itemsPerRow={reached_data ? 1 : 0}>
                    {critical_node_renderer(reached_data)}
                </Card.Group>
            </Container>
        </div>
        </Segment>

        <Footer/>
        
        </>
    )
}