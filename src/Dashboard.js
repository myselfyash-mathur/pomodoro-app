import React from 'react';
import './App.css';
import pomodoro from './pomodoro-technique.svg';
import 'react-bootstrap';
import {Container,Row,Col} from 'react-bootstrap';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
function Dashboard(){
    return(
        <div>
            <Container>
                <Row><h1>The Dashboard</h1></Row>
                <Row>
                    <Col><img src={pomodoro}/></Col>
                    <Col><h1>What It Is??</h1><p>Over 2 million people have already used the Pomodoro Technique to transform their lives, making them more productive, more focused and even smarter.</p></Col>
                </Row>
                <Row>
                    <Col><p>For many people, time is an enemy. We race against the clock to finish assignments and meet deadlines. The Pomodoro Technique teaches you to work with time, instead of struggling against it. A revolutionary time management system, it is at once deceptively simple to learn and life-changing to use.</p></Col>
                </Row>
                <Row>
                    <h3>The Underlying Principle</h3>
                    <p>There are six steps in the original technique:

                        <ol>
                        <li>Decide on the task to be done.</li>
                        <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
                        <li>Work on the task.</li>
                        <li>End work when the timer rings and put a checkmark on a piece of paper.</li>
                        <li>If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.</li>
                        <li>After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.</li>
                        </ol>
                        The stages of planning, tracking, recording, processing and visualizing are fundamental to the technique. In the planning phase, tasks are prioritized by recording them in a "To Do Today" list. This enables users to estimate the effort tasks require. As pomodoros are completed, they are recorded, adding to a sense of accomplishment and providing raw data for subsequent self-observation and improvement.

                        For the purposes of the technique, a pomodoro is the interval of time spent working. After task completion, any time remaining in the Pomodoro is devoted to overlearning. Regular breaks are taken, aiding assimilation. A short (3–5 minutes) rest separates consecutive pomodoros. Four pomodoros form a set. A longer (15–30 minute) rest is taken between sets.
                        A goal of the technique is to reduce the impact of internal and external interruptions on focus and flow. A pomodoro is indivisible; when interrupted during a pomodoro, either the other activity must be recorded and postponed (using the inform – negotiate – schedule – call back strategy) or the pomodoro must be abandoned.</p>
                </Row>
            </Container>
        </div>
    )
}
export default Dashboard;