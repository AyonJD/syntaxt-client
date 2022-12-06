import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { dataContext } from '../../App';
import { BASE_URL } from '../../Utils/Urls';

const ContentPage = () => {
    const { loggedInUser, allUser } = useContext(dataContext);
    const [userRole, setUserRole] = useState(null);

    const handleUserRole = async (role, userId) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/user/update/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role })
            });
            const parseData = await response.json();
            toast.success(`User role updated to ${role}`);
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div>
            <div className="content_page_bg relative">
                <div className="content flex flex-col justify-center items-start py-5 height">
                    <h1 className='text-white text-3xl sm:text-5xl px-10 font-bold'>Syntax Solution,</h1>
                    <h1 className='text-white text-sm sm:text-md mt-5 w-full md:w-1/2 px-10 text-justify font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae fuga quaerat nesciunt deleniti porro explicabo provident libero ut corporis soluta est quas, ea numquam, quasi, eveniet omnis consequuntur distinctio alias ad quam in repellat! Debitis quisquam voluptate incidunt error quia, excepturi nostrum aliquid magni earum fuga! Illo amet inventore voluptatibus! Corporis tempora temporibus cumque id veniam, quae saepe consectetur eaque deserunt. Libero quia ut iusto nostrum quidem sapiente molestias labore</h1>
                </div>
            </div>
            <div className='mid-container'>
                <div>
                    <h1 className='text-3xl w-fit mx-auto pb-2 font-bold border-b-4 border-[#37BC96]'>Our Services</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                        {/* make array and map */}
                        {
                            Array(4).fill().map((_, i) => (
                                <div className='flex justify-between bg-[#F8F9FA] px-3 py-5 rounded-lg'>
                                    <BsFillBagCheckFill className="h-20 w-20 text-[#37BC96] mr-6" />
                                    <div>
                                        <h1 className='text-xl font-bold'>Lorem Ipsum</h1>
                                        <p className='text-justify text-gray-600 font-normal text-[15px] mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, accusantium? amet consectetur adipisicing elit. Iusto, accusantium</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Admin action */}

                <h1 className='mb-4 text-2xl font-semibold mt-16'>{allUser?.result?.length} Active User</h1>
                {
                    loggedInUser?.result?.user?.role === 'user' && (
                        <h1 className='text-xl font-medium'>Please login as Admin to interact with user.</h1>
                    )
                }

                {
                    loggedInUser?.result?.user?.role === 'admin' && (
                        allUser?.result?.length === 0 ? <h1 className="text-center text-2xl my-10 font-medium">No Order Found</h1> : (
                            <div className="w-full handle_table_height overflow-y-auto pb-5">
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra table-compact w-full">
                                        <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allUser?.result?.map((user, index) => {
                                                    return (
                                                        <tr className="hover" key={index}>
                                                            <td className="font-medium">{index + 1}</td>
                                                            <td className="font-medium">{user?.userName}</td>
                                                            <td className="font-medium">{user?.email}</td>
                                                            <td className="font-medium">{(user?.role === 'admin' || userRole === 'admin') ? 'admin' : 'user'}</td>
                                                            <td>
                                                                {
                                                                    user?.role === "admin" || userRole === 'admin' ? (
                                                                        <button
                                                                            onClick={() => {
                                                                                setUserRole("user");
                                                                                handleUserRole('user', user?._id);
                                                                            }}
                                                                            className="text-white bg-[#37BC96] px-4 py-1 rounded-sm hover:bg-transparent border border-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] delay-75 ease-in-out font-semibold w-[150px] ">Demote to User</button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => {
                                                                                setUserRole("admin");
                                                                                handleUserRole('admin', user?._id);
                                                                            }}
                                                                            className="text-white bg-[#37BC96] px-4 py-1 rounded-sm hover:bg-transparent border border-transparent hover:border-[#37BC96] hover:border hover:text-[#37BC96] delay-75 ease-in-out font-semibold w-[150px] ">Promote to Admin</button>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ContentPage;