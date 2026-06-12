import React, { useState,useEffect } from 'react';
// import  Add  from '../images/img.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditFood = () => {
  const navigate = useNavigate();

  // useParams reads the id from the URL
  // For example: /edit-food/64f1a2b3c4d5e6f7a8b9c0d1
  // params.id = "64f1a2b3c4d5e6f7a8b9c0d1"
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // shows existing image
  const [errors, setErrors] = useState({});

  // fetch existing data to pre-fill the form
  useEffect(() => {
    const getItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/menu/${id}` ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }});
        const item = res.data;

        // pre-fill form with existing values
        setFormData({
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category,
        });

        // show existing image as preview
        setPreview(item.image);
      } catch (err) {
        console.log(err.message);
      }
    };

    getItem();
  }, [id]); // runs when id changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, image: 'Only JPG, PNG or WEBP allowed' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, image: 'Image must be less than 2MB' });
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file)); // show new image preview
    setErrors({ ...errors, image: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    // if (!formData.description.trim()) newErrors.description = 'Description is required';
    // if (!formData.category.trim()) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleDelete = async()=>{
    // try {
      const token = localStorage.getItem('token');
      let res = await toast.promise( axios.delete(`/api/menu/${id}` ,
        {
                headers: {
                    Authorization: `Bearer ${token}`}
            }
      ) ,
      {
              pending: '🍔 Deleting food item...',
              success: '✅ Food item Deleted Successfully!',
              error: {
                  render({ data }) {
                      // shows actual error from backend
                      return data?.response?.data?.errors?.[0] 
                          || data?.response?.data?.error 
                          || 'Something went wrong';
                  }
              }
          });
      // toast.success('Food item deleted!');
      // onDelete(item._id);  // tells parent to remove it from state
      navigate(-1);
    // } catch (err) {
    //   const message = err.response?.data?.error || 'Something went wrong';
    //   toast.error(message);
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', formData.category);

      // only append image if user selected a new one
      if (image) data.append('image', image);
      const token = localStorage.getItem('token');

      await toast.promise(axios.put(`/api/menu/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }}) ,
        {
          pending: '🍔 Uploading food item...',
          success: '✅ Food item added!',
          error: {
              render({ data }) {
                  // shows actual error from backend
                  return data?.response?.data?.errors?.[0] 
                      || data?.response?.data?.error 
                      || 'Something went wrong?';
              }
          }
        }
      );

      // alert('Food item updated!');
      navigate(-1, { replace: true });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen gap-4 bg-[#faf8f3]'>
      <h1 className='text-4xl font-bold'>Edit Food Item</h1>
      <button><i onClick={handleDelete} className="fa-solid fa-trash text-4xl font-bold 
      text-black cursor-pointer"></i></button>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <div>
            <label htmlFor="name">Item Name:</label>
          <input type="text" name="name" placeholder="Food name"
          className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'
            value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
            <label htmlFor="price">Item Price:</label>
          <input type="number" name="price" placeholder="Price"
          className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'
            value={formData.price} onChange={handleChange} />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        </div>

        <div>
            <label htmlFor="description">Item Description:</label>
          <input type="text" name="description" placeholder="Description"
          className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'
            value={formData.description} onChange={handleChange} />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category">Item Category:</label>
          <input type="text" name="category" placeholder="Category"
          className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'
            value={formData.category} onChange={handleChange} />
          {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
        </div>

        <div>
          {/* show existing or new image preview */}
          {preview && <img src={preview} alt="preview" width="100" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div>

        <button className='bg-[#fe6a36] text-white py-3 px-4 cursor-pointer' type="submit">Update Item</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>

      </form>
    </div>
  );
};

export default EditFood;
