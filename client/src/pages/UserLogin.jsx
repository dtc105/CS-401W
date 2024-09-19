import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

function UserLogin() {

    useEffect(() => {
        console.warn("Functionality yet to be added")
    }, []);
    
    const initialValues = {
        "email": "",
        "password": ""
    };

    const validationSchema = Yup.object().shape({
        "email": Yup
            .string()
            .matches(/.+@.+\..+/g, "Must input a valid email")
            .required("Email required"),
        "password": Yup
            .string()
            .required("Password required")
    });

    function onSubmit(values) {
        return;
    }
    
    return (
        <div id="loginContainer" className="w-full h-full grid place-content-center">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={true}    
            >
                <Form
                    className="min-h-96"
                >
                    {/* Email Input */}
                    <ErrorMessage 
                        name="email"
                        component="span"
                        className=""
                    />
                    <Field 
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className=""
                    />

                    {/* Password Input */}
                    <ErrorMessage 
                        name="password"
                        component="span"
                        className=""
                    />
                    <Field 
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className=""
                    />
                </Form>
            </Formik>
        </div>
    );
}

export default UserLogin;