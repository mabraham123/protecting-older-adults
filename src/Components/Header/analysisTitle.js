import React from 'react'
import {Grid} from 'semantic-ui-react'

const header_title = ({title, subheading}) =>{
    return(
        <Grid.Column>
            <div className='gradeHeader'>
                <h1 className='gradetitle'>{title}</h1>
                <h3>{subheading}</h3>
            </div>
        </Grid.Column>
    )
}


export default header_title