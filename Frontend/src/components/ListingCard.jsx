import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={listing.images[0].url}
          alt={listing.title}
          className="h-52 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">
            {listing.title}
          </h3>
          <p className="text-gray-500 text-sm">
            {listing.city}, {listing.country}
          </p>
          <p className="mt-2 font-semibold">
            ₹{listing.price}
            <span className="text-sm text-gray-500"> / night</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;