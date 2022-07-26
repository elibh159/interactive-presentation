import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Fade, Alert } from 'reactstrap';
import io from 'socket.io-client';

const endPoint = 'localhost:5000';
let socket = io(endPoint);

type Props = {}

const Presentation = (props: Props) => {
  const { login_code } = useParams();
  const [slide, setSlide] = useState<any>({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sessionStatus, setSessionStatus] = useState(true);


  const handelStart = () => {
    socket.emit('start', { loginCode: login_code })
    socket.emit('getSlide', { priority: 1 })
  }

  const handelNext = () => {
    socket.emit('getSlide', { priority: (slide.priority + 1) });
    setAnswers([]);
  }

  const handelPrevue = () => {
    socket.emit('getSlide', { priority: (slide.priority - 1) })
  }


  const handelShowAnswer = () => {
    socket.emit('getAnswers', { slideId: slide.id })
  }

  const handelStop = () => {
    socket.emit('setSessionStatus', false);
  }



  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSlide({});
      setAttendeesCount(0);
      setAnswerCount(0);
      setAnswers([]);
    });

    socket.on("loadSlide", (slide) => {
      setSlide(slide);
    });

    socket.on("attendeesCount", attendeesCount => {
      setAttendeesCount(attendeesCount);
    });

    socket.on("answerCount", answerCount => {
      setAnswerCount(answerCount);
    });

    socket.on("loadAnswer", answers => {
      setAnswers(answers);
    });

    socket.on("sessionStatus", (sessionStatus) => {
      setSessionStatus(sessionStatus);
    });


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("loadSlide");
      socket.off("attendeesCount");
      socket.off("answerCount");
      socket.off("loadAnswer");
      socket.off("sessionStatus");
    };
  }, []);
  if (!sessionStatus) return (
    <Container>
      <Row className='m-5'>
        <Alert>Session is paused</Alert>
      </Row>
    </Container>);


  return (
    <Container>
      <Row>
        <Col md={2}><p>Connected: {"" + isConnected}</p></Col>
        <Col md={8} className="mx-auto my-auto">

          {slide && (
            <div>
              <h2>{slide.question}</h2>
              <Fade
                className="mt-3"
                tag="h5"
              >
                {answers && answers.map(({ id, value }) => (
                  <p key={id}>{value}</p>
                ))}
              </Fade>
            </div>
          )}
        </Col>
        <Col md={2}>
          <Button className='m-4 w-100' color='success' onClick={handelStart}>Play </Button>
          <Button className='m-4 w-100' color='success' onClick={handelShowAnswer}> Show answer </Button>
          <Button className='m-4 w-100' color='success' onClick={handelNext}> Next </Button>
          <Button className='m-4 w-100' color='success' onClick={handelPrevue}> Prevue </Button>
          <Button className='m-4 w-100' color='success' onClick={handelStop}> Stop </Button>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <p>attendeesCount: {"" + JSON.stringify(attendeesCount)}</p>

        </Col>
        <Col md={3}>
          Login Code <b>Free2022</b>
        </Col>
        <Col md={3}>
          <p>answerCount: {"" + answerCount}</p>

        </Col>
      </Row>
    </Container>
  )
}
export default Presentation;