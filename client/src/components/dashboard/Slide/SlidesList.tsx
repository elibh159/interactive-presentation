import { useEffect } from 'react';
import {
    Container, Row, Card, CardBody, CardTitle,
    CardText, Button, Col, Spinner
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { Slide, SlideListState } from '../../../Interfaces/slideInterface'
import { deleteSlide } from '../../../store/slide/delete/slideDeleteAction';
import { getSlides } from '../../../store/slide/list/slidesAction';
import { SLIDE_LIST_RESET } from '../../../store/slide/list/types';

const SlidesList = () => {
    const slideState: SlideListState = useAppSelector<SlideListState>(state => state.slides);
    const slides: Slide[] | [] = slideState.data;
    const dispatch = useAppDispatch();
    const { isLoading: Loading, error } = slideState;
    useEffect(() => {
        dispatch({ type: SLIDE_LIST_RESET });
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSlides());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteSlide(id));
        dispatch(getSlides());
    }

    if (Loading) {
        return (
            <div>
                <Spinner
                    color="primary"
                    type="grow"
                >
                    Loading...
                </Spinner>
            </div>
        )
    }
    if (error) {
        return (
            <p>{error.message}</p>
        )
    }
    if (!slides) {
        return (
            <div>SlidesList is empty</div>
        )
    }
    return (
        <Container>
            <Row >

                {slides.map((item) => (
                    <Col key={item.id} md="8">
                        <Card body
                            className="my-2"
                            style={{
                                width: '18rem'
                            }}>
                            <CardBody>
                                <CardTitle>
                                    Slide {item.priority}
                                </CardTitle>
                                <CardText>
                                    {item.question}
                                </CardText>
                                <Button onClick={() => handleDelete(item.id)} size="small" color="primary" className='m-2'>
                                    delete
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
};

export default SlidesList;