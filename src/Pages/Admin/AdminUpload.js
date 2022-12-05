import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import { dataContext } from '../../App';
import { BASE_URL } from '../../Utils/Urls';

const AdminUpload = ({ openPopup }) => {
    const { loggedInUser, setOpenPopup } = useContext(dataContext);
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();
    const imageSotrageKey = `0ca5c9cdb23add3ecfaff014d8e4ad9c`

    const handleAddData = async data => {
        //Post data to imgbb and generate link
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imageSotrageKey}`
        const formData = new FormData();
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const productDataToInsurt = {
                        image: img,
                        label: data.label,
                        details: data.details,
                        role: loggedInUser?.result?.user?.role
                    }
                    //send data to db
                    fetch(`${BASE_URL}/api/v1/product/add`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(productDataToInsurt)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.success) {
                                toast.success(`Your post ${data.label.slice(0, 5)}... added successfully.`);
                                reset()
                                setOpenPopup(false)
                            }
                            else {
                                toast.error('Failed to add a Product')
                            }
                        }
                        )
                }
            })
    }
    return (
        <div className='popup_wrapper'>
            <div className="popup_content relative">
                <ImCross onClick={() => setOpenPopup(false)} className='absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer' />
                <div>
                    <form onSubmit={handleSubmit(handleAddData)}>
                        <div className="form-group">
                            <label className='text-md font-medium' htmlFor="label">Title</label>
                            <input type="text" className="form-control focus:border-[#37BC96] focus:outline-none w-full border border-slate-300 p-2 rounded-md" id="label" placeholder="Enter Title" {...register("label", { required: true })} />
                            {errors.label && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label className='text-md font-medium' htmlFor="details">Details</label>
                            <textarea className="form-control focus:border-[#37BC96] focus:outline-none w-full border border-slate-300 p-2 rounded-md" id="details" placeholder='Details' rows="2" {...register("details", { required: true })}></textarea>
                            {errors.details && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <input type="file" className="form-control-file" id="image" {...register("image", { required: true })} />
                            {errors.image && <span className='text-danger'>This field is required</span>}
                        </div>
                        <button type="submit" className="bg-[#37BC96] text-white font-semibold mt-5 px-7 rounded-md py-2">Post</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminUpload;