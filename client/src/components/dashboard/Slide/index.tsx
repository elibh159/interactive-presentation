import { Container, Col, Row } from 'reactstrap';
import SlidesList from './SlidesList';
import CreateSlide from './CreateSlide';

const Slide = () => {
    return (
        <Container>
            <Row>
                <Col md="6">
                    <SlidesList />
                </Col>
                <Col md="6">
                    <CreateSlide />
                </Col>
            </Row>
        </Container>
    )
}

export default Slide;