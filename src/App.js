import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom';
import Home from './Home.js';
import Logged from './logged.js';
import { ListGroup,Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAThLyqMPY10NBPd2TxYlCEHG2mbfvPLPg",
  authDomain: "pomodoroapp-aae8f.firebaseapp.com",
  databaseURL: "https://pomodoroapp-aae8f.firebaseio.com",
  projectId: "pomodoroapp-aae8f",
  storageBucket: "pomodoroapp-aae8f.appspot.com",
  messagingSenderId: "591498991208",
  appId: "1:591498991208:web:f19082d423f67bb0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



class App extends React.Component{
  
  constructor(props){
    
    super(props);
    this.state={
      isSnackbarActive:false,
      taskEle:'',
      task:[],
      tpomoNum:[],
      pomoNum:1,
      underGoTask:'',
      underGoPomo:'',
      email:'',
      name:'',
      UId:'',
      profURL:'',
      redirect:false
    }
    this.state.dbUsers=[]
    this.state.tasks={
      userName:'',
      task:'',
      email:'',
      taskPomoNum:1,
      taskDate:Date.now(),
      UId:''
    }
    this.state.localtasks=[]
    this.state.dbtasks=[]
    this.state.intervalId=''
    this.state.timerFlag=0
    this.state.brTimerFlag=0
    this.state.timer = {
      PomoSec:30,
      PomoMin:0,
      timerSec:30,
      timerMin:0,
      breakSec:10,
      breakMin:0,
      brTimerSec:10,
      brTimerMin:0,
      name:'',
      timerVal:0,
      timerState:false
    }
  }
   
  handleShowSnackbar=()=>{
    this.setState({
      isSnackbarActive: true,
    });
  }
  handleTimeoutSnackbar=()=> {
    this.setState({ isSnackbarActive: false });
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
    this.timerProgress();
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
      console.log("Final Flags, Timer:",this.state.timerFlag,"Break:",this.state.brTimerFlag);
      this.updatePomoNum(this.state.underGoPomo,this.state.underGoTask);
      this.deleteCompTasks();
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
    this.timerProgress();
    console.log("Final Flags, Timer:",this.state.timerFlag,"Break:",this.state.brTimerFlag);
    }
  startBreakTimer=()=>{  
    let timer = this.state.timer;
    let timerSec = timer.timerSec;
    let timerMin = timer.timerMin;
    // if(timerMin===0 && timerSec===0){
    //   timerSec = timer.brTimerSec;
    //   timerMin = timer.brTimerMin;
    // }
    // elem = document.getElementById("timerHeader");
        if(timerSec>=0 && timerMin>=0){
          if(timerSec>0) {timerSec-=1;}
          else if(timerMin===0 && timerSec===0){
            timerSec = timer.PomoSec;
            timerMin = timer.PomoMin;
            clearInterval(this.state.intervalId);
            this.setState({
              timerFlag:1,
              brTimerFlag:1,
              timer:timer,
            })
            this.mountingStop();
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
          this.timerProgress();
     
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
    // if(timerSec===0 && timerMin===0){
    //   timerSec = timer.PomoSec
    //   timerMin = timer.PomoMin
    // }
    // elem = document.getElementById("timerHeader");
        if(timerSec>=0 && timerMin>=0){
          if(timerSec>0) {timerSec-=1;}
          else if(timerMin===0 && timerSec===0){
            timerSec = timer.breakSec;
            timerMin = timer.breakMin;
            clearInterval(this.state.intervalId);
            console.log("Here is your tasks which will update",this.state.underGoTask,":",this.state.underGoPomo)
            this.updatePomoNum(this.state.underGoPomo,this.state.underGoTask);
            this.deleteCompTasks();
            this.setState({
              timerFlag:10,
              brTimerFlag:10,
              timer:timer
            })
            this.mountingStart();
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
          this.timerProgress();
    
     
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
  updatePomoNum=(pomo,task)=>{
    console.log("This is the selected task",task,pomo);
    let tasks = this.state.localtasks;
    for(let i=0;i<tasks.length;i++){
      if(tasks[i].taskTitle===task){
        tasks[i].taskPomoAsgn-=1
        axios.put("http://localhost:8080/updatePomo",tasks[i]).then((res)=>{
          this.setState({
            localtasks:res.data,
            underGoPomo:res.data.taskPomoAsgn
          })
        })
        this.setState({
          underGoPomo:tasks[i].taskPomoAsgn
        })
        if(this.state.underGoPomo<=0){
          this.setState({
            underGoPomo:'',
            underGoTask:''
          })
        }
        
      }
    }

  // this.setState({
    //   tpomoNum:plist
    // })
  }
  displayTodo=()=>{
    return this.state.localtasks.map((elem,i)=><ListGroup id={"listgrp"+i}>
      <ListGroup.Item id={"listelem"+i}><p>{elem.taskTitle}</p><p>{elem.taskPomoAsgn}</p><Button variant="outline-secondary" onClick={()=>{this.chooseTodo(i,elem)}}>Start</Button></ListGroup.Item>
    </ListGroup>)
  }
  chooseTodo=(index,item)=>{
    console.log("it is here")
    console.log(item.taskTitle,":",item.taskPomoAsgn);
    this.setState({
      underGoTask:item.taskTitle,
      underGoPomo:item.taskPomoAsgn
    })  
    console.log("This is the chosen task",this.state.underGoTask,"with",this.state.underGoPomo)
  }
  pomodoroTask=()=>{
    let index = this.state.underGoPomo
    let task = this.state.underGoTask
    return <ListGroup id={"listgrp"+index}>
      <ListGroup.Item id={"listelem"+index}><p>{task}</p><p>{index}</p></ListGroup.Item>
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
      let email = this.state.email
      let userName = this.state.name;
      tpomoNum.push(pNum);
      taskList.push(this.state.taskEle);
      this.setState({
        task:taskList,
        tpomoNum:tpomoNum,
        pomoNum:1
      })
      let tasks = this.state.tasks
      tasks.task=this.state.taskEle
      tasks.taskPomoNum=pNum
      tasks.email = email;
      tasks.userName = userName;
      tasks.UId = this.state.UId
      this.setState({
        tasks:tasks
      })
      let localarr = {'taskTitle':this.state.taskEle,'taskDate':this.state.tasks.taskDate,'taskPomoAsgn':pNum};
      let localtasks = this.state.localtasks
      let fl=0;
      for(let i=0;i<localtasks.length;i++){
        if(localtasks[i].taskTitle===localarr.taskTitle){
          fl=1;
          break;
        }
        else{
          fl=0;
        }
      }
      if(fl===0){
      localtasks.push(localarr)
          this.setState({
            localtasks:localtasks
          })
        }
        else{
          alert("This task is already present in your ToDoList, you can complete that or delete and start new");
        }
      console.log(this.state.tasks);
      axios.post('http://localhost:8080/pomoAddTasks',this.state.tasks).then((res)=>{
        console.log(res);
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
  /**Login and SignUp Functions */
  
  googleLogin=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=> {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      console.log('1')
      this.setState({
        email:user.email,
        name:user.displayName
      })
      console.log(this.state.name);
      this.props.history.push('/logged');
      
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log("err",error);
      
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  componentDidMount=()=>{
  firebase.auth().onAuthStateChanged((user)=> {
   if (user) {
     console.log(user);
     this.setState({
       name:user.displayName,
       email:user.email,
       UId:user.uid,
       profURL:user.photoURL
     })
     console.log(user.email,this.state.email);
     console.log(user.displayName,this.state.name);
     console.log(user.uid,this.state.UId)
    let details={'name':this.state.name,'email':this.state.email,'UId':this.state.UId}
    axios.post("http://localhost:8080/pomoLogin",details).then((res)=>{
      this.setState({
        dbUsers:res.data
      })
      console.log(res.data);
    })
    console.log(details);
      axios.post("http://localhost:8080/pomoTasks",details).then((res)=>{
      this.setState({
        dbtasks:res.data,
        localtasks:res.data
      })
      console.log(res.data)
    })
    this.props.history.push('/logged');
   } else {
    this.props.history.push('/');
   }
 });
 console.log(this.state.name);
}
   getUserDetails(){
    let UId = this.state.dbUsers._id;
   this.setState({
      UId:UId
    })
  }
  setEmaill=(evt)=>{
    this.setState({email:evt.target.value})

  }
  setPassword=(evt)=>{
    this.setState({pass:evt.target.value})
  
  }
  deleteCompTasks=()=>{
    let localtasks = this.state.localtasks;
    for(let i=0;i<localtasks.length;i++){

        if(localtasks[i].taskPomoAsgn<=0){
          console.log(localtasks[i])
          let delTask = localtasks[i];
          console.log(delTask);
          axios.delete('http://localhost:8080/deleteCompTasks/'+delTask.taskTitle).then((res)=>{
            console.log(res)
          })
          localtasks.splice(i,1);
          this.setState({
            dbtasks:localtasks,
            localtasks:localtasks
          }) 
          if(this.state.underGoPomo<=0){
            this.setState({
              underGoPomo:'',
              underGoTask:''
            })
          }
          this.handleShowSnackbar();
        }
        
    }
  }

  timerProgress=()=>{
    if(this.state.timer.timerState ===false){
      let min = this.state.timer.timerMin;
      let sec = this.state.timer.timerSec;
      let rsec = (min*60+sec)
      console.log("Reamining",rsec);
      let pmin = this.state.timer.PomoMin;
      let psec = this.state.timer.PomoSec;
      let tsec = (pmin*60+psec);
      console.log("Total",tsec)
      let timerVal = (rsec/tsec)*100;
      let timer = this.state.timer;
      timer.timerVal = timerVal;
      if(timer.timerVal===0){
        timer.timerState=true;
      }
      this.setState({
        timer:timer
      })
      console.log("TimerValue",this.state.timer.timerVal);
      console.log()
    }
    else{
      let min = this.state.timer.timerMin;
      let sec = this.state.timer.timerSec;
      let rsec = (min*60+sec)
      console.log("Reamining",rsec);
      let bMin = this.state.timer.brTimerMin;
      let bSec = this.state.timer.brTimerSec;
      let tsec = (bMin*60+bSec);
      console.log("Total",tsec);
      let timerVal = (rsec/tsec)*100;
      let timer = this.state.timer;
      timer.timerVal = timerVal;
      if(timer.timerVal===0){
        timer.timerState=false;

      }
      this.setState({
        timer:timer
      })
      console.log("TimerValue",this.state.timer.timerVal);
      
    }

  }

  logout(){
    firebase.auth().signOut().then(()=>{
      console.log('Logged out');
      this.props.history.push('/');
    }).catch(function(error) {
    // An error happened.
    });
}

  login=()=>{
    // let email = this.state.email;
    // let pass = this.state.pass;
    // axios.post('http://localhost:8080/pomoLogin').then((res)=>{
    //       console.log(res.json);
    // })
  }
  render(){
    return(
      <div>
          <Route path='/' exact render={(props)=><Home {...props} googleLogin={this.googleLogin} setEmail={this.setEmaill} setPassword={this.setPassword}></Home>}></Route>
          <Route path='/logged' render={(props)=><Logged {...props} handleTimeoutSnackbar={this.handleTimeoutSnackbar} isSnackbarActive={this.state.isSnackbarActive} timerVal = {this.state.timer.timerVal} logout={this.logout} checkLogin={this.checkLogin} userName={this.state.name} profURL={this.state.profURL} pNum={this.state.pomoNum} pomodoroTask={this.pomodoroTask} displayTodo={this.displayTodo} timer={this.state.timer} stopTimer={this.mountingStop} startTimer ={this.mountingStart} chooseTodo={this.chooseTodo} setValue={this.setValue} addPomoTask={this.addTask} pomoNum={this.pomoNum} ></Logged>}></Route>
      </div>
    )
  }
}

export default withRouter(App);