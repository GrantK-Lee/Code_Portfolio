import * as Yup from 'yup';

const resumeEducationValidation = Yup.object().shape({
    education: Yup.array()
        .of(
            Yup.object().shape({
                institutionId: Yup.number().min(1).notOneOf(['']).required('Required'),
                edProgramTypeId: Yup.number().min(1).notOneOf(['']).required('Required'),
                specializationTypeId: Yup.number().min(1).notOneOf(['']).required('Required'),
                dateStart: Yup.date()
                    .notOneOf([null, '', new Date().setFullYear(0)])
                    .required('Required'),
                dateEnd: Yup.date()
                    .notOneOf([null, '', new Date().setFullYear(0)])
                    .required('Required'),
                description: Yup.string().min(2, 'Description must be at least 2 characters').max(200).required('Required'),
            })
        )
        .required(),
});

export default resumeEducationValidation;
