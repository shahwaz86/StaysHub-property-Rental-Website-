import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListing } from "../redux/slice/listingSlice";
import { createBooking } from "../redux/slice/bookingSlice";
import { useNavigate } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleListing, loading } = useSelector(
    (state) => state.listing
  );

  const { loadingInBooking, error } =  useSelector((state) => state.booking);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(getSingleListing(id));
  }, [dispatch, id]);

  // calculate total nights
  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff =
      new Date(endDate) - new Date(startDate);
    return diff > 0
      ? diff / (1000 * 60 * 60 * 24)
      : 0;
  }, [startDate, endDate]);

  const totalPrice = nights * (singleListing?.price || 0);

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select dates");
      return;
    }

    dispatch(
      createBooking({
        listingId: singleListing._id,
        startDate,
        endDate,
      })
    );
    Navigate("/my-bookings");
  };

  if (loading || !singleListing) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* Image */}
      <img
        src={singleListing.images[0].url}
        alt={singleListing.title}
        className="w-full h-[420px] object-cover rounded-2xl mb-10"
      />

      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">
            {singleListing.title}
          </h1>

          <p className="text-gray-500 mb-6">
            {singleListing.city}, {singleListing.country}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {singleListing.description}
          </p>
        </div>

        {/* RIGHT – BOOKING CARD */}
        <div className="border rounded-2xl p-6 shadow h-fit">
          <p className="text-2xl font-bold mb-4">
            ₹{singleListing.price}
            <span className="text-sm font-normal text-gray-500">
              {" "} / night
            </span>
          </p>

          {/* Dates */}
          <div className="space-y-3 mb-4">
            <input
              type="date"
              className="w-full border p-2 rounded"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="w-full border p-2 rounded"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Price */}
          {nights > 0 && (
            <p className="mb-4 font-medium">
              {nights} nights × ₹{singleListing.price} ={" "}
              <span className="font-bold">₹{totalPrice}</span>
            </p>
          )}

          <button
            onClick={handleBooking}
            disabled={loadingInBooking}
            className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 disabled:opacity-60"
          >
            {loadingInBooking ? "Booking..." : "Reserve"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;