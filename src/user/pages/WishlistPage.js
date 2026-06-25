import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your wishlist is empty</h2>
        <p className="text-muted">Save items you love to see them here.</p>
        <Link to="/" className="btn btn-dark mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Wishlist</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {wishlistItems.map((item) => (
          <div className="col" key={item.wishlist_item_id}>
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={item.image || "https://via.placeholder.com/300x400?text=No+Image"}
                alt={item.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "280px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-dark btn-sm flex-grow-1"
                    onClick={() =>
                      addToCart({
                        productId: item.product_id,
                        productVariantId: item.product_variant_id,
                        sizeLabel: item.size_label || item.sizeLabel,
                        name: item.name,
                        price: item.unit_price || 0,
                        qty: 1,
                        image: item.image,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromWishlist(item.wishlist_item_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
