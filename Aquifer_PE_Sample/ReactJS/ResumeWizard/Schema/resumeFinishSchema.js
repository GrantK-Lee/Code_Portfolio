import * as Yup from 'yup';

const resumeFinishValidation = Yup.object().shape({
    acceptCheck: Yup.bool().required('Must Accept Terms and Conditions'),
});

export default resumeFinishValidation;
