import React, { useState } from 'react';
import '../../assets/sass/pages/_login.scss';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUp, confirmSignUp, signIn } from '@aws-amplify/auth';
// @ts-ignore
import { LoginSocialGoogle, LoginSocialFacebook, IResolveParams } from 'reactjs-social-login'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Divider from '@mui/material/Divider';
import logo from '../../assets/images/logo.png'

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleResolve = async ({ provider, data }: IResolveParams) => {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                code: data.code,
                client_id: '618434730934-hsp3tuc9n6ibvqrn2b49hf0ektlgainb.apps.googleusercontent.com',
                client_secret: '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',
                redirect_uri: 'http://localhost:5173',
                grant_type: 'authorization_code',
            });

            const { id_token } = response.data;

            const userData = jwtDecode(id_token);

            console.log('User Data:', userData);
        } catch (error) {
            console.error('Failed to get tokens:', error);
        }
    };

    const handleReject = (err: any) => {
        console.log('Login Failed:', err);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await signIn({ username: phoneNumber, password });
            alert('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Error signing in');
        }
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();

        const userAttributes = {
            email,
            phone_number: phoneNumber,
            given_name: firstName, 
            family_name: lastName, 
        };

        try {
            const result = await signUp({
                username: phoneNumber,
                password,
                options: {
                    userAttributes,
                }
            });
            console.log(result);
            alert('Registration successful. Please verify your account.');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Error registering');
        }
    };


    const handleOtpSubmit = async () => {
        try {
            await confirmSignUp({ username: phoneNumber, confirmationCode: otp });
            alert('Verification successful! Please log in.');
        } catch (error) {
            console.error('Verification failed:', error);
            alert('Error verifying OTP');
        }
    };


    return (
        <div className="login">
            <div className="login_container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <h3>{isRegister ? 'Create an Account' : 'Login to Taytelar'}</h3>
                </div>
                <div className="login_container_section">

                    {!isRegister ? (
                        // Login Section
                        <div className="login_container_section_signin">
                            <form onSubmit={handleLogin}>
                                <label htmlFor="">Phone Number</label>
                                <TextField
                                    required
                                    id="standard-required"
                                    placeholder="Enter your Phone Number"
                                    variant="standard"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}

                                />
                                <label htmlFor="">OTP</label>
                                <Input
                                    required
                                    id="standard-adornment-password"
                                    placeholder='Enter your OTP'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <button className='login_btn' type="submit">Login</button>
                            </form>
                            <Divider orientation="vertical" variant="middle" flexItem className='laptop_divider'>
                                <span style={{ padding: '0 3vw', backgroundColor: '#fff', fontSize: '12px' }}>OR</span>
                            </Divider>
                            <Divider className='mobile_divider'>OR</Divider>
                            <div className="social_login">
                                <LoginSocialGoogle
                                    client_id="618434730934-hsp3tuc9n6ibvqrn2b49hf0ektlgainb.apps.googleusercontent.com"
                                    access_type="offline"
                                    scope="profile email"
                                    onResolve={handleResolve}
                                    onReject={handleReject}
                                >
                                    <GoogleLoginButton
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: "500",
                                            boxShadow: 'none',
                                            border: '1px solid #000',
                                            padding: '16px',
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            color: '#000000',
                                            marginBottom: '10px',
                                        }}
                                        iconSize='18px'>
                                        <span style={{ color: '#000000', marginLeft: '15px' }}>
                                            Continue with Google
                                        </span>
                                    </GoogleLoginButton>
                                </LoginSocialGoogle>

                                <LoginSocialFacebook
                                    appId='1317999665724935'
                                    onResolve={({ response }: IResolveParams) => {
                                        console.log(response)
                                    }}
                                    onReject={(err: any) => {
                                        console.log(err);
                                    }}
                                >
                                    <FacebookLoginButton
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: "500",
                                            boxShadow: 'none',
                                            border: '1px solid #000',
                                            padding: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'start',
                                            color: '#000000',
                                            backgroundColor: isHovered ? 'rgb(231, 231, 231)' : 'transparent',
                                            marginBottom: '1vw',

                                        }}
                                        iconColor='#4267B2'
                                        iconSize='18px'
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <span style={{ color: '#000000', marginLeft: '15px' }}>
                                            Continue with Facebook
                                        </span>
                                    </FacebookLoginButton>
                                </LoginSocialFacebook>

                                <div className='register_button'>
                                    <span>Don't have an account?</span>
                                    <p onClick={() => setIsRegister(true)} style={{ cursor: 'pointer', color: 'blue' }}>Register</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Register Section
                        <div className="login_container_section_register">
                            <form onSubmit={handleRegister}>
                                <div className="name">
                                    <div className="first">
                                        <label>First Name</label>
                                        <TextField
                                            required
                                            placeholder="Enter your first name"
                                            variant="standard"
                                            fullWidth
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="last">
                                        <label>Last Name</label>
                                        <TextField
                                            required
                                            placeholder="Enter your last name"
                                            variant="standard"
                                            fullWidth
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <label>Phone Number</label>
                                <TextField
                                    required
                                    placeholder="Enter your phone number"
                                    variant="standard"
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <label>OTP</label>
                                <Input
                                    required
                                    placeholder="Enter your OTP"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <label>Email</label>
                                <TextField
                                    required
                                    placeholder="Enter your email"
                                    type="email"
                                    variant="standard"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className='login_btn' onClick={handleRegister}>Register</button>
                            </form>

                            <span>Already have an account?</span>
                            <p onClick={() => setIsRegister(false)} style={{ cursor: 'pointer', color: 'blue' }}>Login</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
