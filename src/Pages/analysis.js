import React,{useState, useEffect} from 'react'

import { Container, 
    Segment,
    Grid,
    Card,
    Tab
} from 'semantic-ui-react'


import Title from '../Components/Header/title'
import SecurityGrade from '../Components/Header/grade'
import AnalysisHeader from '../Components/Header/analysisTitle'
import Reused from '../Components/Reused_Passwords/reused_passwords'
import MFA from '../Components/MFA/mfa'
import CriticalNode from '../Components/Most_Valuable_Node/critical_node'
import WeakPasswords from '../Components/WeakPasswords/weakpasswords'
import AveragePasswords from '../Components/AveragePasswords/averagepasswords'
import StrongPasswords from '../Components/StrongPasswords/strongpasswords'
import PasswordManager from '../Components/Password_Manager/passwordmanager'
import DeviceProtection from '../Components/NotProtectedDevice/notprotecteddevice'
import NotReusingPasswords from '../Components/NotReusingPasswords/notreusingpasswords'
import Footer from '../Components/Footer/footer'

export const Analysis = ({graph}) => {


    const [analysis, setAnalysis] = useState({})
    const [reached_data, setReached_Data] = useState(false)

    useEffect(()=> {
        fetch('https://poao-server.herokuapp.com/analysis',{
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
                        {security_grade_info_renderer(reached_data)}
                        {security_grade_renderer(reached_data)}
                    </Grid.Row>
                </Grid>
                </div>
            </Container>
            </Segment>
        </div>
        )
    }            

    const security_grade_info_renderer = (can_render) => {
        var title=""
        var subheading=""
        var colors=""
        if(can_render){
            switch (analysis.analysis.grade.grade) {
                case "A+":
                    title="Perfect Score!"  
                    subheading="Keep doing what you are doing"
                    colors="GradeAPlus"
                  break;
                case "A":
                    title="You're almost there"  
                    subheading="Just shy of a perfect score, we spotted a few things you can be doing to be safer online"
                    colors="GradeA"
                  break;
                case "B+":
                    title="You're on safe grounds"  
                    subheading="We spotted a few things you can do to be safer online and be aware of"
                    colors="GradeBPlus"
                  break;
                case "B":
                    title="Good start"  
                    subheading="There are a few a issues we found but we have some recommendations"
                    colors="GradeB"
                  break;
                case "C":
                    title="We can do a bit better"  
                    subheading="A few critical issues were spotted but we'll get you there"
                    colors="GradeC"
                  break;
                case "D":
                    title="You're not very secure right now"  
                    subheading="There are a few fundemental issues here that are not up to standard"
                    colors="GradeD"
                  break;
                case "F":
                    title="We have major work to do"  
                    subheading="We spotted fundemental and critical issues, together we can make you safer and more secure online"
                    colors="GradeF"
                    break;
                default:
                    title=''
                    subheading=''
              }

            var render = <AnalysisHeader title={title} subheading={subheading} colors={colors}/>
            return render
        }
    }

    const security_grade_renderer = (can_render) => {
        if(can_render){
            var colors=""
            switch (analysis.analysis.grade.grade) {
                case "A+":
                    colors="GradeAPlus"
                  break;
                case "A":
                    colors="GradeA"
                  break;
                case "B+":
                    colors="GradeBPlus"
                  break;
                case "B":
                    colors="GradeB"
                  break;
                case "C":
                    colors="GradeC"
                  break;
                case "D":
                    colors="GradeD"
                  break;
                case "F":
                    colors="GradeF"
                  break;
                default:
                    colors=''
              }
            var render = <SecurityGrade finalgrade={analysis.analysis.grade.grade} colors={colors}/>
            return render
        }
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
            if(analysis.analysis.non_MFA_accounts.non_MFA.length >0){
                return <MFA accounts={analysis.analysis.non_MFA_accounts.non_MFA} MFA={false} solution={analysis.analysis.non_MFA_accounts.solution}/>
            }
        }
    }  

    
    const MFA_account_renderer = (can_render) =>{
        if(can_render){
            if(analysis.analysis.non_MFA_accounts.MFA.length >0){
                return <MFA accounts={analysis.analysis.non_MFA_accounts.MFA} MFA={true} solution={""}/>
            }
        }
    }

    const critical_node_renderer = (can_render) => {
        if(can_render){
            return <CriticalNode name={analysis.analysis.most_critical_node} solution="If you were to only protect one account- make it this one. You want this account to be the most inconvenient for a hacker to get into, such as using a strong password and Multi-Factor Authentication. Be a bit more careful of Spam and Phishing attacks aimed at this account."/>
        }
    }

    const weak_passwords_renderer = (can_render) => {
        if(can_render){
        var renders = analysis.analysis.bad_passwords.critical.map((pass) =>
            <WeakPasswords key={pass.name} name={pass.name} solution={analysis.analysis.bad_passwords.solution} password={pass.new_password} affected={pass.affected} /> 
            );

        return renders
        }
    }

    const average_passwords_renderer = (can_render) => {
        if(can_render){
        var renders = analysis.analysis.bad_passwords.issues.map((pass) =>
            <AveragePasswords key={pass.name} name={pass.name} solution="If your password is short consider changing this password for a more secure one. Longer the password more secure it is (at least 12 character). If you are writing your passwords down somewhere, it might as well be a strong password." password={pass.new_password} affected={pass.affected}/> 
            );

        return renders
        }
    }

    const strong_passwords_renderer = (can_render) => {
        if(can_render){
            if(analysis.analysis.bad_passwords.strong.length >0){
                return <StrongPasswords linked={analysis.analysis.bad_passwords.strong} /> 
            }
        }
    }

    const unprotected_devices_renderer = (can_render) => {
        if(can_render){
        var renders = analysis.analysis.devices.not_protected.map((device) =>
            <DeviceProtection key={device.name} name={device.name} secure={false} affected={device.affected}/> 
        );

        return renders
        }
    }

    const protected_devices_renderer = (can_render) => {
        if(can_render){
        var renders = analysis.analysis.devices.protected.map((device) =>
            <DeviceProtection key={device} name={device} secure={true} /> 
        );

        return renders
        }
    }

    const use_a_password_manager_renderer = (can_render) => {
        if(can_render){
            if (analysis.analysis.uses_password_manager){
                return <PasswordManager present={analysis.analysis.uses_password_manager} /> 
            }
        }
    }

    const does_not_a_password_manager_renderer = (can_render) => {
        if(can_render){
            if (!analysis.analysis.uses_password_manager){
                return <PasswordManager present={analysis.analysis.uses_password_manager} /> 
            }
        }
    }

    const not_reusing_password_renderer = (can_render) => {
        if(can_render){
            if (analysis.analysis.reused_passwords.reused.length === 0){
                return <NotReusingPasswords/>
            }
        }
    }

    const no_critical_issues_renderer = (can_render) =>{
        if(can_render){
            if(analysis.analysis.reused_passwords.reused.length<1 && analysis.analysis.bad_passwords.critical.length<1 &&analysis.analysis.devices.not_protected.length<1){
                return <h1>Congratulations you have no critical issues!</h1>
            }
        }
    }

    const views = [
        {
            menuItem: 'Critical Issues',
            render: () =>
              <Segment vertical>
              <div className='segment'>
                  <Container>
                    <Card.Group stackable centered itemsPerRow={reached_data ? analysis.analysis.reused_passwords.reused.length: 0}>
                        {reused_passwords_renderer(reached_data)}
                    </Card.Group>

                    <Card.Group stackable centered itemsPerRow={reached_data ? analysis.analysis.bad_passwords.critical.length: 0}>
                        {weak_passwords_renderer(reached_data)}
                    </Card.Group>

                    <Card.Group stackable centered itemsPerRow={reached_data ? analysis.analysis.devices.not_protected.length: 0}>
                        {unprotected_devices_renderer(reached_data)}
                    </Card.Group>
                    {no_critical_issues_renderer(reached_data)}
                  </Container>
                  
                </div>
              </Segment>,
          },
        {
            menuItem: 'Best Practice Issues',
            render: () =>
              <Segment vertical>
              <div className='segment'>
                  <Container>
                    <Card.Group stackable centered itemsPerRow={reached_data ? 1 : 0}>
                        {critical_node_renderer(reached_data)}
                    </Card.Group>

                    <Card.Group stackable centered itemsPerRow={reached_data ? 1 : 0}>
                        {non_MFA_account_renderer(reached_data)}
                    </Card.Group>

                    <Card.Group stackable centered itemsPerRow={reached_data ? 2 : 0}>
                        {average_passwords_renderer(reached_data)}
                    </Card.Group>

                    <Card.Group stackable centered itemsPerRow={reached_data ? 1: 0}>
                          {does_not_a_password_manager_renderer(reached_data)}
                    </Card.Group>                    
                  </Container>
                  </div>
              </Segment>,
          },
          {
            menuItem: 'Things you are doing well',
            render: () =>
              <Segment vertical>
              <div className='segment'>
                  <Container>
                        <Card.Group stackable centered itemsPerRow={reached_data && analysis.analysis.uses_password_manager ? 1: 0}>
                            {use_a_password_manager_renderer(reached_data)}
                        </Card.Group>
                        
                        <Card.Group stackable centered itemsPerRow={1}>
                            {MFA_account_renderer(reached_data)}
                        </Card.Group>

                        <Card.Group stackable centered itemsPerRow={reached_data ? 1: 0}>
                            {strong_passwords_renderer(reached_data)}
                        </Card.Group>

                        <Card.Group stackable centered itemsPerRow={1}>
                            {not_reusing_password_renderer(reached_data)}
                        </Card.Group>

                        <Card.Group stackable centered itemsPerRow={reached_data ? analysis.analysis.devices.protected.length: 0}>
                            {protected_devices_renderer(reached_data)}
                        </Card.Group>
                  </Container>
                  </div>
              </Segment>,
          },
      ]


    return(
        <>
        {renderHeroHeader()}

        <Container>

        <div className='tab'>
            <Grid>
                <Grid.Row>
                    <h4>Select the options to see different parts of the analysis</h4>
                    <Tab menu={{ color:"blue", secondary: true }} panes={views} />
                </Grid.Row>
            </Grid>
        </div>
        </Container>
        <Footer/>
        
        </>
    )
}