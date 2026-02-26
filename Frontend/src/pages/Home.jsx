import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListings } from "../redux/slice/listingSlice";
import ListingCard from "../components/ListingCard";


const Home = () => {
  const dispatch = useDispatch();
  const {listings, loading} = useSelector((state) => state.listing);

  useEffect(() =>{
    dispatch(getListings());
  }, [dispatch]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Unique Stays <br /> Anywhere in the World
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover homes, experiences, and places you'll love.
          </p>
          <button className="bg-white text-rose-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Explore Stays
          </button>
        </div>
      </section>


      <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">
          Available Stays
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
              />
            ))}
          </div>
        )}
      </div>
    </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {["Verified Hosts", "Easy Booking", "Secure Payments"].map(
            (item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
                <p className="text-gray-600">
                  Enjoy a seamless and trusted booking experience.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;