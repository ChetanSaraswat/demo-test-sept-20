import  { useEffect, useState } from 'react';
import { Box, Button, FormGroup, FormHelperText, 
FormLabel, InputBase, Typography, IconButton, 
InputAdornment } from '@mui/material';
import styles from './login.module.css'
import loginpng from '../../assets/Images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../feature/Auth/auth.action';
import { useNotification } from '../../hooks/notification';
import { useAppDispatch } from '../../hooks';
type Data = {
    email: string;
    password: string;
};

function Login() {
    const initStage: Data = {
        email: "",
        password: '',
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showNotification= useNotification()
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

        if(data){
            try {
                const res:any = await dispatch(login(data));
                console.log("res: ", res);
                if (res?.meta?.requestStatus === "fulfilled") {
                    showNotification('Logged in successfully', "success");
                    navigate('/')
                }
                if (res?.meta?.requestStatus === "rejected") {
                    showNotification(res?.error?.message || "Error", "error");
                }
              } catch (err) {
                showNotification('error','error')
                alert(err);
              }
            }
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
