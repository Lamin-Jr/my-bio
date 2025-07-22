import {Button} from '@/components/ui/Button';
import {Mail, Lock} from 'lucide-react';
import {Link, useLocation, useNavigate} from 'react-router';
import * as Yup from 'yup';
import {FormIndex} from "@components/forms/FormIndex.tsx";
import {useAuth} from "@hooks/useAuth.ts";
import {useEffect} from "react";
import {LoginFormLayout} from "@components/forms/login/LoginFormLayOut.tsx";
import {CustomInput} from "@utils/form/custom/CustomInput.tsx";

interface LoginValues {
    email: string;
    password: string;
}

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

interface LocationState {
    from?: { pathname: string };
}

export const LoginForm = () => {
    const {signIn, loading, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as LocationState)?.from?.pathname || '/';



    const handleSubmit = async (values: LoginValues) => {
        await signIn(values);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    return (
        <LoginFormLayout
            title={"Log in to your account"}
            submitText={"Login"}
            subtitle={'Enter your credentials to access the admin dashboard'}
        >
            <FormIndex<LoginValues>
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
                validationSchema={loginSchema}
            >
                <div className="space-y-6">
                    <CustomInput
                        name="email"
                        label="Email address"
                        type="email"
                        icon={<Mail className="w-5 h-5"/>}
                        placeholder="you@example.com"
                    />

                    <CustomInput
                        name="password"
                        label="Password"
                        type="password"
                        icon={<Lock className="w-5 h-5"/>}
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={loading}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </FormIndex>
        </LoginFormLayout>
    );
};