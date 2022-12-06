import React, { useContext } from 'react';
import { IoIosMail } from 'react-icons/io';
import { BsFillLockFill } from 'react-icons/bs';
import { HiUser } from 'react-icons/hi'
import SignUpImage from '../../Asset/Login.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { dataContext } from '../../App';
import { BASE_URL } from '../../Utils/Urls';

const Signup = () => {
    const { token, setToken, setUserId } = useContext(dataContext)
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true });
        }
    });

    const handleFormSubmit = async (data) => {
        const dataToInsurt = {
            email: data.email,
            password: data.password,
            userName: data.userName,
            role: 'user'
        }
        const url = `${BASE_URL}/api/v1/auth/user/signup`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsurt)
        });
        const result = await response.json();

        if (result.success) {
            reset();
            toast.success('Account created successfully');
            setToken(result.token);
            setUserId(result.result.id);
            localStorage.setItem('access_token', result.token);
            localStorage.setItem('user_id', result.result.id);
            navigate(from, { replace: true });
        } else {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='login_wrapper flex items-center justify-center'>
            <div className='md:flex w-[95vw] m-auto md:w-[85%] overflow-hidden md:h-[470px] h-full p-1 my-4 bg-white'>
                <img className='max-w-[100%] overflow-hidden' src={SignUpImage} alt="" />
                <div className='w-full md:w-[50%] md:h-full p-4'>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className='login_form'>
                        <h1 className='text-xl font-semibold text-[#495055] mb-2'>Sign Up</h1>
                        <p className='text-sm text-[#495055] mb-2'>User Name</p>
                        <div className="flex items-center relative">
                            <HiUser className='absolute text-xl text-[#495055] left-3' />
                            <input type="text" placeholder='User Name' className='w-full focus:outline-none focus:border-[#37BC96] border border-slate-300 rounded-full p-2 pl-10'
                                {...register("userName", {
                                    required: true,
                                    minLength: {
                                        value: 3, message: 'Minimum 3 character required'
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger('userName')
                                }}
                            />
                        </div>
                        <small className='text-[#FF4B2B] pl-1 text-[12px]'>{errors?.userName?.message}</small>

                        <p className='text-sm text-[#495055] mb-2'>Email Address</p>
                        <div className="flex items-center relative">
                            <IoIosMail className='absolute text-xl text-[#495055] left-3' />
                            <input type="email" placeholder='Email Address' className='w-full focus:outline-none focus:border-[#37BC96] border border-slate-300 rounded-full p-2 pl-10'
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid Email"
                                    }
                                })}
                                onKeyUp={(e) => {
                                    trigger('email')
                                }}
                            />
                        </div>
                        <small className='text-[#FF4B2B] pl-1 text-[12px]'>{errors?.email?.message}</small>

                        <p className='text-sm text-[#495055] mb-2'>Enter Password</p>
                        <div className="flex items-center relative">
                            <BsFillLockFill className='absolute text-xl text-[#495055] left-3' />
                            <input type="password" placeholder='Enter Password' className='w-full focus:outline-none focus:border-[#37BC96] border border-slate-300 rounded-full p-2 pl-10'
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
                        <p className=' text-[#000] text-sm font-semibold mt-4 cursor-pointer'>Already have an account? <span onClick={() => navigate('/login')} className="text-[#0B5ED7]"> Login</span></p>

                        <input className='bg-[#37BC96] hover:bg-[#01996D] transition-all delay-100 cursor-pointer mt-4 w-full rounded-full p-2 font-medium text-white' type="submit" value="Sign Up" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;