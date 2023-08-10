import {
    Box, Button,
    Stack, Typography
} from '@mui/material';
import axios from 'axios';
import { forwardRef, useState } from 'react';
import { ReactSession } from 'react-client-session';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const ForwardedInput = forwardRef((props, ref) => (
    <CustomTextField {...props} inputRef={ref} />
));

const AuthLogin = ({ title, subtitle, subtext }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginUserDetails, setLoginUserDetails] = useState({});
    const [isLoginSuccessVisible, setIsLoginSuccessVisible] = useState(false);
    const [isLoginInvalidVisible, setIsLoginInvalidVisible] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (loginUser) => {
        axios.post('http://localhost:8080/loginUser', loginUser)
            .then((response) => {
                if (response.data.status === 200) {
                    ReactSession.setStoreType('localStorage');
                    ReactSession.set('userData', response.data.token);
                    setIsLoginSuccessVisible(true);
                    navigate('/dashboard'); // Assuming '/dashboard' is the correct route
                } else if (response.data.status === 400) {
                    setIsLoginInvalidVisible(true);
                    throw new Error('Something went wrong ...');
                }
            })
            .catch((error) => {
                console.log('Something bad happened somewhere, rollback!', error);
            });
    };


    return (
        <Box textAlign="left" paddingTop={5}>
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
            {subtext}
            <Stack spacing={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor='email'
                            mb="5px"
                            mt="25px"
                        >
                            Email
                        </Typography>
                        <ForwardedInput
                            id="email"
                            variant="outlined"
                            fullWidth
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            })}
                        />
                        {errors.email && errors.email.type === 'required' && (
                            <p className="text-danger">Email is required.</p>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <p className="text-danger">Invalid email format.</p>
                        )}
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                        >
                            Password
                        </Typography>
                        <ForwardedInput
                            id="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register("password", { required: true, minLength: 8 })}
                        />
                        {errors.password && errors.password.type === 'required' && (
                            <p className="text-danger">Password is required.</p>
                        )}
                        {errors.password && errors.password.type === 'minLength' && (
                            <p className="text-danger">Password must be at least 8 characters long.</p>
                        )}
                    </Box>

                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        sx={{ marginTop: '20px' }}
                    >
                        Sign In
                    </Button>
                </form>
            </Stack>
            {subtitle}
        </Box>
    );
};

export default AuthLogin;
