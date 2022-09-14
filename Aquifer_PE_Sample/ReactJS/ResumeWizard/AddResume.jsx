import React, { useState, useEffect } from 'react';
import Loki from 'react-loki';
import debug from 'aquiferPE-debug';
import { FaPhoneSquareAlt, FaPenSquare, FaBook, FaClipboardCheck, FaBrain } from 'react-icons/fa';
import ResumeFinish from './ResumeFinish';
import ResumeContact from './ResumeContact';
import ResumeExperience from './ResumeExperience';
import ResumeEducation from './ResumeEducation';
import ResumeSkillAndGoal from './ResumeSkillAndGoal';
import * as resumeServices from '../../services/resumeService';
import swal from '@sweetalert/with-react';
import './resume.css';
import lookUpService from '../../services/lookUpService';
import toastr from 'toastr';
import userService from '../../services/userService';

const _logger = debug.extend('resumeAdd');

function AddResume() {
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
        resumeFileId: 8,
        createdBy: '',
        modifiedBy: '',
        experience: [],
        education: [],
        freelanceGoalType: [],
        skill: [],
    }
    );

    const [lookUpResults, setLookUpResults] = useState({ //Using for Dropdown. All good
        institution: [],
        edProgramTypes: [],
        specializationTypes: [],
        employmentTypes: [],
        userId: '',
    });
    _logger('LOOK UP RESULTS', lookUpResults);

    useEffect(() => {
        lookUpService
            .LookUp(['Institution', 'EdProgramTypes', 'SpecializationTypes', 'EmploymentTypes'])
            .then(onSuccessLookUp)
            .catch(onErrorLookup);
        userService
            .currentV2()
            .then(onSuccessUserId)
            .catch(onErrorUserId);
    }, []);

    const onSuccessLookUp = (response) => {
        _logger('Success Look Up', response);
        if (response.item.institution || response.item.edProgramTypes || response.item.specializationTypes || response.item.employmentTypes) {
            setLookUpResults((prevState) => {
                let result = { ...prevState };
                result.institution = response.item.institution;
                result.edProgramTypes = response.item.edProgramTypes;
                result.specializationTypes = response.item.specializationTypes;
                result.employmentTypes = response.item.employmentTypes;
                return result;
            });
        }
    };

    const onErrorLookup = (err) => {
        _logger('Get Lookup error', err);
        toastr.error('Error getting lookup data.');
    };

    const onSuccessUserId = (response) => {
        _logger("Current User ID", response.item.id);
        setLookUpResults((prevState) => {
            let result = { ...prevState };
            result.userId = response.item.id;
            return result;
        });
    };
    const onErrorUserId = (err) => {
        _logger('Get Lookup error', err);
    };

    const onChange = (values) => { //good
        setFormData((prevState) => {
            const sd = { ...prevState, ...values };
            return sd;
        });
    };

    const onFinish = () => { //good
        _logger('Finish button clicked', formData);

        const resumePayload = {
            description: formData.description,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            notes: formData.notes,
            resumeFileId: formData.resumeFileId,
            experiences: formData.experience.map((exp) => (
                {
                    title: exp.title,
                    employmentTypeId: parseInt(exp.employmentTypeId),
                    companyName: exp.companyName,
                    locationId: parseInt(exp.locationId),
                    isCurrent: exp.isCurrent,
                    dateStart: exp.dateStart,
                    dateEnd: exp.dateEnd,
                    description: exp.description,
                }
            )),
            educations: formData.education.map((edu) => (
                {
                    institutionId: parseInt(edu.institutionId),
                    edProgramTypeId: parseInt(edu.edProgramTypeId),
                    specializationTypeId: parseInt(edu.specializationTypeId),
                    dateStart: edu.dateStart,
                    dateEnd: edu.dateEnd,
                    description: edu.description,
                    isGraduated: edu.isGraduated,
                }
            )),
            skills: formData.skill.map((skl) => (skl.name)),
            freelanceGoals: formData.freelanceGoalType.map((gol) => (gol.name)),
        }

        _logger('Resume Payload', resumePayload);

        resumeServices.add(resumePayload).then(onAddResumeSuccess).catch(onAddResumeError);
    };

    const onAddResumeSuccess = (response) => { //good
        _logger(response, 'onAddResumeSuccess');

        swal({
            position: 'top-end',
            icon: 'success',
            title: 'Your resume was successfully created!',
            showConfirmButton: false,
            timer: 5000,
        });
    };

    const onAddResumeError = (error) => { //good
        _logger(error, 'Could not add Resume');

        swal({
            buttons: {
                cancel: 'Ok',
            },
            title: 'Resume not added, try again.',
            icon: 'error',
        });
    };

    const resumeWizard = [
        {
            label: 'Step 1',
            icon: <FaPhoneSquareAlt className="mt-2 text-center" />,
            component: <ResumeContact formData={formData} onChange={onChange} />,
        },
        {
            label: 'Step 2',
            icon: <FaPenSquare className="mt-2 text-center" />,
            component: <ResumeExperience formData={formData} onChange={onChange} lookUpResults={lookUpResults} />,
        },
        {
            label: 'Step 3',
            icon: <FaBook className="mt-2 text-center" />,
            component: <ResumeEducation formData={formData} onChange={onChange} lookUpResults={lookUpResults} />,
        },
        {
            label: 'Step 4',
            icon: <FaBrain className="mt-2 text-center" />,
            component: <ResumeSkillAndGoal formData={formData} onChange={onChange} />,
        },
        {
            label: 'Step 5',
            icon: <FaClipboardCheck className="mt-2" />,
            component: <ResumeFinish formData={formData} onChange={onChange} />,
        },
    ];

    return (
        <React.Fragment>
            <div className="resumeWizard">
                <Loki steps={resumeWizard} onNext={onChange} onBack={onChange} onFinish={onFinish} noActions />
            </div>
        </React.Fragment>
    );
}

export default AddResume;
