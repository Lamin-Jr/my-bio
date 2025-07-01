import { useField } from 'formik';
import {Textarea, TextareaProps} from "@form/TextArea.tsx";

interface FormikTextareaProps extends TextareaProps {
    name: string;
    editMode: boolean;
}

export const CustomTextarea = ({ name, ...props }: FormikTextareaProps) => {
    const [field, meta] = useField(name);

    return (
        <Textarea
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
            helperText={meta.error}
        />
    );
};