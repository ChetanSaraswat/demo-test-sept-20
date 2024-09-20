import {  useState } from 'react';
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, InputAdornment, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Login/login.module.css';
import loginpng from '../../assets/Images/food-delivery-service-fast-food-delivery-scooter-delivery-service-illustration_67394-869.png';
import { RemoveRedEye } from '@mui/icons-material';
import {  signup } from '../../feature/Auth/auth.action'
import { useAppDispatch } from '../../hooks';
import { useNotification } from '../../hooks/notification';

type Data = {
    name: string;
    email: string;
    password: string;
    role: string;
    phone:string;
};

function SignUp() {
    const initStage: Data = {
        name: "",
        email: "",
        password: '',
        role: "",
        phone:'',
    };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showNotification= useNotification()
    const [data, setData] = useState<Data>(initStage);
    const [error, setError] = useState<{ name: boolean; email: boolean; password: boolean;role:boolean;phone:boolean }>({
        name: false,
        email: false,
        password: false,
        role:false,
        phone:false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const HandleSignUp = async () => {
        setError({
            name: false,
            email: false,
            password: false,
            role:false,
            phone:false
        });

        if (data.name === "" || data.email === "" || data.password === "" || data.role === "" || data.phone==="") {
            setError({
                name: data.name === "",
                email: data.email === "",
                password: data.password === "",
                role:data.role==="",
                phone:data.phone===""
            });
            return;
        }
        if(data){
            try {
                const res:any = await dispatch(signup(data));
                console.log("res: ", res);
                if (res?.meta?.requestStatus === "fulfilled") {
                    showNotification(`${res?.payload?.data?.message}`, "success");
                    navigate('/auth/login')
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
        const isValid = data !== "" && validatePassword(data) && data.length >= 8;
        setError((prev) => ({ ...prev, password: !isValid }));
    };

    const check_email = (data: string) => {
        const isValid = data !== "" && validateEmail(data);
        setError((prev) => ({ ...prev, email: !isValid }));
    };

    return (
        <Box className={styles.root}>
            <Box className={styles.partition1} mr={'50px'}>
                <img src={loginpng} alt='Login' className={styles.loginImg} />
            </Box>
            <Box className={styles.partition2}>
                <Typography className={styles.title}>Sign Up</Typography>

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
                    <FormLabel className={styles.inputlabel}>Phone*</FormLabel>
                    <InputBase
                        type='text'
                        className={`${styles.inputBox} ${error.phone ? styles.errorInput : ''}`}
                        value={data.phone}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\s+/g, '');
                            setData((prev) => ({ ...prev, phone: value }));
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}
                    />
                    {error.phone && (
                        <FormHelperText className={styles.FormHelperText}>
                            {data.phone === "" ? "Phone no. is required" : "Invalif"}
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

             
                 <FormGroup className={styles.inputWraper}>
                    <FormLabel className={styles.inputlabel}>Role*</FormLabel>
                    <Select
                        value={data.role}
                        onChange={(e) => setData((prev) => ({ ...prev, role: e.target.value as string }))}
                        className={styles.inputBox}
                    >
                        <MenuItem value="CUSTOMER">Customer</MenuItem>
                        <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                </FormGroup>

                <Button
                    className={styles.signInBtn}
                    onClick={HandleSignUp}
                    disabled={data.email.length === 0 || data.password.length === 0 || data.name.length === 0 || data.role.length === 0}
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
