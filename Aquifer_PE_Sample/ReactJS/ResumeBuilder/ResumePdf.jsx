import React from 'react';
import PropTypes from 'prop-types';
import DynamicPdfCreator from '../../pages/dynamicpdf/DynamicPdfCreator';
import debug from 'aquiferPE-debug';

const _logger = debug.extend('ResumePDF');

const ResumePdf = (props) => {
    const pdfObj = props.pdfData;

    _logger('PDF OBJECT', pdfObj)
    _logger('PDF OBJECT NAME', pdfObj.name)

    const pdfStyleObj = {
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        text: {
            //margin: 12,
            fontSize: 14,
            textAlign: 'left',
        },
        title: {
            fontSize: 17,
            textAlign: 'left',
        },
    };

    const pdfContentData = {
        pages: [
            [
                {
                    type: 'Title',
                    content: pdfObj.name,
                },
                {
                    type: 'Text',
                    content: pdfObj.description,
                },
                {
                    type: 'Title',
                    content: `          `,
                },
                {
                    type: 'Title',
                    content: 'Skills',
                },
                {
                    type: 'Text',
                    content: `${pdfObj.skillSets[0].skill}, ${pdfObj.skillSets[1].skill}`,
                },
                {
                    type: 'Title',
                    content: `          `,
                },
                {
                    type: 'Title',
                    content: `Experience`,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.experiences[0].title} - ${pdfObj.experiences[0].employmentType}`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.experiences[0].companyName}[${pdfObj.experiences[0].city}, ${pdfObj.experiences[0].zip}]`,
                },
                {
                    type: 'Text',
                    content: ` `,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.experiences[1].title} - ${pdfObj.experiences[1].employmentType}`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.experiences[1].companyName}[${pdfObj.experiences[1].city}, ${pdfObj.experiences[1].zip}]`,
                },
                {
                    type: 'Text',
                    content: ` `,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.experiences[2].title} - ${pdfObj.experiences[2].employmentType}`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.experiences[2].companyName} [${pdfObj.experiences[2].city}, ${pdfObj.experiences[2].zip}]`,
                },
                {
                    type: 'Title',
                    content: `          `,
                },
                {
                    type: 'Title',
                    content: `Education`,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.educationHistory[0].institution} [${pdfObj.educationHistory[0].startDate.substr(5, 2)}/${pdfObj.educationHistory[0].startDate.substr(0, 4)} - ${pdfObj.educationHistory[0].endDate.substr(5, 2)}/${pdfObj.educationHistory[0].endDate.substr(0, 4)}]`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.educationHistory[0].specialization} - ${pdfObj.educationHistory[0].educationProgramType}`,
                },
                {
                    type: 'Text',
                    content: ` `,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.educationHistory[1].institution} [${pdfObj.educationHistory[1].startDate.substr(5, 2)}/${pdfObj.educationHistory[1].startDate.substr(0, 4)} - ${pdfObj.educationHistory[1].endDate.substr(5, 2)}/${pdfObj.educationHistory[1].endDate.substr(0, 4)}]`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.educationHistory[1].specialization} - ${pdfObj.educationHistory[1].educationProgramType}`,
                },
                {
                    type: 'Text',
                    content: ` `,
                },
                {
                    type: 'Text',
                    content: `• ${pdfObj.educationHistory[2].institution} [${pdfObj.educationHistory[2].startDate.substr(5, 2)}/${pdfObj.educationHistory[2].startDate.substr(0, 4)} - ${pdfObj.educationHistory[2].endDate.substr(5, 2)}/${pdfObj.educationHistory[2].endDate.substr(0, 4)}]`,
                },
                {
                    type: 'Text',
                    content: `${pdfObj.educationHistory[2].specialization} - ${pdfObj.educationHistory[2].educationProgramType}`,
                },
            ],
        ],
    };

    const myPdfDoc = (
        <DynamicPdfCreator
            pdfContent={pdfContentData}
            pdfStyle={pdfStyleObj}
            fileName={`TestResumePDF`}
        />
    );

    return (
        <div>{myPdfDoc}</div>
    );
};

ResumePdf.propTypes = {
    pdfData: PropTypes.shape({
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
            freelanceGoal: PropTypes.string.isRequired,
        }),
        skillSets: PropTypes.shape({
            id: PropTypes.number.isRequired,
            skill: PropTypes.string.isRequired,
        }),
        resumeFileId: PropTypes.number.isRequired,
    }),
};

export default ResumePdf;
