import React, { useEffect } from 'react';
import resumeExperienceSchema from '../../schema/resumes/resumeExperienceSchema';
import { withFormik, FieldArray, ErrorMessage } from 'formik';
import { Form, Card } from 'react-bootstrap';
import * as wizardPropTypes from './resumesPropTypes';
import debug from 'aquiferPE-debug';

const _logger = debug.extend('ResumeExperience');

const ResumeExperience = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
        onBack,
        backLabel,
        nextLabel,
        onNext,
        cantBack,
        onChange,
        lookUpResults,
    } = props;
  
    _logger(props, 'props');

    useEffect(() => {
        onChange(values);
    }, [values]);

    const mapEmploymentTypeId = (employmentType) => {
        return (
            <option key={parseInt(employmentType.id)} value={parseInt(employmentType.id)}>
                {employmentType.name}
            </option>
        );
    };

    const onNextClicked = () => {
        onNext(values);
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} className="p-1">
                <Card className="p-4 mx-auto res-card-width">
                    <Card.Header>
                        <h3 className="text-center">Experience</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group my-2">
                            <FieldArray
                                name="experience"
                                value={values.experience}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                render={({ push, remove }) => (
                                    <div>
                                        <label htmlFor="experiences" className="col-2">
                                            Experiences
                                        </label>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    title: '',
                                                    employmentTypeId: '',
                                                    companyName: '',
                                                    locationId: '',
                                                    isCurrent: true,
                                                    dateStart: '',
                                                    dateEnd: '',
                                                    description: '',
                                                    createdBy: lookUpResults.userId,
                                                    modifiedBy: lookUpResults.userId,
                                                })
                                            }>
                                            Add
                                        </button>
                                        {values.experience[0] && (
                                            <div className="form-group my-2">
                                                {values.experience &&
                                                    values.experience.map((experience, index) => (
                                                        <div className="row form-group my-2" key={index}>
                                                            <div className="row">
                                                                <div className="col-lg-3 my-2">
                                                                    <label htmlFor="jobTitle">Job Title</label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`experience[${index}].title`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Insert Job Title"
                                                                        className={`form-control`}
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].title`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="employmentType">Employment Type</label>
                                                                    <Form.Select
                                                                        name={`experience[${index}].employmentTypeId`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        className="form-control">
                                                                        <option>Select One</option>
                                                                        {lookUpResults.employmentTypes.map(mapEmploymentTypeId)}
                                                                    </Form.Select>
                                                                    <ErrorMessage name={`experience[${index}].employmentTypeId`} component="div" className="has-error" />
                                                                </div>

                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="dateStart">Start Date</label>
                                                                    <Form.Control
                                                                        name={`experience[${index}].dateStart`}
                                                                        type="date"
                                                                        value={values.experience[`${index}`].dateStart}
                                                                        onChange={handleChange}
                                                                        variant="outlined"
                                                                        className="form-control"
                                                                        placeholder="EX:01/01/1985"
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].dateStart`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="dateEnd">End Date</label>
                                                                    <Form.Control
                                                                        name={`experience[${index}].dateEnd`}
                                                                        type="date"
                                                                        value={values.experience[`${index}`].dateEnd}
                                                                        onChange={handleChange}
                                                                        variant="outlined"
                                                                        className="form-control"
                                                                        placeholder="EX:01/01/1985"
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].dateEnd`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-2 my-2" >
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        className="d-inline-block"
                                                                        name={`experience[${index}].isCurrent`}
                                                                        style={{ marginTop: '20px' }}
                                                                        value={`experience[${index}].isCurrent`}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <Form.Check.Label>Current Job</Form.Check.Label>
                                                                        <Form.Check.Input type="checkbox" name={`experience[${index}].isCurrent`} onChange={handleChange} />{' '}
                                                                    </Form.Check>
                                                                    <ErrorMessage name={`experience[${index}].isCurrent`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-1 my-2">
                                                                    <label htmlFor="blank"></label>
                                                                    <button
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        style={{ marginTop: '18px' }}
                                                                        onClick={() => remove(index)}>
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-3 my-2">
                                                                    <label htmlFor="companyName">Company Name</label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`experience[${index}].companyName`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Insert Company Name"
                                                                        className={`form-control `}
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].companyName`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="locationId">Location Id</label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`experience[${index}].locationId`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Insert Location Id"
                                                                        className={`form-control `}
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].locationId`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-5 my-2">
                                                                    <label htmlFor="jobTitle">Job Description</label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`experience[${index}].description`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Insert Job Description"
                                                                        className={`form-control `}
                                                                    />
                                                                    <ErrorMessage name={`experience[${index}].description`} component="div" className="has-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
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
                                    className="btn btn-primary ml-2"
                                    disabled={!values.experience[0] || Boolean(errors.experience)}
                                    onClick={onNextClicked}>
                                    {nextLabel}
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        </React.Fragment>
    );
};

ResumeExperience.propTypes = wizardPropTypes.resumePropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        experience: props.formData.experience,
    }),

    validationSchema: resumeExperienceSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(ResumeExperience);
