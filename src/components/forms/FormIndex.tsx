import {Formik, Form, FormikHelpers} from 'formik';
import {ReactNode} from 'react';

interface FormikFormProps<T> {
    initialValues: T;
    onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<unknown>;
    validationSchema?: unknown;
    children: ReactNode;
    className?: string;
}

export const FormIndex = <T extends {}>({
                                            initialValues,
                                            onSubmit,
                                            validationSchema,
                                            children,
                                            className
                                        }: FormikFormProps<T>) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form className={className}>
                {children}
            </Form>
        </Formik>
    );
};