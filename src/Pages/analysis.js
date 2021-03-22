import React,{useState, useEffect} from 'react'

export const Analysis = ({graph}) => {


    const [analysis, setAnalysis] = useState({})
    
    // useEffect(() => {
    //     fetch(`/analysis/${JSON.stringify(graph)}`).then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //     }).then(data => console.log(data))
    // }, [])


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
        }).then(data => console.log(data))
    },[])



    return(
        <>
        <h1>Analysis</h1>

        </>
    )
}