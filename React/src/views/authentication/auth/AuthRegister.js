import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

// Your ForwardedInput component definition
const ForwardedInput = forwardRef((props, ref) => (
    <CustomTextField {...props} inputRef={ref} />
));

const AuthRegister = ({ title, subtitle, subtext }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const onSubmit = (data) => {
        axios.post('http://localhost:8080/register', data)
            .then((response) => {
                if (response.status === 200) {
                    setShowSuccessMessage(true);
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .catch((error) => {
                console.log('Something bad happened somewhere, rollback!', error);
            });
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <Box>
                <Stack spacing={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor='userName'
                                mb="5px"
                                mt="25px"
                            >
                                Username
                            </Typography>
                            <ForwardedInput
                                id="userName"
                                variant="outlined"
                                fullWidth
                                {...register("userName", {
                                    required: true,
                                    // You can add your username validation rules here
                                })}
                            />
                            {errors.userName && errors.userName.type === 'required' && (
                                <p className="text-danger">Username is required.</p>
                            )}
                            {/* Add more error messages if needed */}
                        </Box>

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
                            Sign Up
                        </Button>
                    </form>
                </Stack>
                {showSuccessMessage && (
                    <Typography className="success-message" color="success">
                        User Register Saved Successfully..!!
                    </Typography>
                )}
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
