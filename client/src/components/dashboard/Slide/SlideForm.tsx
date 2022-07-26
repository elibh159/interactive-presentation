import { Formik, Form, ErrorMessage } from "formik";
import { validationSchema } from "./validationSchema";
import { TextError } from "../../../helper/TextError";
import { SlideFormProps } from "../../../Interfaces/slideInterface";
import { FormGroup, Label, Input, Button, Col, Row } from "reactstrap";

const SlideForm = ({ onSubmit, onChange, buttonText, values }: SlideFormProps) => {
    return (

        <Formik
            validationSchema={validationSchema}
            initialValues={values}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form noValidate autoComplete="off">
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="question">
                                Question
                            </Label>
                            <Input
                                id="exampleText"
                                type="textarea"
                                data-testid='question-input'
                                onChange={onChange}
                                value={values.question}
                                name='question'
                            />
                        </FormGroup>
                        <ErrorMessage
                            name="question"
                            component={TextError}
                            className="invalid-feedback"
                        />
                    </Col>
                    <Col md={12}>
                        <Label for="priority">
                            Priority
                        </Label>
                        <Input
                            data-testid='priority-input'
                            type='number'
                            onChange={onChange}
                            value={+values.priority}
                            name='priority'
                        />
                        <ErrorMessage
                            name="priority"
                            component={TextError}
                            className="invalid-feedback"
                        />
                    </Col>
                    <Col md={12}>
                        <Button type="submit" className="m-2 primary">{buttonText}</Button>
                    </Col>
                </Row>
            </Form>
        </Formik>
    );
};

export default SlideForm;