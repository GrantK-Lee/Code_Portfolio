import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import { Form, Card } from 'react-bootstrap';
import * as wizardPropTypes from './resumesPropTypes';
import { BsCheck2All } from 'react-icons/bs';
import resumeFinishValidation from '../../schema/resumes/resumeFinishSchema';

const ResumeFinish = (props) => {
    const { values, isSubmitting, handleSubmit, onBack, backLabel, nextLabel, onNext, cantBack } = props;

    useEffect(() => {
        onChange();
    }, [values]);

    const [terms, setTerms] = useState(false);

    const termsHandler = () => {
        setTerms(!terms);
    };

    const onChange = () => {
        props.onChange(values);
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} className="p-1">
                <Card className="p-4 mx-auto res-card-width">
                    <Card.Header>
                        <h3 className="text-center">Almost Done!</h3>
                    </Card.Header>
                    <div className="form-group mt-2">
                        <div className="text-center">
                            <p>Review your Resume.</p>

                            <div className="mb-3">
                                <Form.Check type="checkbox" className="d-inline-block" name="acceptCheck">
                                    <Form.Check.Input type="checkbox" value={terms} onChange={termsHandler} />{' '}
                                    <Form.Check.Label>I have reviewed my resume</Form.Check.Label>
                                    <h2 className="mt-0">
                                        <BsCheck2All />
                                    </h2>
                                </Form.Check>
                            </div>
                        </div>

                        <div className="button-group pt-3 row">
                            <div className="col-sm-1">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onBack}
                                    disabled={isSubmitting || cantBack}>
                                    {backLabel}
                                </button>
                            </div>
                            <div className="col-sm-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!terms}
                                    onClick={onNext}>
                                    {nextLabel}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Form>
        </React.Fragment>
    );
};

ResumeFinish.propTypes = wizardPropTypes.resumePropTypes;

export default withFormik({
    validationSchema: resumeFinishValidation,
    mapPropsToValues: (props) => ({
        ...props.formData,
    }),
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(ResumeFinish);
