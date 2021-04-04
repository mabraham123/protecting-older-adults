import React from 'react'
import {Grid} from 'semantic-ui-react'

const header_title = ({title, subheading}) =>{
    return(
        <Grid.Column>
            <div className='gradeHeader'>
                <h1 className='gradetitle'>{title}</h1>
                <h3>{subheading}</h3>
            </div>
            <h3 className='highlighter'>With our suggestions your score could potentially move up to an A+!</h3>
        </Grid.Column>
    )
}


export default header_title