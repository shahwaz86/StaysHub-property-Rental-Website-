import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyBookings,
  cancelBooking,
} from "../redux/slice/bookingSlice";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loadingInBooking } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  return (
    <div className="pt-28 max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {loadingInBooking ? (
        <p>Loading...</p>
      ) : (
        
        bookings
          .filter((booking) => booking.status !== "cancelled") 
          .map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl p-4 mb-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {booking.listing.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(booking.startDate).toDateString()} →
                  {new Date(booking.endDate).toDateString()}
                </p>
                <p className="font-medium">
                  ₹{booking.totalPrice}
                </p>
              </div>

              {booking.status === "confirmed" && (
                <button
                  onClick={() => {
                   
                    dispatch(cancelBooking(booking._id));
                  }}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default MyBookings;