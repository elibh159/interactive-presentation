import { Link } from "react-router-dom";
import {
    Container, Row, Col, Card,
    CardHeader, CardBody, CardTitle,
    } from "reactstrap";
import { LOGIN_CODE } from "../../constants";

const Home = () => {

    return (
        <Container className="mt-5">
            <Link className="m-5" to="/dashboard">Dashboard</Link>
            <Link className="m-5" to={'/presentation/' + LOGIN_CODE}>Presentation</Link>
            <Link className="m-5" to={'/attendee/' + LOGIN_CODE}>Attendee</Link>
            <Row className="mt-5 mb-5">
                <Col md={4}>

                    <Card className="my-2" >
                        <CardHeader>
                            Dashboard
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">
                                Slide Manager
                            </CardTitle>
                            <div className="text-start">
                                in this part, the admin could define a new slide
                                for easy work, I consider default slides.
                            </div>
                                <Link to="/dashboard">Dashboard</Link>
                        </CardBody>
                    </Card>

                </Col>
                <Col md={4}>

                    <Card className="my-2">
                        <CardHeader>
                            Presentation
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">
                                Play Presentation
                            </CardTitle>
                            <div className="text-start">
                                <p>in this part, presenter share and show vote to attendees</p>
                                <p>Play Button: presentation begins to start, and the first question will appear (everywhere).</p>
                                <p>Show Answer: Showing the answer to the current question.</p>
                                <p>Next Button: Active Next question</p>
                                <p>Prevue Button: Back to prevue question</p>
                                <p>Stop: Stop Presentation</p>
                                <p>attendeesCount: Number of attendees which joined</p>
                                <p>answerCount: Number of answered for current question</p>

                            </div>
                                <Link className="m-5" to={'/presentation/' + LOGIN_CODE}>Presentation</Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>


                    <Card className="my-2">
                        <CardHeader>
                            Attendee
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h5">
                                SendSteps.me
                            </CardTitle>
                            <div className="text-start">

                                <p>Step 1: open a new tab(or more) and click on the Attendee page.</p>
                                <p>Step 2: when the presenter clicks the play button. The question will be shown here.</p>
                                <p>Step 3: attendee will answer the question while the presenter did't press the next button.</p>
                                <p>step 4: if the attendee close the page or loses connection, the number of attendee Count should be changed (on the presentation page)</p>
                                <p>step 5: if the presenter press the stop button or close their page, here should show this message "Session is paused"</p>
                            </div>
                                <Link className="m-5" to={'/presentation/' + LOGIN_CODE}>Presentation</Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;