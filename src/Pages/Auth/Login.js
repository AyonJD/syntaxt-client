import React, { useContext } from 'react';
import { IoIosMail } from 'react-icons/io';
import { BsFillLockFill } from 'react-icons/bs';
import LoginImage from '../../Asset/Login.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { dataContext } from '../../App';
import { BASE_URL } from '../../Utils/Urls';

const Login = () => {
    const { token, setToken, setUserId } = useContext(dataContext)
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true });
        }
    });

    const handleGoogleLogin = async () => {
        const response = await signInWithGoogle();
        const password = response.user.uid;
        const dataToInsurt = {
            userName: response.user.displayName,
            email: response.user.email,
            password,
            role: 'user',
            isGoogleUser: true
        }

        const url = `${BASE_URL}/api/v1/auth/user/signup`;
        const responseFromDB = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsurt)
        });
        const result = await responseFromDB.json();

        if (result.success) {
            toast.success('Login successfully');
            setUserId(result.result.id)
            setToken(result.token);
            localStorage.setItem('access_token', result.token);
            localStorage.setItem('user_id', result.result.id);
            navigate('/', { replace: true });
        } else {
            toast.error('Something went wrong');
        }
    }

    const handleFormSubmit = async (data) => {
        const dataToInsurt = {
            email: data.user_or_email,
            password: data.password,
            userName: data.user_or_email,
        }
        const url = `${BASE_URL}/api/v1/auth/user/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsurt)
        });
        const result = await response.json();

        if (result.status === 200) {
            reset();
            toast.success('Login successfully');
            setToken(result.token);
            localStorage.setItem('access_token', result.token);
            localStorage.setItem('user_id', result.result.user._id);
            navigate('/', { replace: true });
        }
        if (result.status === 404 || result.status === 401) {
            toast.error(result.message);
        }
        if (result.status === 500) {
            toast.error('Something went wrong');
        }

    };
    return (
        <div className='login_wrapper flex items-center justify-center md:h-[100vh]'>
            <div className='md:flex w-[95vw] m-auto md:w-[80%] overflow-hidden md:h-[420px] h-full p-1 my-4 bg-white'>
                <img className='overflow-hidden w-full md:w-[55%]' src={LoginImage} alt="" />
                <div className='w-full md:w-[45%] md:h-full p-4'>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className='login_form'>
                        <h1 className='text-xl font-semibold text-[#495055] mb-2'>Sign In</h1>
                        <p className='text-sm text-[#495055] mb-2'>Username or Email Address</p>
                        <div className="flex items-center relative">
                            <IoIosMail className='absolute text-xl text-[#495055] left-3' />
                            <input type="text" placeholder='Username or Email Address' className='w-full focus:outline-none focus:border-[#0B5ED7] border border-slate-300 rounded-full p-2 pl-10'
                                {...register("user_or_email", {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Minimum 3 character required'
                                    }
                                })}
                                onKeyUp={(e) => {
                                    trigger('user_or_email')
                                }}
                            />
                        </div>
                        <small className='text-[#FF4B2B] pl-1 text-[12px]'>{errors?.user_or_email?.message}</small>

                        <p className='text-sm text-[#495055] mb-2'>Enter Password</p>
                        <div className="flex items-center relative">
                            <BsFillLockFill className='absolute text-xl text-[#495055] left-3' />
                            <input type="password" placeholder='Enter Password' className='w-full focus:outline-none focus:border-[#0B5ED7] border border-slate-300 rounded-full p-2 pl-10'
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: "Minimum six characters, at least one uppercase and one number"
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger('password')
                                }}
                            />
                        </div>
                        <small className='text-[#FF4B2B] text-center pl-1 text-[12px]'>{errors?.password?.message}</small>

                        <input className='bg-[#3461ff] hover:bg-[#0B5ED7] transition-all delay-100 cursor-pointer mt-4 w-full rounded-full p-2 font-medium text-white' type="submit" value="Sign In" />
                        <div className='flex justify-between items-center'>
                            <p className=' text-[#000] text-sm font-semibold mt-4 cursor-pointer'>Don't have an account? <span onClick={() => navigate('/signup')} className="text-[#0B5ED7]"> Sign Up</span></p>
                            <p className=' text-[#0B5ED7] text-sm font-semibold mt-4 cursor-pointer'>Forgot password</p>
                        </div>
                        <div className='h-[1.2px] mt-5 w-full bg-slate-500'></div>
                        {/* Google login button */}
                        <div onClick={handleGoogleLogin} className='flex w-fit mx-auto border px-5 py-[2px] rounded-full hover:border-slate-500 delay-100 ease-in-out items-center justify-center mt-4 cursor-pointer'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F5]'>
                                <img className='w-5' src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
                            </div>
                            <p className='text-[#495055] ml-2'>Sign in with Google</p>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;