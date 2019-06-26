import React from 'react';
import './App.css';
import {Container,Row,Card,ListGroup,ListGroupItem} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
function About(lgUser){
    return (
        <div>
            <Container>
                <Row><h1>About</h1></Row>
                <Row><h1>User's Profile</h1></Row>
                <Row><Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={lgUser.lgUser.profURL} />
                    <Card.Body>
                        <Card.Title>{lgUser.lgUser.name}</Card.Title>
                        <Card.Text>
                            You Have the Spirit to Accomplish anything, then why not begin today with time management.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{lgUser.lgUser.name}</ListGroupItem>
                        <ListGroupItem>{lgUser.lgUser.email}</ListGroupItem>
                        <ListGroupItem>+91-8107592552</ListGroupItem>
                    </ListGroup>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}
export default About;