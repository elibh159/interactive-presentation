import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Spinner } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { SlideState } from '../../../Interfaces/slideInterface';
import { createSlide } from "../../../store/slide/create/slideCreateAction";
import { getSlides } from "../../../store/slide/list/slidesAction";
import SlideForm from "./SlideForm";

type Props = {}

const CreateSlide = (props: Props) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        question: "",
        priority: 5,
        options: [],
    });
    const slideCreate: SlideState = useAppSelector((state) => state.slideCreate);
    const { isLoading, error, data } = slideCreate;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        var value;
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        } else if (event.target.type === 'number') {
            value = +event.target.value;
        } else {
            value = event.target.value;
        }

        const data = {
            ...formData,
            [name]: value
        };

        setFormData(data);
    };
    function handelSubmit() {
        dispatch(createSlide(formData));
    }
    useEffect(() => {
        if (data && data?.id) {
            setFormData({
                question: "",
                priority: data.priority + 1,
                options: [],
            })
            dispatch(getSlides());
        }
    }, [data]);


    if (isLoading) {
        return (
            <Container>
                <Row>
                    <Col>
                        <Spinner
                            color="primary"
                            type="grow"
                        >
                            Loading...
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        )
    }
    return (
        <Container>
            <Row>
                <Col className="my-auto">
                    <SlideForm
                        onSubmit={handelSubmit}
                        onChange={handleChange}
                        values={formData}
                        buttonText="Add"
                    />
                    {error && <Alert color="alert">{error.message}</Alert>}
                </Col>
            </Row>
        </Container>
    )
}
export default CreateSlide;