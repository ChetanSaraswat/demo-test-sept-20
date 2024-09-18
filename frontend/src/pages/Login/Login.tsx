import  { useEffect, useState } from 'react';
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './login.module.css'
import loginpng from '../../assets/Images/login.png'
type Data = {
    email: string;
    password: string;
    rememberMe: boolean;
};

function Login() {
    const initStage: Data = {
        email: "",
        password: '',
        rememberMe: false,
    };

    const [data, setData] = useState<Data>(initStage);
    const [error, setError] = useState<{ email: boolean; password: boolean }>({
        email: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // You can add logic here if needed
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const HandleLogin = async () => {
        // Clear previous errors before making a new login attempt
        setError({
            email: false,
            password: false,
        });

        if (data.email === "" || data.password === "") {
            // Set errors if fields are empty
            setError((prev) => ({
                email: data.email === "",
                password: data.password === "",
            }));
            return;
        }

        // Uncomment and adjust the following lines according to your implementation
        // try {
        //     const res = await dispatch(LoginApi({ email: data.email, password: data.password }));
        //     if (res?.meta?.requestStatus === "fulfilled") {
        //         showNotification("Login successfully", "success");
        //     }
        //     if (res?.meta?.requestStatus === "rejected") {
        //         showNotification(res?.payload?.response?.data || "Error", "error");
        //         if (res?.payload?.response?.data) {
        //             setError((prev) => ({ ...prev, email: false, password: false }));
        //         }
        //     }
        // } catch (error) {
        //     showNotification("Error", "error");
        //     console.log('error: ', error);
        // }
    };

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password: string) => {
        return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
    };

    const check_password = (data: string) => {
        const isValid = data !== "" && validatePassword(data) && data.length >= 6;
        setError((prev) => ({ ...prev, password: !isValid }));
    };

    const check_email = (data: string) => {
        const isValid = data !== "" && validateEmail(data);
        setError((prev) => ({ ...prev, email: !isValid }));
    };

    return (
        <Box className={styles.root}>
            <Box className={styles.partition1}>
                <img src={loginpng} alt='Login' className={styles.loginImg} />
            </Box>
            <Box className={styles.partition2}>
                <Typography className={styles.title}>Sign In</Typography>

                <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Email*</FormLabel>
                    <InputBase
                        type='email'
                        className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`}
                        value={data.email}
                        onKeyDown={(e) => {
                            if (e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\s+/g, '');
                            check_email(value);
                            setData((prev) => ({ ...prev, email: value }));
                        }}
                        inputProps={{
                            maxLength: 50,
                            title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.',
                        }}
                    />
                    {error.email && (
                        <FormHelperText className={styles.FormHelperText}>
                            {data.email === "" ? "Email is required" : "Invalid Email"}
                        </FormHelperText>
                    )}
                </FormGroup>

                <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Password*</FormLabel>
                    <Box className={styles.passwordWrapper}>
                        <InputBase
                            type={showPassword ? 'text' : 'password'}
                            className={`${styles.inputBox} ${error.password ? styles.errorInput : ''}`}
                            value={data.password}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, '');
                                check_password(value);
                                setData((prev) => ({ ...prev, password: value }));
                            }}
                            inputProps={{
                                maxLength: 50,
                                title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.',
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {/* Uncomment and use icons if necessary */}
                                        {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                    {error.password && (
                        <FormHelperText className={styles.FormHelperText}>
                            {data.password === "" ? "Password is required" : "Invalid Password"}
                        </FormHelperText>
                    )}
                </FormGroup>

                <Box className={styles.rememberMeWrap}>
                    <Typography className={`${styles.rememberMeText} ${styles.loginRedirect}`}>
                        New User?<Link to='/auth/signup'> Signup here</Link>
                    </Typography>
                </Box>

                <Button
                    className={styles.signInBtn}
                    onClick={HandleLogin}
                    disabled={data.email.length === 0 || data.password.length === 0}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
