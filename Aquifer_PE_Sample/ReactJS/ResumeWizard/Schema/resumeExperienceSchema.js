import * as Yup from 'yup';

const resumeExperienceValidation = Yup.object().shape({
    experience: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().min(1).notOneOf(['']).required('Required'),
                employmentTypeId: Yup.number().min(1).notOneOf(['']).required('Required'),
                companyName: Yup.string().min(2).max(50).required('Required'),
                locationId: Yup.number('Location ID must be a number').min(1, 'Location ID must be a number').max(50).required('Required'),
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

export default resumeExperienceValidation;
