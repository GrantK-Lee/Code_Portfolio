import React, { useEffect } from 'react';
import resumeEducationSchema from '../../schema/resumes/resumeEducationSchema';
import { withFormik, FieldArray, ErrorMessage } from 'formik';
import { Form, Card } from 'react-bootstrap';
import * as wizardPropTypes from './resumesPropTypes';
import debug from 'aquiferPE-debug';

const _logger = debug.extend('ResumeEducation');

const ResumeEducation = (props) => {

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

    const mapInstitution = (institution) => {
        return (
            <option key={institution.id} value={institution.id}>
                {institution.name}
            </option>
        );
    };

    const mapEdProgramType = (edProgramType) => {
        return (
            <option key={edProgramType.id} value={edProgramType.id}>
                {edProgramType.name}
            </option>
        );
    };

    const mapSpecializationType = (specilizationType) => {
        return (
            <option key={specilizationType.id} value={specilizationType.id}>
                {specilizationType.name}
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
                        <h3 className="text-center">Education</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group my-2">
                            <FieldArray
                                name="education"
                                value={values.education}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                render={({ push, remove }) => (
                                    <div>
                                        <label htmlFor="educations" className="col-2">
                                            Education
                                        </label>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    institutionId: '',
                                                    edProgramTypeId: '',
                                                    specializationTypeId: '',
                                                    dateStart: '',
                                                    dateEnd: '',
                                                    description: '',
                                                    isGraduated: true,
                                                    createdBy: lookUpResults.userId,
                                                    modifiedBy: lookUpResults.userId,
                                                })
                                            }>
                                            Add
                                        </button>
                                        {values.education[0] && (
                                            <div className="form-group my-2">
                                                {values.education &&
                                                    values.education.map((education, index) => (
                                                        <div className="row form-group my-2" key={index}>
                                                            <div className="row">
                                                                <div className="col-lg-3 my-2">
                                                                    <label htmlFor="institution">Institution</label>
                                                                    <Form.Select
                                                                        name={`education[${index}].institutionId`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        className="form-control">
                                                                        <option>Select One</option>
                                                                        {lookUpResults.institution.map(mapInstitution)}
                                                                    </Form.Select>
                                                                    <ErrorMessage name={`education[${index}].institutionId`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-3  my-2">
                                                                    <label htmlFor="employmentType">Education Program Type</label>
                                                                    <Form.Select
                                                                        name={`education[${index}].edProgramTypeId`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        className="form-control">
                                                                        <option>Select One</option>
                                                                        {lookUpResults.edProgramTypes.map(mapEdProgramType)}
                                                                    </Form.Select>
                                                                    <ErrorMessage name={`education[${index}].edProgramTypeId`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-3 my-2">
                                                                    <label htmlFor="jobTitle">Specialization Type</label>
                                                                    <Form.Select
                                                                        name={`education[${index}].specializationTypeId`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        className="form-control">
                                                                        <option>Select One</option>
                                                                        {lookUpResults.specializationTypes.map(mapSpecializationType)}
                                                                    </Form.Select>
                                                                    <ErrorMessage name={`education[${index}].specializationTypeId`} component="div" className="has-error" />
                                                                </div>

                                                                <div className="col-lg-2 my-2" >
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        className="d-inline-block"
                                                                        name={`education[${index}].isGraduated`}
                                                                        style={{ marginTop: '20px' }}
                                                                        value={`education[${index}].isGraduated`}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <Form.Check.Label>Graduated</Form.Check.Label>
                                                                        <Form.Check.Input type="checkbox" name={`education[${index}].isGraduated`} onChange={handleChange} />{' '}
                                                                    </Form.Check>
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
                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="dateStart">Start Date</label>
                                                                    <Form.Control
                                                                        name={`education[${index}].dateStart`}
                                                                        type="date"
                                                                        value={values.education[`${index}`].dateStart}
                                                                        onChange={handleChange}
                                                                        variant="outlined"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage name={`education[${index}].dateStart`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-2 my-2">
                                                                    <label htmlFor="dateEnd">End Date</label>
                                                                    <Form.Control
                                                                        name={`education[${index}].dateEnd`}
                                                                        type="date"
                                                                        value={values.education[`${index}`].dateEnd}
                                                                        onChange={handleChange}
                                                                        variant="outlined"
                                                                        className="form-control"
                                                                        placeholder="EX:01/01/1985"
                                                                    />
                                                                    <ErrorMessage name={`education[${index}].dateEnd`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-5 my-2">
                                                                    <label htmlFor="description">Description</label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`education[${index}].description`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Insert Program Description"
                                                                        className={`form-control`}
                                                                    />
                                                                    <ErrorMessage name={`education[${index}].description`} component="div" className="has-error" />
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
                                    disabled={!values.education[0] || Boolean(errors.education)}
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


ResumeEducation.propTypes = wizardPropTypes.resumePropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        education: props.formData.education,
    }),

    validationSchema: resumeEducationSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(ResumeEducation);
