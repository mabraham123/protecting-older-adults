import React from 'react'
import {Grid} from 'semantic-ui-react'

const grades=["A+","A","B+","B","C+","C","D+","D"]

const grade = ({finalgrade}) =>{
    return(
        <Grid.Column>
            <div className='grades'>
            <Grid verticalAlign='middle'>
                <Grid.Row>
                    <h2>Your overall secuirty score is:</h2>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {grades.map((grade) => (
                        <Grid.Row key={grade}>
                            <Grid.Column>{finalgrade===grade ? <b><u>{grade}</u></b>: grade}</Grid.Column>
                        </Grid.Row>
                        ))}
                    </Grid.Column>
                    <Grid.Column>
                    <h1 className='grade'>{finalgrade}</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            </div>
        </Grid.Column>
    )
}


export default grade