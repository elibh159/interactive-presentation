import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Col, Row, Alert, Fade } from 'reactstrap';

import io from 'socket.io-client';
const endPoint = 'localhost:5000';
let socket = io(endPoint);

type Props = {}

const Attendee = (props: Props) => {
  let { login_code } = useParams();
  const [slide, setSlide] = useState<any>(null);
  const [answer, setAnswer] = useState<any>();
  const [answered, setAnswered] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [sessionStatus, setSessionStatus] = useState(true);


  useEffect(() => {
    if (login_code) {
      socket.on("connect", () => {
        setIsConnected(true);
        socket.emit("join", { loginCode: login_code });
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
        setAnswer("");
        setSlide(null);
      });

      socket.on("loadSlide", (slide) => {
        setSlide(slide);
      });

      socket.on("sessionStatus", (sessionStatus) => {
        setSessionStatus(sessionStatus);
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("loadSlide");
        socket.off("sessionStatus");
      };
    }
  }, [login_code]);

  const sendAnswer = () => {
    socket.emit("setAnswer", { slideId: slide.id, answer });
    setAnswered(true);
  }
  useEffect(() => {
    setAnswered(false);
    setAnswer("");
  }, [slide])

  if (!sessionStatus) return (
    <Container>
      <Row className='m-5'>
        <Alert>Session is paused</Alert>
      </Row>
    </Container>);

  return (
    <Container>
      <Row className='m-5'>
        <Col md={2} >
          <p>Connected: {"" + isConnected}</p>
        </Col>
        <Col md={12} className="mt-5">
          {slide && !answered && sessionStatus && (
            <div>
              <h2>{slide.question}</h2>
              <input
                className='form-control m-5'
                type="text"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyPress={(event) =>
                  event.key === "Enter" ? sendAnswer() : null
                }
              />
              <Button color='success' onClick={sendAnswer}>Send answer</Button>
            </div>
          )}

          {answered && sessionStatus && (
            <div>
              <Alert className='success'>Thanks for send message</Alert>
              <Fade>
                <h2>You are all set!</h2>
                <h3>When the presenter asks a question, it shows here.</h3>
              </Fade>
            </div>
          )}

        </Col>
      </Row>
    </Container>
  )
}
export default Attendee;


