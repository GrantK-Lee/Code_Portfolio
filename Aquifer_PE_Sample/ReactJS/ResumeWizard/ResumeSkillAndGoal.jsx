import React, { useEffect } from 'react';
import ResumeSkillAndGoalSchema from '../../schema/resumes/resumeSkillAndGoalSchema';
import { withFormik, FieldArray, ErrorMessage } from 'formik';
import { Form, Card } from 'react-bootstrap';
import * as wizardPropTypes from './resumesPropTypes';
import debug from 'aquiferPE-debug';

const _logger = debug.extend('ResumeSkillAndGoal');

const ResumeSkillAndGoal = (props) => {

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
    } = props;

    _logger(props, 'props');

    useEffect(() => {
        onChange(values);
    }, [values]);

    const onNextClicked = () => {
        onNext(values);
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} className="p-1">
                <Card className="p-4 mx-auto res-card-width">
                    <Card.Header>
                        <h3 className="text-center">Skills and Freelance Goal Types</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group my-2">
                            <FieldArray
                                name="freelanceGoalType"
                                value={values.freelanceGoalType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                render={({ push, remove }) => (
                                    <div>
                                        <label htmlFor="educations" className="col-3">
                                            Enter 3+ Freelance Goals
                                        </label>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    name: '',
                                                })
                                            }>
                                            Add
                                        </button>
                                        {values.freelanceGoalType[0] && (
                                            <div className="form-group my-2">
                                                {values.freelanceGoalType &&
                                                    values.freelanceGoalType.map((freelanceGoalType, index) => (
                                                        <div className="row form-group " key={index}>
                                                            <div className="row">
                                                                <div className="col-lg-5 my-2">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`freelanceGoalType[${index}].name`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Enter Freelance Goal"
                                                                        className={`form-control`}
                                                                    />
                                                                    <ErrorMessage name={`freelanceGoalType[${index}].name`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-1 my-2">
                                                                    <label htmlFor="blank"></label>
                                                                    <button
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        style={{ marginTop: '2px' }}
                                                                        onClick={() => remove(index)}>
                                                                        X
                                                                    </button>
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
                        <div className="form-group my-2">
                            <FieldArray
                                name="skill"
                                value={values.skill}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                render={({ push, remove }) => (
                                    <div>
                                        <label htmlFor="skill" className="col-3">
                                            Enter 3+ Skills
                                        </label>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    name: '',
                                                })
                                            }>
                                            Add
                                        </button>
                                        {values.skill[0] && (
                                            <div className="form-group my-2">
                                                {values.skill &&
                                                    values.skill.map((skill, skillIndex) => (
                                                        <div className="row form-group " key={skillIndex}>
                                                            <div className="row">
                                                                <div className="col-lg-5 my-2">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows={1}
                                                                        name={`skill[${skillIndex}].name`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        variant="outlined"
                                                                        placeholder="Enter skill"
                                                                        className={`form-control`}
                                                                    />
                                                                    <ErrorMessage name={`skill[${skillIndex}].name`} component="div" className="has-error" />
                                                                </div>
                                                                <div className="col-lg-1 my-2">
                                                                    <label htmlFor="blank"></label>
                                                                    <button
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        style={{ marginTop: '2px' }}
                                                                        onClick={() => remove(skillIndex)}>
                                                                        X
                                                                    </button>
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
                                    disabled={
                                        !values.skill[2] ||
                                        Boolean(errors.skill) ||
                                        !values.freelanceGoalType[2] ||
                                        Boolean(errors.freelanceGoalType)
                                    }
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


ResumeSkillAndGoal.propTypes = wizardPropTypes.resumePropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        freelanceGoalType: props.formData.freelanceGoalType,
        skill: props.formData.skill,
    }),

    validationSchema: ResumeSkillAndGoalSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(ResumeSkillAndGoal);
