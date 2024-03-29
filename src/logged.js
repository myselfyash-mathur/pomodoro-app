import React from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import About from './About.js';
import Pomodoro from './Pomodoro.js';
import {Button} from 'react-bootstrap';
import {Layout,Header,Navigation,Drawer,Content,Footer,FooterSection,FooterLinkList} from 'react-mdl';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import '../node_modules/react-mdl/extra/material.js';
import '../node_modules/react-mdl/extra/css/material.css';
function Logged({userName,checkLogin,profURL,timer,startTimer,isSnackbarActive,lgUser,handleTimeoutSnackbar,logout,stopTimer,displayTodo,setValue,addPomoTask,pomoNum,pNum,pomodoroTask}){
    return(
        
        <div className="demo-big-content">
            {checkLogin}
        <Router>
            <Layout fixedHeader={true}>
                <Header title="Pomodorer's Point" scroll className='loggedNavHeader'>
                        <img className="profPicture" src={profURL} alt="UserProfPicture"></img>
                        <Button variant="danger" onClick={()=>logout()}>{userName}</Button>
                </Header>
                <Drawer title="Pomodorer's Point">
                    <Navigation>
                        <Link to='/logged'>Dashboard</Link>
                        <Link to='/logged/pomodoro'>Pomodoro</Link>
                        <Link to='/logged/about'>About</Link>
                    </Navigation>
                </Drawer>
                <Content className="page-content">
                    <Switch>
                        <Route path='/logged' exact component ={Dashboard}></Route>
                        <Route path='/logged/pomodoro' render={props=><Pomodoro {...props} pNum={pNum} isSnackbarActive={isSnackbarActive} handleTimeoutSnackbar={handleTimeoutSnackbar} pomodoroTask={pomodoroTask} displayTodo={displayTodo} setValue={setValue} addPomoTask={addPomoTask} pomoNum={pomoNum} timer={timer} stopTimer={stopTimer} startTimer={startTimer}></Pomodoro>}></Route>
                        <Route path='/logged/about' render ={props=><About {...props} lgUser={lgUser}></About>}></Route>
                    </Switch>
                </Content>
                <Footer size="mini" className="mainFooter">
                    <FooterSection type="left" logo="Pomodorer's Point">
                        <FooterLinkList>
                            <Link to='/'>Help</Link>
                            <Link to='/'>Privacy & Terms</Link>
                        </FooterLinkList>
                    </FooterSection>
                </Footer>
            </Layout>
            
        </Router>
        </div>
    )
}
export default Logged;