import {  useState } from 'react';
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, InputAdornment, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../Login/login.module.css';
import loginpng from '../../assets/Images/login.png';
import { RemoveRedEye } from '@mui/icons-material';

type Data = {
    name: string;
    email: string;
    password: string;
    role: string;
    rememberMe: boolean;
};

function SignUp() {
    const initStage: Data = {
        name: "",
        email: "",
        password: '',
        role: "user",
        rememberMe: false,
    };

    const [data, setData] = useState<Data>(initStage);
    const [error, setError] = useState<{ name: boolean; email: boolean; password: boolean }>({
        name: false,
        email: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const HandleLogin = async () => {
        setError({
            name: false,
            email: false,
            password: false,
        });

        if (data.name === "" || data.email === "" || data.password === "") {
            setError({
                name: data.name === "",
                email: data.email === "",
                password: data.password === "",
            });
            return;
        }

        // Handle login logic here (e.g., API call)
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
                <Typography className={styles.title}>Sign Up</Typography>

                {/* Name Field */}
                <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Name*</FormLabel>
                    <InputBase
                        type='text'
                        className={`${styles.inputBox} ${error.name ? styles.errorInput : ''}`}
                        value={data.name}
                        onChange={(e) => {
                            const value = e.target.value.trim();
                            setError((prev) => ({ ...prev, name: value === "" }));
                            setData((prev) => ({ ...prev, name: value }));
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}
                    />
                    {error.name && (
                        <FormHelperText className={styles.FormHelperText}>
                            Name is required
                        </FormHelperText>
                    )}
                </FormGroup>

                {/* Email Field */}
                <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Email*</FormLabel>
                    <InputBase
                        type='email'
                        className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`}
                        value={data.email}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\s+/g, '');
                            check_email(value);
                            setData((prev) => ({ ...prev, email: value }));
                        }}
                        inputProps={{
                            maxLength: 50,
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
                                const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g,'');
                                check_password(value);
                                setData((prev) => ({ ...prev, password: value }));
                            }}
                            inputProps={{
                                maxLength: 50,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        <RemoveRedEye/>
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

                {/* Role Select */}
                <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Role*</FormLabel>
                    <Select
                        value={data.role}
                        onChange={(e) => setData((prev) => ({ ...prev, role: e.target.value as string }))}
                        className={styles.inputBox}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormGroup>

                <Button
                    className={styles.signInBtn}
                    onClick={HandleLogin}
                    disabled={data.email.length === 0 || data.password.length === 0 || data.name.length === 0}
                >
                    Sign Up
                </Button>

                <Box className={styles.rememberMeWrap}>
                    <Typography className={`${styles.rememberMeText} ${styles.loginRedirect}`}>
                        Existing User?<Link to='/auth/signup'> Signin here</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;
