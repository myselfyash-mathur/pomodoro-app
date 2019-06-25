import React from 'react';
import './App.css';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import {Container,Row,Col,Button,InputGroup,FormControl} from 'react-bootstrap';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
function Pomodoro({timer,timerVal,startTimer,stopTimer,displayTodo,setValue,addPomoTask,pomoNum,pNum,pomodoroTask}){
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{span:6}}>
                    <h1>Todo List</h1>
                    <InputGroup>
                        <FormControl placeholder="Todo List" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(event)=>{setValue(event)}}/>
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={()=>{pomoNum()}}>{pNum}</Button>
                                <Button variant="outline-secondary" onClick={()=>{addPomoTask()}}>Add Task</Button>
                            </InputGroup.Append>
                    </InputGroup>
                    </Col>
                    <Col md={{span:6}} >
                        <CircularProgressbar value={timer.timerVal} circleRatio={1} background={true} styles={buildStyles({backgroundColor:`rgba(2,2,2)`,pathColor:`rgba(255, 255, 255, ${timer.timerVal / 100})`,textColor: '#FFFFFF', trailColor:'rgba(3,3,3)',})}text={`${timer.timerMin,":",timer.timerSec}`}></CircularProgressbar> 
                        <h1 id="timerHeader">{timer.timerMin}:{timer.timerSec}</h1>
                        <Button id="startBtn" onClick={()=>startTimer()}>Start</Button>
                        <Button id="stopBtn"  onClick={()=>stopTimer()} >Stop</Button> 
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={{span:6}}>
                        {displayTodo()}
                    </Col>
                    <Col md={{span:6}}>
                        <h1>Ongoing Process</h1>
                            {pomodoroTask()}
                    </Col>
                    
                </Row>
                
            </Container>
        </div>
    )
}
export default Pomodoro;