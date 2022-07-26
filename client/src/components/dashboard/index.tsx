import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import Slide from './Slide';

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2> Dashboard- Manage Slides</h2>
        </Col>
        <Col md={6}>
          <Link className="m-5" to="/">Back to home page</Link>

        </Col>

      </Row>
      <Row>
        <Col className="mt-5">
          <Slide />
        </Col>
      </Row>
    </Container>
  )
}
export default Dashboard;