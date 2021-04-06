import React,{ useState, useEffect } from 'react'
import { Container, 
    Grid,
    Segment,
    Table
} from 'semantic-ui-react'

import Title from '../Components/Header/title'
import Footer from '../Components/Footer/footer'


export const GradesDescription = () => {

   
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
                <h1 className='headerContent'>Secuirty Grades</h1>
            </Container>
        </Segment>
        )
    }

    const GradingCriteria= () =>{
        return(
            <>
            <h2>Security Grade Test Criteria</h2>
                <Table definition>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>A+</Table.HeaderCell>
                        <Table.HeaderCell>A</Table.HeaderCell>
                        <Table.HeaderCell>B+</Table.HeaderCell>
                        <Table.HeaderCell>B</Table.HeaderCell>
                        <Table.HeaderCell>C</Table.HeaderCell>
                        <Table.HeaderCell>D</Table.HeaderCell>
                        <Table.HeaderCell>F</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>Reused Passwords (% of all passwords)</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>10%</Table.Cell>
                        <Table.Cell>25%</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>70%</Table.Cell>
                        <Table.Cell>90%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Number of Accounts Not Using Multi-Factor Authentication (% of all accounts)</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>10%</Table.Cell>
                        <Table.Cell>25%</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>70%</Table.Cell>
                        <Table.Cell>90%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Using a Password Manager (Yes/No)</Table.Cell>
                        <Table.Cell>Yes</Table.Cell>
                        <Table.Cell>Yes</Table.Cell>
                        <Table.Cell>Yes</Table.Cell>
                        <Table.Cell>No</Table.Cell>
                        <Table.Cell>No</Table.Cell>
                        <Table.Cell>No</Table.Cell>
                        <Table.Cell>No</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Number of Average Passwords (% of all accounts)</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>10%</Table.Cell>
                        <Table.Cell>20%</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>70%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Number of Weak Passwords (% of all accounts)</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                        <Table.Cell>10%</Table.Cell>
                        <Table.Cell>20%</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>70%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Password Protected Devices (% of all Devices)</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                        <Table.Cell>100%</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>25%</Table.Cell>
                        <Table.Cell>0%</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
            </>
        )
    }

    const GradingBoundries = () =>{
        return(
            <>
            <h2>Grading Boundries</h2>
            <Table celled >
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'>Grade</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>%</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    A+
                </Table.Cell>
                <Table.Cell textAlign='center'>
                100%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    A
                </Table.Cell>
                <Table.Cell textAlign='center'>
                90%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    B+
                </Table.Cell>
                <Table.Cell textAlign='center'>
                80%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    B
                </Table.Cell>
                <Table.Cell textAlign='center'>
                70%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    C
                </Table.Cell>
                <Table.Cell textAlign='center'>
                60%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    D
                </Table.Cell>
                <Table.Cell textAlign='center'>
                50%
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    F
                </Table.Cell>
                <Table.Cell textAlign='center'>
                0%
                </Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
            </>
        )
    }

    const body = () =>{
        return(
        <Segment vertical>
        <div className='segment'>
            <Container text>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                <h2>About</h2>
                <p>These grades are way of visualizing and quantifying security, made bespoke for this project. 
                Account Access Interview data is analyzed and run through numerous tests looking for (or the lack of) security issues and vulnerabilities. </p>
                <p>Each test works to identify a specific issue and is then given a score out of 7. After all the tests are complete the individual scores are accumulated converted into a precentage by deviding by the maximum score possible 42 (6 tests x 7 points) and multipling by 100 then placed between the appropriate grade boundaries.</p>
                <p className='highlighter'>Note the grades scales and boundries can possbile change at a later date based on the current standards and best practices. For example a grade of B+ today may become a C later on.</p>
                </Grid.Row>
                <Grid.Row>
                {GradingCriteria()}
                </Grid.Row>
                <Grid.Row>
                {GradingBoundries()}
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
        {body()}
        <Footer/>
        </>
    )
}