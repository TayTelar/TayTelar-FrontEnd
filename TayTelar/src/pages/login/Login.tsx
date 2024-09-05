import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/sass/pages/_login.scss';

const Login = () => {
    const formikSignIn = useFormik({
        initialValues: {
            username: '',
            password: '',
            keepSignedIn: false,
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            console.log('Sign In', values);
        },
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            phoneNumber: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            phoneNumber: Yup.string().required('Phone number is required')
                .matches(
                    /^[0-9]{10}$/,
                    'Phone number must be exactly 10 digits'
                ),
            password: Yup.string()
                .required('Password is required'),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Repeat Password is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            console.log('Sign Up', values);
        },
    });

    return (
        <div className="login">
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
                    <label htmlFor="tab-1" className="tab">Login</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" />
                    <label htmlFor="tab-2" className="tab">Register</label>

                    <div className="login-form">
                        {/* Sign In Form */}
                        <form onSubmit={formikSignIn.handleSubmit} className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input
                                    id="user"
                                    type="text"
                                    className="input"
                                    {...formikSignIn.getFieldProps('username')}
                                />
                                {formikSignIn.touched.username && formikSignIn.errors.username ? (
                                    <div className="error">{formikSignIn.errors.username}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input
                                    id="pass"
                                    type="password"
                                    className="input"
                                    {...formikSignIn.getFieldProps('password')}
                                />
                                {formikSignIn.touched.password && formikSignIn.errors.password ? (
                                    <div className="error">{formikSignIn.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" {...formikSignIn.getFieldProps('keepSignedIn')} />
                                <label htmlFor="check" className='check_label'><span className="icon"></span> Keep me Signed in</label>
                            </div>
                            <div className="group">
                                <button type="submit" className="button">Login</button>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </form>

                        {/* Sign Up Form */}
                        <form onSubmit={formikSignUp.handleSubmit} className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user-signup" className="label">Username</label>
                                <input
                                    id="user-signup"
                                    type="text"
                                    className="input"
                                    {...formikSignUp.getFieldProps('username')}
                                />
                                {formikSignUp.touched.username && formikSignUp.errors.username ? (
                                    <div className="error">{formikSignUp.errors.username}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <label htmlFor="email-signup" className="label">Email Address</label>
                                <input
                                    id="email-signup"
                                    type="text"
                                    className="input"
                                    {...formikSignUp.getFieldProps('email')}
                                />
                                {formikSignUp.touched.email && formikSignUp.errors.email ? (
                                    <div className="error">{formikSignUp.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <label htmlFor="phone-signup" className="label">Phone Number</label>
                                <input
                                    id="phone-signup"
                                    type="tel"
                                    className="input"
                                    {...formikSignUp.getFieldProps('phoneNumber')}
                                />
                                {formikSignUp.touched.phoneNumber && formikSignUp.errors.phoneNumber ? (
                                    <div className="error">{formikSignUp.errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <label htmlFor="pass-signup" className="label">Password</label>
                                <input
                                    id="pass-signup"
                                    type="password"
                                    className="input"
                                    {...formikSignUp.getFieldProps('password')}
                                />
                                {formikSignUp.touched.password && formikSignUp.errors.password ? (
                                    <div className="error">{formikSignUp.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <label htmlFor="repeat-pass-signup" className="label">Repeat Password</label>
                                <input
                                    id="repeat-pass-signup"
                                    type="password"
                                    className="input"
                                    {...formikSignUp.getFieldProps('repeatPassword')}
                                />
                                {formikSignUp.touched.repeatPassword && formikSignUp.errors.repeatPassword ? (
                                    <div className="error">{formikSignUp.errors.repeatPassword}</div>
                                ) : null}
                            </div>
                            <div className="group">
                                <button type="submit" className="button">Register</button>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <label htmlFor="tab-1">Already Member?</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
