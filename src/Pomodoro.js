import React from 'react';
import './App.css';
import {Container,Row,Col,Button} from 'react-bootstrap';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
function Pomodoro({timer,startTimer,stopTimer}){
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{span:6,offset:3}} > 
                        <h1 id="timerHeader">{timer.timerMin}:{timer.timerSec}</h1>
                        <Button id="startBtn" onClick={()=>startTimer()}>Start</Button>
                        <Button id="stopBtn"  onClick={()=>stopTimer()}>Stop</Button> 
                        {/* <Button onClick={}>Resume</Button>
                        <Button onClick={}>Pause</Button>
                        */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Pomodoro;