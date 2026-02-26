import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListing, resetListingState } from '../redux/slice/listingSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





const AddListing = () => {

    const loading = useSelector((state) => state.listing.loading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        city: "",
        country: "",
        price: "",
        image: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("city", formData.city);
  data.append("country", formData.country);
  data.append("price", formData.price);
  data.append("image", formData.image);

  try {
    await dispatch(createListing(formData)).unwrap();
    dispatch(resetListingState());
    navigate("/");
  } catch (error) {
    toast.error(error.message || "Failed to create listing");
  }
};
  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Add New Listing</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-lg"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Country"
              className="border p-3 rounded-lg"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <input
            type="number"
            placeholder="Price per night"
            className="w-full border p-3 rounded-lg"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="file"
            className="w-full border p-3 rounded-lg"
            onChange={handleFileChange}
          />

          <button disabled={loading} className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition cursor-pointer">
            {loading ? "Publishing Listing..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddListing;