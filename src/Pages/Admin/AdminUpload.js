import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import { dataContext } from '../../App';

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
                    fetch(`https://floating-ocean-13139.herokuapp.com/blogs`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(productDataToInsurt)
                    })
                        .then(res => res.json())
                        .then(inserted => {

                            if (inserted.insertedId) {
                                toast.success(`Your post ${data.title.slice(0, 5)}... added successfully.`);

                                reset()
                            }
                            else {
                                toast.error('Failed to add a Article')
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
                    jhgjhgjgh
                </div>
            </div>
        </div>
    );
};

export default AdminUpload;