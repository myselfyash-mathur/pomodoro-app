import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home.js';
import Logged from './logged.js';
class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={}
    this.state.intervalId=''
    this.state.timerFlag=0
    this.state.brTimerFlag=0
    this.state.timer = {
      PomoSec:0,
      PomoMin:1,
      timerSec:0,
      timerMin:1,
      brTimerSec:30,
      brTimerMin:1,
      name:'',
      task:[],
      timerState:false
    }
  }
  
  breakStart=()=>{
    let brefid = setInterval(()=>this.startBreakTimer(),1000);
    console.log("Brief Id",brefid);
    this.setState({
      intervalId:brefid
    })
  }
  mountingStart=()=>{
    //checking of the flags from the base value in the set state operation
    var trFlag = this.state.timerFlag;
    var brFlag = this.state.brTimerFlag;
    let strtElem = document.getElementById('startBtn');
    let stpElem = document.getElementById('stopBtn');
    console.log("Initial Flags, Timer:",trFlag,"Break:",brFlag);
    if(trFlag===0 && brFlag===0){
      trFlag=1;
      brFlag=0;
      //stpElem.disabled=false;
      strtElem.innerText="Pause";
      stpElem.innerText="Stop";
      let refId = setInterval(()=>this.startPomodoroTimer(),1000);
      this.setState({
        intervalId:refId
      })
    }
    else if(trFlag===1 && brFlag===0){
      trFlag=10;
      brFlag=0;
      strtElem.innerText="Resume";
      stpElem.innerText="Done";
      clearInterval(this.state.intervalId);
    } 
    else if(trFlag===10 && brFlag===0){
      trFlag=1;
      brFlag=0;
      strtElem.innerText="Pause";
      stpElem.innerText="Stop";
      let refId = setInterval(()=>this.startPomodoroTimer(),1000);
      this.setState({
        intervalId:refId
      })
    }
    else if(trFlag===10 && brFlag===1){
      trFlag=10;
      brFlag=10;
      strtElem.innerText="Resume";
      stpElem.innerText="Skip";
      clearInterval(this.state.intervalId); 
    }
    else if(trFlag===10 && brFlag===10){
      trFlag=10;
      brFlag=1;
      strtElem.innerText="Pause";
      stpElem.innerText="Skip";
      this.breakStart();
    }

    this.setState({
      timerFlag:trFlag,
      brTimerFlag:brFlag
    })
    console.log("Final Flags, Timer:",this.state.timerFlag,"Break:",this.state.brTimerFlag);
  }
  mountingStop=()=>{
    let strBtn = document.getElementById("startBtn");
    let stpBtn = document.getElementById('stopBtn');
    let brFlag = this.state.brTimerFlag;
    let trFlag = this.state.timerFlag;
    console.log("Final Flags, Timer:",this.state.timerFlag,"Break:",this.state.brTimerFlag);
  
    if(trFlag===1 && brFlag===0){
      trFlag=0;
      brFlag=0;
      strBtn.innerText="Start";
      stpBtn.innerText="Stop";
      //stpBtn.disabled=true;
      let timer = this.state.timer;
      timer.timerSec = timer.PomoSec;
      timer.timerMin = timer.PomoMin;
      this.setState({
        timer:timer
      })
      clearInterval(this.state.intervalId);
    }
    else if(trFlag===10 && brFlag===0){
      trFlag=10;
      brFlag=1;
      strBtn.innerText="Pause";
      stpBtn.innerText="Skip";
      let timer = this.state.timer;
      timer.timerSec = timer.brTimerSec;
      timer.timerMin = timer.brTimerMin;
      this.setState({
        timer:timer
      })
      this.breakStart();
    }
    else if((trFlag===10 || trFlag===1) && (brFlag===1 || brFlag===10)){
      trFlag=0;
      brFlag=0;
      strBtn.innerText="Start";
      stpBtn.innerText="Stop";
      //stpBtn.disabled=true;
      let timer = this.state.timer;
      timer.timerSec = timer.PomoSec;
      timer.timerMin = timer.PomoMin;
      this.setState({
        timer:timer
      })
      clearInterval(this.state.intervalId);
    }
    else{
      console.log("Button Didn't Worked");
    }
    this.setState({
      timerFlag:trFlag,
      brTimerFlag:brFlag
    })
    console.log("Final Flags, Timer:",this.state.timerFlag,"Break:",this.state.brTimerFlag);
}

  
  startBreakTimer=()=>{  
    let timer = this.state.timer;
    let timerSec = timer.timerSec;
    let timerMin =timer.timerMin;
    // elem = document.getElementById("timerHeader");
        if(timerSec>=0 && timerMin>=0){
          if(timerSec>0) {timerSec-=1;}
          else if(timerMin===0 && timerSec===0){
            timerSec = 0;
            timerMin = 0;
            clearInterval(this.state.intervalId);
            let timer = this.state.timer;
            timer.timerSec = timer.PomoSec;
            timer.timerMin = timer.PomoMin;
            this.setState({
              timer:timer
            })
          }
          else {
            timerSec=59;
            timerMin-=1;
          }
          timer.timerSec = timerSec;
          timer.timerMin = timerMin;
          this.setState({
          timer:timer
          })
     
        }
        else {
            clearInterval(this.state.intervalId);
            timer.brTimerSec=0;
            timer.brTimerMin=0;
            this.setState({
              timer:timer
            })
          }
        console.log("Timer State",timer.timerState);
        //console.log("Timer Mis"timer.timerMin,":",timer.timerSec);
    }
  startPomodoroTimer=()=>{  
    let timer = this.state.timer;
    let timerSec = timer.timerSec;
    let timerMin = timer.timerMin;
    // elem = document.getElementById("timerHeader");
        if(timerSec>=0 && timerMin>=0){
          if(timerSec>0) {timerSec-=1;}
          else if(timerMin===0 && timerSec===0){
            timerSec = 0;
            timerMin = 0;
            clearInterval(this.state.intervalId);
            //New function calling
          }
          else {
            timerSec=59;
            timerMin-=1;
          }
          timer.timerSec = timerSec;
          timer.timerMin = timerMin;
             this.setState({
          timer:timer
          })
     
        }
        else {
            clearInterval(this.state.intervalId);
            timer.timerSec=0;
            timer.timerMin=0;
            this.setState({
              timer:timer
            })
          }
        console.log("Timer State",timer.timerState);
        //console.log("Timer Mis"timer.timerMin,":",timer.timerSec);
    }
  
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route path='/' exact render={(props)=><Home {...props}></Home>}></Route>
            <Route path='/logged' render={(props)=><Logged{...props} timer={this.state.timer} stopTimer={this.mountingStop} startTimer ={this.mountingStart}></Logged>}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;