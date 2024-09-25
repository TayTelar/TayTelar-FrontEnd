import React, { useEffect, useState } from "react";
import "../../assets/sass/pages/_login.scss";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {  LoginSocialGoogle, LoginSocialFacebook, LoginSocialApple, IResolveParams} from "reactjs-social-login";
import {
  GoogleLoginButton,
  FacebookLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Divider from "@mui/material/Divider";
import logo from "../../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/modal/SuccessModal";
import ErrorModal from "../../components/modal/ErrorModal";

interface customerType {
  customerType: string;
}

const Login: React.FC<customerType> = ({ customerType }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [otpSentSuccess, setOtpSentSuccess] = React.useState(false);

  useEffect(() => {
    console.log("userType:", customerType);
  }, []);

  const navigate = useNavigate();

  const handleSuccessModal = () => {
    setOpenSuccessModal(true);
  };
  const handleErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleCloseModal = () => {
    setOpenSuccessModal(false);
    setOpenErrorModal(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleResolve = async ({ data }: IResolveParams) => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        code: data.code,
        client_id:
          "618434730934-hsp3tuc9n6ibvqrn2b49hf0ektlgainb.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
      });

      const { id_token } = response.data;
      const userData = jwtDecode(id_token);

      console.log("User Data:", userData);
    } catch (error) {
      console.error("Failed to get tokens:", error);
    }
  };

  const handleReject = (err: any) => {
    console.log("Login Failed:", err);
  };

  const sendOTP = async () => {
    const requestType = isRegister ? "register" : "login";

    const requestbody = {
      phoneNumber: formik.values.phoneNumber,
      userType: customerType,
      requestType: requestType,
    };

    try {
      const response = await axios.post(
        "http://localhost:8085/api/otp/sendOtp",
        requestbody
      );

      if (response.data.statusCode === 200) {
        console.log("OTP Sent!");
        setOtpSent(true);
        setOtpSentSuccess(true);
        setTimeout(() => {
          setOtpSentSuccess(false);
        }, 5000);
      } else {
        setErrorContent(response.data.message);
        handleErrorModal();
        console.log("Failed to send OTP.");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred while sending OTP.";

      if (error.response) {
        errorMessage =
          error.response.data.message ||
          error.response.statusText ||
          errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error sending OTP:", errorMessage);
      setErrorContent(errorMessage);
      handleErrorModal();
    }
  };

  const verifyOTP = async (otp: string) => {
    const requestbody = {
      phoneNumber: formik.values.phoneNumber,
      otpPassword: otp,
      userType: customerType,
    };

    try {
      const response = await axios.post(
        "http://localhost:8085/api/otp/verifyOtp",
        requestbody
      );

      if (response.data.statusCode === 200) {
        console.log("OTP Verified!");
        return true;
      } else {
        console.log("Invalid OTP.");
        setErrorContent(response.data.message);
        handleErrorModal();
        return false;
      }
    } catch (error: any) {
      let errorMessage = "An error occurred while verifying OTP.";

      if (error.response) {
        errorMessage =
          error.response.data.message ||
          error.response.statusText ||
          errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error verifying OTP:", errorMessage);
      setErrorContent(errorMessage);
      handleErrorModal();
    }
  };

  const register = async (otp: string) => {
    const otpValid = await verifyOTP(otp);

    if (otpValid) {
      const requestbody = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        emailAddress: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        userType: customerType,
        referralCode: "",
      };

      try {
        console.log("userType: ", customerType);
        const response = await axios.post(
          "http://localhost:8085/api/user/register",
          requestbody
        );

        if (response.data.statusCode === 200) {
          handleSuccessModal();
          formik.resetForm();
          setIsRegister(false);
          setOtpSent(false);
          console.log("Registration successful!");
        } else {
          console.log("Registration failed.");
          setErrorContent(response.data.message);
          handleErrorModal();
        }
      } catch (error: any) {
        let errorMessage = "An error occurred while registering.";

        if (error.response) {
          errorMessage =
            error.response.data.message ||
            error.response.statusText ||
            errorMessage;
        } else if (error.request) {
          errorMessage = "No response received from the server.";
        } else {
          errorMessage = error.message;
        }

        console.error("Error registering:", errorMessage);
        setErrorContent(errorMessage);
        handleErrorModal();
      }
    } else {
      console.log("OTP verification failed. Cannot register.");
    }
  };

  const login = async (otp: string) => {
    const otpValid = await verifyOTP(otp);
    if (!otpValid) {
      console.log("OTP verification failed. Cannot login.");
      return;
    }

    const requestbody = {
      phoneNumber: formik.values.phoneNumber,
      userType: customerType,
      requestType: "Login",
    };

    try {
      console.log("userType: ", customerType);
      const response = await axios.post(
        "http://localhost:8085/api/user/login",
        requestbody
      );

      if (response.status === 200) {
        console.log("Login successful!");
        const { id } = response.data;
      
        localStorage.setItem('userId', id);
        console.log("User ID stored in localStorage:", id);

        if (customerType === "customer") {
          console.log("Navigating to /home");
          navigate("/home");
        } else if (customerType === "affiliate") {
          console.log("Navigating to /affiliated/dashboard");
          navigate("/affiliated/dashboard");
        }
      } else {
        console.log("Login failed.");
        setErrorContent(response.data.message);
        handleErrorModal();
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during login.";

      if (error.response) {
        errorMessage =
          error.response.data.message ||
          error.response.statusText ||
          errorMessage;
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error while logging in:", errorMessage);
      setErrorContent(errorMessage);
      handleErrorModal();
    }
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Must be a valid phone number"),

    otp: Yup.string().when("otpSent", (otpSent, schema) => {
      return otpSent
        ? schema.required("OTP is required")
        : schema.notRequired();
    }),

    firstName: Yup.string().when("isRegister", (isRegister, schema) => {
      return isRegister
        ? schema.required("First Name is required")
        : schema.notRequired();
    }),

    lastName: Yup.string().when("isRegister", (isRegister, schema) => {
      return isRegister
        ? schema.required("Last Name is required")
        : schema.notRequired();
    }),

    email: Yup.string().when("isRegister", (isRegister, schema) => {
      return isRegister
        ? schema.email("Invalid email address").required("Email is required")
        : schema.notRequired();
    }),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      otp: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!otpSent) {
        await sendOTP();
      } else if (isRegister) {
        console.log("Register with:", values);
      } else {
        console.log("Login with OTP:", values);
      }
    },
  });

  const handleRegisterClick = async () => {
    if (formik.values.otp) {
      await register(formik.values.otp);
    }
  };
  const handleLogin = async () => {
    console.log("Hitting handle login:", customerType);
    if (formik.values.otp) {
      await login(formik.values.otp);
    }
  };

  const handleSendOtpClick = async () => {
    await sendOTP();
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="logo">
          <img src={logo} alt="" />
          <h3>
            {isRegister
              ? customerType === "customer"
                ? "Registration for Customer"
                : "Registration for Affiliate User"
              : customerType === "customer"
              ? "Login to Taytelar Customer"
              : "Login to Taytelar Affiliate User"}
          </h3>
        </div>
        <div className="login_container_section">
          {!isRegister ? (
            // Login Section
            <>
              <div className="login_container_section_signin">
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="">Phone Number</label>
                  <TextField
                    name="phoneNumber"
                    required
                    id="standard-required"
                    placeholder="Enter your Phone Number"
                    variant="standard"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        formik.errors.phoneNumber
                      ) : otpSentSuccess ? (
                        <span style={{ color: "green" }}>
                          OTP sent successfully!
                        </span>
                      ) : (
                        ""
                      )
                    }
                  />

                  {otpSent && (
                    <>
                      <label htmlFor="">OTP</label>
                      <Input
                        required
                        name="otp"
                        id="standard-adornment-password"
                        placeholder="Enter your OTP"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {formik.touched.otp && formik.errors.otp}
                      </FormHelperText>
                    </>
                  )}
                  {otpSent ? (
                    <button
                      className="login_btn"
                      type="button"
                      disabled={
                        !formik.values.phoneNumber || !formik.values.otp
                      }
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="login_btn"
                      type="button"
                      disabled={!formik.values.phoneNumber}
                      onClick={handleSendOtpClick}
                    >
                      Send OTP
                    </button>
                  )}
                </form>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  className="laptop_divider"
                >
                  <span
                    style={{
                      padding: "0 3vw",
                      backgroundColor: "#fff",
                      fontSize: "12px",
                    }}
                  >
                    OR
                  </span>
                </Divider>
                <Divider className="mobile_divider">OR</Divider>

                {/* Social login buttons */}
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
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow: "none",
                        border: "1px solid #000",
                        padding: "16px",
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        color: "#000000",
                        marginBottom: "10px",
                      }}
                      iconSize="18px"
                    >
                      <span style={{ color: "#000000", marginLeft: "15px" }}>
                        Continue with Google
                      </span>
                    </GoogleLoginButton>
                  </LoginSocialGoogle>

                  {/* Facebook */}
                  <LoginSocialFacebook
                    appId="1317999665724935"
                    onResolve={({ response }:any) => {
                      console.log(response);
                    }}
                    onReject={(err: any) => {
                      console.log(err);
                    }}
                  >
                    <FacebookLoginButton
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow: "none",
                        border: "1px solid #000",
                        padding: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        color: "#000000",
                        backgroundColor: isHovered
                          ? "rgb(231, 231, 231)"
                          : "transparent",
                        marginBottom: "1vw",
                      }}
                      iconColor="#4267B2"
                      iconSize="18px"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span style={{ color: "#000000", marginLeft: "15px" }}>
                        Continue with Facebook
                      </span>
                    </FacebookLoginButton>
                  </LoginSocialFacebook>

                  {/* Apple */}
                  <LoginSocialApple scope={"name email"}>
                    <AppleLoginButton
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow: "none",
                        border: "1px solid #000",
                        padding: "16px",
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        color: "#000000",
                        marginBottom: "10px",
                      }}
                      iconSize="18px"
                    >
                      <span style={{ color: "#000000", marginLeft: "15px" }}>
                        Continue with Apple
                      </span>
                    </AppleLoginButton>
                  </LoginSocialApple>
                </div>
              </div>

              <div className="register_button">
                <span>Don't have an account? </span>
                <span
                  onClick={() => {
                    setIsRegister(true);
                    formik.resetForm();
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Register
                </span>
              </div>
            </>
          ) : (
            // Register Section
            <div className="login_container_section_register">
              <form onSubmit={formik.handleSubmit}>
                <div className="name">
                  <div className="first">
                    <label>First Name</label>
                    <TextField
                      required
                      name="firstName"
                      placeholder="Enter your first name"
                      variant="standard"
                      fullWidth
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </div>
                  <div className="last">
                    <label>Last Name</label>
                    <TextField
                      required
                      name="lastName"
                      placeholder="Enter your last name"
                      variant="standard"
                      fullWidth
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </div>
                </div>
                <label>Email</label>
                <TextField
                  required
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="standard"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <label>Phone Number</label>
                <TextField
                  required
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  variant="standard"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      formik.errors.phoneNumber
                    ) : otpSentSuccess ? (
                      <span style={{ color: "green" }}>
                        OTP sent successfully!
                      </span>
                    ) : (
                      ""
                    )
                  }
                />
                {otpSent && (
                  <>
                    <label htmlFor="">OTP</label>
                    <Input
                      required
                      name="otp"
                      id="standard-adornment-password"
                      placeholder="Enter your OTP"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.otp && Boolean(formik.errors.otp)}
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
                    <FormHelperText>
                      {formik.touched.otp && formik.errors.otp}
                    </FormHelperText>
                  </>
                )}
                {otpSent ? (
                  <button
                    className="login_btn"
                    type="button"
                    disabled={
                      !formik.values.email ||
                      !formik.values.phoneNumber ||
                      !formik.values.firstName ||
                      !formik.values.lastName ||
                      !formik.values.otp
                    }
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                ) : (
                  <button
                    className="login_btn"
                    type="button"
                    disabled={
                      !formik.values.email ||
                      !formik.values.phoneNumber ||
                      !formik.values.firstName ||
                      !formik.values.lastName
                    }
                    onClick={handleSendOtpClick}
                  >
                    Send OTP
                  </button>
                )}
              </form>
              <span>Already have an account?</span>
              <p
                onClick={() => {
                  setIsRegister(false);
                  formik.resetForm();
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </p>
            </div>
          )}
        </div>
        <SuccessModal
          open={openSuccessModal}
          onClose={handleCloseModal}
          title="Registration Successful!"
          content="We're excited to have you on board! Your account has been created successfully. Please click the button below to log in."
          buttonText="Proceed to Login"
          navigateTo="/login"
        />
        <ErrorModal
          open={openErrorModal}
          onClose={handleCloseModal}
          title="Oops!!"
          content={errorContent}
          buttonText="Okay"
        />
      </div>
    </div>
  );
};

export default Login;
