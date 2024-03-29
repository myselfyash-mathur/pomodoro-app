import React from 'react';
import {Navbar,Container,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import GoogleLogin from './google.png';
import {Footer,FooterSection,FooterLinkList,Card,CardText,CardActions} from 'react-mdl';
import Pomodoicon from './pomodoro-icon.png';
import '../node_modules/react-mdl/extra/material.js';
import '../node_modules/react-mdl/extra/css/material.css';
import '../node_modules/react-bootstrap/Navbar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function Home({props,googleLogin}){
    return(
        <div className="homePage">
            <div className="homeNavBar">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" className="navHeader">
                        <img alt="Pomodoro-Icon" src={Pomodoicon} width="40" height="40" className="d-inline-block align-top pomodoroIcon"/>
                        {"Pomodorer's Point"}
                    </Navbar.Brand>
                </Navbar>
            </div>
            <div className="homeContents">
                <Container>
                    <div className="homeContent">
                        <Row>
                            <Col lg={true} className="homeContentMatter">
                                <h1>What it is??</h1>
                                <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.
                                    The technique has been widely popularized by dozens of apps and websites providing timers and instructions. Closely related to concepts such as timeboxing and iterative and incremental development used in software design, the method has been adopted in pair programming contexts.</p>
                            </Col>
                            <Col lg={true} className="homeForms">
                                <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                    <CardText>
                                        <h3>Login/SignUp</h3>
                                            {/* <Form action="http://localhost:8080/pomoLogin" method="POST">
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Control type="email" name="EmailId" placeholder="Email" onChange={(event)=>{setEmail(event)}}/>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Control type="password" name="password" placeholder="Password" onChange={(event)=>{setPassword(event)}}/>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Button variant="primary" type="submit" onClick={()=>{login()}}>
                                                    Submit
                                                </Button>
                                            </Form> */}
                                            <img src={GoogleLogin} alt="GoogleLogin" onClick={googleLogin}></img>
                                    </CardText>
                                    <CardActions border>
                                        
                                    </CardActions>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </Container>
            </div>
            <div className="homeFooter">
                <Footer size="mini">
                    <FooterSection type="left" logo="Pomodorer's Point">
                        <FooterLinkList>
                            <Link to='/'>Help</Link>
                            <Link to='/'>Privacy & Terms</Link>
                        </FooterLinkList>
                    </FooterSection>
                </Footer>
            </div>

        </div>
    )
}
export default Home;