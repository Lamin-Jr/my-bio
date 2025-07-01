import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
});

export const profileSchema = Yup.object().shape({
    bio: Yup.string().max(500, 'Bio must be at most 500 characters'),
    experiences: Yup.array().of(
        Yup.object().shape({
            company: Yup.string().required('Company is required'),
            role: Yup.string().required('Role is required'),
            startDate: Yup.string().required('Start date is required')
        })
    ),
    skills: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Skill name is required')
        })
    )
});