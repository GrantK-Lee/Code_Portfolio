import PropTypes from 'prop-types';

const resumePropTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        notes: PropTypes.string,
        description: PropTypes.string,
        experience: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                employmentTypeId: PropTypes.string,
                companyName: PropTypes.string,
                locationId: PropTypes.string,
                IsCurrent: PropTypes.bool,
                dateStart: PropTypes.string,
                dateEnd: PropTypes.string,
                description: PropTypes.string,
            })
        ).isRequired,
        education: PropTypes.arrayOf(
            PropTypes.shape({
                institutionId: PropTypes.string,
                edProgramTypeId: PropTypes.string,
                specializationTypeId: PropTypes.string,
                dateStart: PropTypes.string,
                dateEnd: PropTypes.string,
                description: PropTypes.string,
                isGraduated: PropTypes.bool,
            })
        ),
        lookUpResults: PropTypes.arrayOf(PropTypes.shape({})),
    }),

    values: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        notes: PropTypes.string,
        description: PropTypes.string,
        experience: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                employmentTypeId: PropTypes.string,
                companyName: PropTypes.string,
                locationId: PropTypes.string,
                isCurrent: PropTypes.bool,
                dateStart: PropTypes.string,
                dateEnd: PropTypes.string,
                description: PropTypes.string,
            })
        ),
        education: PropTypes.arrayOf(
            PropTypes.shape({
                institutionId: PropTypes.string,
                edProgramTypeId: PropTypes.string,
                specializationTypeId: PropTypes.string,
                dateStart: PropTypes.string,
                dateEnd: PropTypes.string,
                description: PropTypes.string,
                isGraduated: PropTypes.bool,
            })
        ),
    }),

    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    nextLabel: PropTypes.string,
    backLabel: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    cantBack: PropTypes.bool.isRequired,
};

export { resumePropTypes };
