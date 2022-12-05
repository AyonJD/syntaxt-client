import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { dataContext } from '../../App';

const NavigationDropdown = ({ handleScreen }) => {
    const { loggedInUser, setOpenPopup } = useContext(dataContext);
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        handleDropDown();
        navigate('/login');
        toast.success('Logged out successfully');

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <div className={`dropdown ${handleScreen === "include_sm_show" ? 'hidden sm:block' : handleScreen === "exclude_sm_show" ? 'sm:hidden' : ''}`}>
            <button
                className="text-white delay-100 transition-all ease-in-out bg-[#37BC96] hover:bg-[#01996D] focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                onClick={handleDropDown}
            >
                {loggedInUser?.result?.user?.userName}
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            <div
                id="dropdown"
                className={`z-10 w-44 bg-white rounded divide-y absolute right-0 top-[3.7rem] divide-gray-100 shadow ${isOpen ? "block" : "hidden"
                    }`}
            >
                <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-300 shadow ">

                    {
                        loggedInUser?.result?.user?.role === "admin" && (
                            <li
                                onClick={() => {
                                    handleDropDown();
                                    setOpenPopup(true);
                                }}
                            >
                                <div className="block py-2 px-4 cursor-pointer hover:bg-gray-100">
                                    Upload Data
                                </div>
                            </li>
                        )
                    }
                    <li
                    >
                        <div className="block py-2 px-4">
                            <button onClick={handleLogout} className=" text-white border-[#37BC96] border px-4 py-1 rounded-md bg-[#37BC96] delay-100 transition-all ease-in-out hover:bg-[#01996D]">Logout</button>
                        </div>

                    </li>

                </ul>
            </div>
        </div>
    );
};

export default NavigationDropdown;