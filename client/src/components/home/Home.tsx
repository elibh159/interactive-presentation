import { Link } from "react-router-dom";
import {
    Container, Row, Col
} from "reactstrap";
import { LOGIN_CODE } from "../../constants";
import CardWrapper from "./CardWrapper";
import { data } from "./data";

const Home = () => {

    return (
        <Container className="mt-5">
            <Link className="m-5" to="/dashboard">Dashboard</Link>
            <Link className="m-5" to={'/presentation/' + LOGIN_CODE}>Presentation</Link>
            <Link className="m-5" to={'/attendee/' + LOGIN_CODE}>Attendee</Link>
            <Link className="m-5" to={'/trading'}>Trading</Link>
            <Row className="mt-5 mb-5">
                {data.map(({ header, title, link, content, id }) => (
                    <Col md={4} key={id}>
                        <CardWrapper content={content} header={header} id={id} link={link + LOGIN_CODE} title={title} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;