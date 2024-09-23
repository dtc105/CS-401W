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
        <div 
            id="loginContainer" 
            className="w-full h-full grid place-content-center"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={true}    
            >
                <Form className="flex flex-col justify-center items-center gap-8 m-16">
                    <h2 className="text-2xl">
                        Log In
                    </h2>
                    {/* Email Input */}
                    <div id="emailInput" className="text-xl flex flex-col justify-center items-center">
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
                    </div>

                    {/* Password Input */}
                    <div 
                        id="passwordInput" 
                        className="text-xl flex flex-col justify-center items-center"
                    >
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
                    </div>

                    <button
                        className="text-xl"
                    >
                        Log In
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default UserLogin;