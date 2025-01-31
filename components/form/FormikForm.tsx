import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

interface Field {
    name: string;
    initialValue: any;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    validation?: Yup.AnySchema;
}

interface FormikFormProps {
    fields: Field[];
    buttonLabel?: string;
    onFormSubmit: (data: any) => void;
}

export const FormikForm = ({ fields, buttonLabel = "Submit", onFormSubmit }: FormikFormProps) => {
    // ✅ Generate initial values dynamically
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue;
        return acc;
    }, {} as Record<string, any>);

    // ✅ Create validation schema dynamically
    const validationSchema = Yup.object().shape(
        fields.reduce((acc, field) => {
            if (field.validation) {
                acc[field.name] = field.validation;
            }
            return acc;
        }, {} as Record<string, Yup.AnySchema>)
    );

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    {fields.map(({ name, label, placeholder, disabled }: Field) => (
                        <View key={name} style={styles.inputContainer}>
                            <TextInput
                                onChangeText={handleChange(name)}
                                onBlur={handleBlur(name)}
                                value={values[name]}
                                label={label}
                                placeholder={placeholder}
                                disabled={disabled}
                                mode="outlined"
                                style={styles.input}
                                error={!!(errors[name] && touched[name])}
                            />
                            {typeof errors[name] === "string" && touched[name] && (
                                <Text style={styles.errorText}>{errors[name]}</Text>
                            )}

                        </View>
                    ))}

                    <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
                        {buttonLabel}
                    </Button>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: "transparent",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        marginTop: 8,
    },
});
