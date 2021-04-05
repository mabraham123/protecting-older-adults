import React from 'react'
import {Grid, Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const grades=["A+","A","B+","B","C","D","F"]


const grade = ({finalgrade,colors}) =>{

    return(
        <Grid.Column>
            <div className='grades'>
            <Grid verticalAlign='middle'>
                <Grid.Row>
                    <h2>Your overall security score is:</h2>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {grades.map((grade) => (
                        <Grid.Row key={grade}>
                            <Grid.Column>{finalgrade===grade ? <b className={colors}><u>{grade}</u></b>: grade}</Grid.Column>
                        </Grid.Row>
                        ))}
                    </Grid.Column>
                    <Grid.Column>
                    <h1 className={`grade ${colors}`}>{finalgrade}</h1>

                    </Grid.Column>
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                    <Link to="/" target="_blank" rel="noopener noreferrer" className='link'>Find out here how your grade is calculated</Link>
                </Grid.Row>
            
            </Grid>
            
            </div>
        </Grid.Column>
    )
}


export default grade