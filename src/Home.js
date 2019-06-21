import React from 'react';
import {Navbar,Container,Row,Col,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Footer,FooterSection,FooterLinkList,Card,CardText,CardActions} from 'react-mdl';
import Pomodoicon from './pomodoro-icon.png';
import '../node_modules/react-mdl/extra/material.js';
import '../node_modules/react-mdl/extra/css/material.css';
import '../node_modules/react-bootstrap/Navbar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function Home(props){
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
                            </Col>
                            <Col lg={true} className="homeForms">
                                <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                    <CardText>
                                        <h3>Login/SignUp</h3>
                                            <Form>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Control type="email" placeholder="Email" />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Button variant="primary" type="submit" onClick={()=>{props.func()}}>
                                                    Submit
                                                </Button>
                                            </Form>
                                    </CardText>
                                    <CardActions border>
                                        Don't have an Account??<Link to='/'>SignUp</Link>
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