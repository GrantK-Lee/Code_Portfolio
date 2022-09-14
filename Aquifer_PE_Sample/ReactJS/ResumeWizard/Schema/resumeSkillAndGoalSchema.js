import * as Yup from 'yup';

const resumeSkillAndGoalValidation = Yup.object().shape({
    freelanceGoalType: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(1).notOneOf(['']).required('Required'),
            })
        )
        .required(),
    skill: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(1).notOneOf(['']).required('Required'),
            })
        )
        .required(),
});

export default resumeSkillAndGoalValidation; 
