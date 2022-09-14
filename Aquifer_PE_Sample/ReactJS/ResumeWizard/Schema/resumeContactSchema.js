import * as Yup from 'yup';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const resumeContactValidation = Yup.object().shape({
    name: Yup.string().min(2).max(200).required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    phone: Yup.string()
        .min(10, 'Phone Number must be at least 10 characters')
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
    notes: Yup.string().max(50).required('Required'),
    description: Yup.string().max(50).required('Required'),
});

export default resumeContactValidation;
