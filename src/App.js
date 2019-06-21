import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home.js';
import Logged from './logged.js';
import { ListGroup,Button } from 'react-bootstrap';
class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      taskEle:'',
      task:[],
      tpomoNum:[],
      pomoNum:1,
      underGoTask:'',
      underGoPomo:1
    }
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
  
  displayTodo=()=>{
    return this.state.task.map((elem,i)=><ListGroup id={"listgrp"+i}>
      <ListGroup.Item id={"listelem"+i}><p>{elem}</p><p>{this.state.tpomoNum[i]}</p><Button variant="outline-secondary" onClick={()=>{this.chooseTodo(i,elem)}}>Start</Button></ListGroup.Item>
    </ListGroup>)
  }
  chooseTodo=(index,item)=>{
    console.log("it is here")
    console.log(item,":",index);
    this.setState({
      underGoTask:item,
      underGoPomo:this.state.tpomoNum[index]
    })  
  }
  pomodoroTask=()=>{
    let index = this.state.underGoPomo
    let task = this.state.underGoTask
    return <ListGroup id={"listgrp"+index}>
      <ListGroup.Item id={"listelem"+index}><p>{task}</p><p>{this.state.tpomoNum[index]}</p></ListGroup.Item>
    </ListGroup>
  }
  
  setValue=(evt)=>{
    this.setState({
      taskEle:evt.target.value
    })
  }
  addTask=()=>{
    if(this.state.taskEle!==''){
      let taskList = this.state.task;
      let pNum = this.state.pomoNum;
      let tpomoNum = this.state.tpomoNum;
      tpomoNum.push(pNum);
      taskList.push(this.state.taskEle);
      this.setState({
        task:taskList,
        tpomoNum:tpomoNum,
        pomoNum:1
      })
    }
    else{
      alert("Add a Task to Start the Pomodoro");
    }
  }
  pomoNum=()=>{
    let pNum = this.state.pomoNum;
    pNum+=1;
    this.setState({
      pomoNum:pNum
    })


  }
  
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route path='/' exact render={(props)=><Home {...props}></Home>}></Route>
            <Route path='/logged' render={(props)=><Logged{...props} pNum={this.state.pomoNum} pomodoroTask={this.pomodoroTask} displayTodo={this.displayTodo} timer={this.state.timer} stopTimer={this.mountingStop} startTimer ={this.mountingStart} chooseTodo={this.chooseTodo} setValue={this.setValue} addPomoTask={this.addTask} pomoNum={this.pomoNum} ></Logged>}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;