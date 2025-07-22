import { useField } from 'formik';
import {Input, InputProps} from "@components/utils/form/Input.tsx";


interface CustomInputProps extends InputProps {
    name: string;
}

export const CustomInput = ({ name, ...props }: CustomInputProps) => {
    const [field, meta] = useField(name);

    return (
        <Input
            {...field}
            {...props}
            error={meta.touched && !!meta.error}
            helperText={meta.error}
        />
    );
};