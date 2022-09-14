import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as resumeService from '../../services/resumeService';
import debug from 'aquiferPE-debug';
import './resumeBuilder.css';
import toastr from 'toastr';
import { Button, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import ResumePdf from './ResumePdf';

const _logger = debug.extend('ResumeBuildPage');

function ResumeBuilder() {
    const [formData, setResumeData] = useState({
        resumeUser: [],
        resumeFreelance: [],
        resumeGoals: [],
        resumeSkills: [],
        resumeExperience: [],
        resumeEducation: [],
    });

    const [entry, setEntry] = useState([]);
    const [goals, setGoals] = useState([]);
    const [pdfDataSet, setPdfDataSet] = useState([]);

    const toggle = () => {
        let threeGoals = [];
        if (entry.length === 3) {
            threeGoals = [entry[2][0].label, entry[2][1].label, entry[2][2].label];
        } else {
            threeGoals = ['Select', 'Three', 'Goals'];
        }
        setGoals(threeGoals.map(mapGoal));

        setPdfDataSet((prevState) => {
            let pdf = { ...prevState };
            pdf = formData.resumeUser;
            _logger('pdfData', pdf);
            return pdf;
        });

    };

    const downloadPDF = () => {
        if (pdfDataSet.name === undefined) {
            _logger('pdfData Undefined');
            return;
        } else {
            _logger('pdfDataUpdated', pdfDataSet);
            return <div><ResumePdf pdfData={pdfDataSet} /></div>;
        }
    };

    const recordGoal = (selection) => {
        let entryList = [...entry, selection];
        setEntry(entryList);
        if (entry.length > 3) {
            wipeGoals();
        }
    };

    const wipeGoals = () => {
        setEntry([]);
        setGoals([]);
        _logger('Goals Deleted');
    }

    useEffect(() => {
        resumeService.getResume(25).then(onGetSuccess).catch(onGetError);
    }, []);

    const onGetSuccess = (response) => {
        _logger('response', response);
        let resumeById = response.item;

        setResumeData((prevState) => {
            const rd = { ...prevState };
            rd.resumeUser = resumeById;
            rd.resumeFreelance = resumeById.freelanceGoalTypes.map(mapDropdown);
            rd.resumeGoals = resumeById.freelanceGoalTypes.map((goal) => (
                {
                    value: goal.id,
                    label: goal.freelanceGoal
                }
            ));
            rd.resumeSkills = resumeById.skillSets.map(mapSkill);
            rd.resumeExperience = resumeById.experiences.map(mapExp);
            rd.resumeEducation = resumeById.educationHistory.map(mapEdu);
            _logger('freelancegoals', rd.resumeFreelance);
            return rd;
        });
    };

    const onGetError = (err) => {
        toastr.error('Unknown error has occured');
        _logger('error', err);
    };

    const mapGoal = (goal) => {
        return (
            <div>
                {goal}
            </div>
        );
    };

    const mapSkill = (skill) => {
        return (
            <div>
                {skill.skill}
            </div>
        );
    };

    const mapExp = (exp) => {
        return (
            <div>
                <div>
                    <p className='resume-category-sub-title'>
                        {exp.title}
                    </p>
                </div>
                <p className='resume-base-text'>
                    {exp.companyName} <br />
                    {exp.employmentType} <br />
                    {exp.city} <br />
                    {exp.zip} <br />
                    {jobToString(exp.isCurrentJob)}
                </p>
            </div>
        );
    };

    const jobToString = (bool) => {
        if (bool) {
            return "Current Job"
        }
        else {
            return "Past Job";
        }
    };

    const mapEdu = (edu) => {
        return (
            <div>
                <p className='resume-category-sub-title'>
                    {edu.institution}
                </p>
                <p className='resume-base-text'>
                    {edu.educationProgramType} <br />
                    {edu.specialization} --- {edu.startDate.substr(5, 2)}/{edu.startDate.substr(0, 4)} - {edu.endDate.substr(5, 2)}/{edu.endDate.substr(0, 4)} <br />
                    {edu.description}
                </p>
            </div>
        );
    };

    _logger('test format', formData.resumeUser);

    const mapDropdown = (dropdown) => {
        return (
            <Dropdown.Item eventKey={dropdown.freelanceGoal}>{dropdown.freelanceGoal}</Dropdown.Item >
        )
    };

    return (
        <React.Fragment>
            <div className='container resume-build-container'>
                <div>
                    <div className='row' show={toggle}>
                        <div className='col-lg-4'>
                        </div>
                        <div className='col-lg-5' style={{ paddingRight: '1px' }}>
                            <Select
                                isMulti={true}
                                options={formData.resumeGoals}
                                onChange={recordGoal}
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder="Pick three goals to display">
                            </Select>
                        </div>
                        <div className='col-lg-1' style={{ paddingLeft: '1px' }}>
                            <Button className="btn-icon freelance-settings-icon" onClick={toggle} variant='primary' >
                                Submit
                            </Button>
                        </div>
                        <div className='col-lg-2' style={{ paddingLeft: '86px', paddingRight: '0px' }}>
                            {downloadPDF()}
                        </div>
                    </div>
                </div>
                <div className='card resume-build-card'>
                    <div className='resume-intro-box'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <h1 style={{ marginBottom: '0px', fontWeight: 'bold', color: 'black' }}>
                                    {formData.resumeUser.name}
                                </h1>
                                <p className='text-muted font-14 rmb-0'>{formData.resumeUser.description}</p>
                            </div>
                            <div className='col-lg-5'>
                                <div className='row'>
                                    <div className='col freelance-card'>
                                        Freelance Goals
                                    </div>
                                </div>
                                <div className='resume-base-text'>
                                    {goals}
                                </div>
                            </div>
                            <div className='col-lg-1' />
                            <div className='col-lg-2'>
                                <p className='freelance-card'>
                                    Contact Information
                                </p>
                                <div className='resume-base-text'>
                                    {formData.resumeUser.email} <br />
                                    {formData.resumeUser.phoneNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='resume-subcategory' style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <h1 className='resume-build-sub-header'>
                            Skills
                        </h1>
                        <hr className='resume-build-divider' />
                        <div className='resume-base-text'>
                            {formData.resumeSkills}
                        </div>
                    </div>
                    <div className='resume-subcategory'>
                        <h1 className='resume-build-sub-header'>
                            Experience
                        </h1>
                        <hr className='resume-build-divider' />
                        {formData.resumeExperience}
                    </div>
                    <div className='resume-subcategory'>
                        <h1 className='resume-build-sub-header'>
                            Education
                        </h1>
                        <hr className='resume-build-divider' />
                        <div>
                            {formData.resumeEducation}
                        </div >
                    </div >
                </div>
            </div >
        </React.Fragment >
    );
}

ResumeBuilder.propTypes = {
    resume: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        experiences: PropTypes.shape({
            title: PropTypes.string.isRequired,
            employmentTypeId: PropTypes.number.isRequired,
            employmentType: PropTypes.string.isRequired,
            locationId: PropTypes.number.isRequired,
            companyName: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            zip: PropTypes.string.isRequired,
            isCurrentJob: PropTypes.bool.isRequired,
        }),
        educationHistory: PropTypes.shape({
            institutionId: PropTypes.number.isRequired,
            institution: PropTypes.string.isRequired,
            educationProgramId: PropTypes.number.isRequired,
            educationProgramType: PropTypes.string.isRequired,
            specializationTypeId: PropTypes.number.isRequired,
            specialization: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        freelanceGoalTypes: PropTypes.shape({
            id: PropTypes.number.isRequired,
            skill: PropTypes.string.isRequired,
        }),
        skillsets: PropTypes.shape({
            id: PropTypes.number.isRequired,
            freelanceGoal: PropTypes.string.isRequired,
        }),
        resumeFileId: PropTypes.number.isRequired,
    }),
};

export default ResumeBuilder; 
