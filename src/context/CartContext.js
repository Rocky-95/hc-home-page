import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import cartService from "../services/cartService";
import userService from "../services/userService";
import orderService from "../services/orderService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_STORAGE_KEY = "hc_cart";
const WISHLIST_STORAGE_KEY = "hc_wishlist";
const COUPON_STORAGE_KEY = "hc_coupon";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Load localStorage fallback
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      const savedWishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
      const savedCoupon = JSON.parse(localStorage.getItem(COUPON_STORAGE_KEY) || "null");
      setCartItems(savedCart);
      setWishlistItems(savedWishlist);
      setAppliedCoupon(savedCoupon);
    } catch {
      setCartItems([]);
      setWishlistItems([]);
      setAppliedCoupon(null);
    }
  }, []);

  // Detect login and fetch user cart/wishlist
  useEffect(() => {
    const token = localStorage.getItem("hc_token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const profileRes = await userService.getProfile();
        const profile = profileRes.data?.data || profileRes.data;
        const uid = profile?.user_id || profile?.profile_id;
        setUserId(uid);
        setIsLoggedIn(true);

        if (uid) {
          const [cartsRes, wishlistsRes] = await Promise.all([
            cartService.getCarts(),
            cartService.getWishlists(),
          ]);
          const carts = cartsRes.data?.data || cartsRes.data || [];
          const wishlists = wishlistsRes.data?.data || wishlistsRes.data || [];

          const userCart = carts.find((c) => c.user_id === uid);
          const userWishlist = wishlists.find((w) => w.user_id === uid);

          if (userCart) {
            setCartId(userCart.cart_id);
            const itemsRes = await cartService.getCartItems();
            const items = itemsRes.data?.data || itemsRes.data || [];
            setCartItems(items.filter((item) => item.cart_id === userCart.cart_id));
          }

          if (userWishlist) {
            setWishlistId(userWishlist.wishlist_id);
            const wishlistItemsRes = await cartService.getWishlistItems();
            const items = wishlistItemsRes.data?.data || wishlistItemsRes.data || [];
            setWishlistItems(items.filter((item) => item.wishlist_id === userWishlist.wishlist_id));
          }
        }
      } catch (err) {
        // Silent: keep localStorage items
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Persist to localStorage when not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoggedIn]);

  const ensureCart = useCallback(async () => {
    if (!isLoggedIn || !userId) return null;
    if (cartId) return cartId;
    try {
      const res = await cartService.createCart({
        user_id: userId,
        cart_status: "active",
        total_items: 0,
        total_price: 0,
        rcu: "website",
      });
      const newCart = res.data?.data || res.data;
      if (newCart?.cart_id) {
        setCartId(newCart.cart_id);
        return newCart.cart_id;
      }
    } catch {
      return null;
    }
    return null;
  }, [cartId, isLoggedIn, userId]);

  const ensureWishlist = useCallback(async () => {
    if (!isLoggedIn || !userId) return null;
    if (wishlistId) return wishlistId;
    try {
      const res = await cartService.createWishlist({
        user_id: userId,
        wishlist_name: "My Wishlist",
        rcu: "website",
      });
      const newWishlist = res.data?.data || res.data;
      if (newWishlist?.wishlist_id) {
        setWishlistId(newWishlist.wishlist_id);
        return newWishlist.wishlist_id;
      }
    } catch {
      return null;
    }
    return null;
  }, [wishlistId, isLoggedIn, userId]);

  const addToCart = useCallback(
    async ({ productId, productVariantId, sizeLabel, name, price, qty = 1, image }) => {
      if (isLoggedIn && userId) {
        const cid = await ensureCart();
        if (cid) {
          try {
            await cartService.createCartItem({
              cart_id: cid,
              product_id: productId,
              product_variant_id: productVariantId,
              qty,
              unit_price: price,
              rcu: "website",
            });
            const itemsRes = await cartService.getCartItems();
            const items = itemsRes.data?.data || itemsRes.data || [];
            setCartItems(items.filter((item) => item.cart_id === cid));
            return;
          } catch {
            // fall through to localStorage
          }
        }
      }

      setCartItems((prev) => {
        const existing = prev.find(
          (item) => item.product_id === productId && item.product_variant_id === productVariantId
        );
        if (existing) {
          return prev.map((item) =>
            item.product_id === productId && item.product_variant_id === productVariantId
              ? { ...item, qty: item.qty + qty }
              : item
          );
        }
        return [
          ...prev,
          {
            cart_item_id: `local-${Date.now()}`,
            product_id: productId,
            product_variant_id: productVariantId,
            size_label: sizeLabel,
            name,
            unit_price: price,
            qty,
            image,
          },
        ];
      });
    },
    [ensureCart, isLoggedIn, userId]
  );

  const removeFromCart = useCallback(
    async (cartItemId) => {
      if (isLoggedIn) {
        try {
          await cartService.deleteCartItem({ cart_item_id: cartItemId, luu: "website" });
        } catch {
          // silent
        }
      }
      setCartItems((prev) => prev.filter((item) => item.cart_item_id !== cartItemId));
    },
    [isLoggedIn]
  );

  const updateCartQty = useCallback(
    async (cartItemId, qty) => {
      if (qty <= 0) {
        removeFromCart(cartItemId);
        return;
      }
      if (isLoggedIn) {
        try {
          const item = cartItems.find((i) => i.cart_item_id === cartItemId);
          if (item) {
            await cartService.updateCartItem({
              cart_item_id: cartItemId,
              qty,
              unit_price: item.unit_price,
              luu: "website",
            });
          }
        } catch {
          // silent
        }
      }
      setCartItems((prev) =>
        prev.map((item) => (item.cart_item_id === cartItemId ? { ...item, qty } : item))
      );
    },
    [cartItems, isLoggedIn, removeFromCart]
  );

  const addToWishlist = useCallback(
    async ({ productId, productVariantId, sizeLabel, name, price, image }) => {
      if (isLoggedIn && userId) {
        const wid = await ensureWishlist();
        if (wid) {
          try {
            await cartService.createWishlistItem({
              wishlist_id: wid,
              product_id: productId,
              product_variant_id: productVariantId,
              rcu: "website",
            });
            const itemsRes = await cartService.getWishlistItems();
            const items = itemsRes.data?.data || itemsRes.data || [];
            setWishlistItems(items.filter((item) => item.wishlist_id === wid));
            return;
          } catch {
            // fall through to localStorage
          }
        }
      }

      setWishlistItems((prev) => {
        if (prev.find((item) => item.product_id === productId)) return prev;
        return [
          ...prev,
          {
            wishlist_item_id: `local-${Date.now()}`,
            product_id: productId,
            product_variant_id: productVariantId,
            size_label: sizeLabel,
            name,
            unit_price: price,
            image,
          },
        ];
      });
    },
    [ensureWishlist, isLoggedIn, userId]
  );

  const removeFromWishlist = useCallback(
    async (wishlistItemId) => {
      if (isLoggedIn) {
        try {
          await cartService.deleteWishlistItem({
            wishlist_item_id: wishlistItemId,
            luu: "website",
          });
        } catch {
          // silent
        }
      }
      setWishlistItems((prev) => prev.filter((item) => item.wishlist_item_id !== wishlistItemId));
    },
    [isLoggedIn]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.unit_price || 0) * (item.qty || 1), 0);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discount_type === "percent"
      ? Math.round(cartTotal * (appliedCoupon.discount_value / 100) * 100) / 100
      : Math.min(appliedCoupon.discount_value, cartTotal)
    : 0;
  const discountedTotal = Math.max(0, cartTotal - discountAmount);

  const applyCoupon = useCallback(async (code) => {
    setCouponError("");
    if (!code.trim()) return;
    try {
      const [couponsRes, discountsRes] = await Promise.all([
        orderService.getCoupons(),
        orderService.getDiscounts(),
      ]);
      const coupons = couponsRes.data?.data || couponsRes.data || [];
      const discounts = discountsRes.data?.data || discountsRes.data || [];

      const coupon = coupons.find(
        (c) => c.coupon_code?.toLowerCase() === code.trim().toLowerCase() && c.isactive !== false
      );
      if (!coupon) {
        setCouponError("Invalid coupon code.");
        return;
      }
      const now = new Date();
      const validFrom = coupon.valid_from ? new Date(coupon.valid_from) : null;
      const validTill = coupon.valid_till ? new Date(coupon.valid_till) : null;
      if (validFrom && now < validFrom) {
        setCouponError("Coupon is not yet valid.");
        return;
      }
      if (validTill && now > validTill) {
        setCouponError("Coupon has expired.");
        return;
      }

      // Match discount by name if available, otherwise use first active discount as fallback
      let discount = discounts.find(
        (d) => d.discount_name?.toLowerCase() === coupon.description?.toLowerCase() && d.isactive !== false
      );
      if (!discount) {
        discount = discounts.find((d) => d.isactive !== false);
      }
      const couponData = {
        coupon_id: coupon.coupon_id,
        code: coupon.coupon_code,
        discount_name: discount?.discount_name || coupon.coupon_code,
        discount_type: discount?.discount_type || "percent",
        discount_value: discount?.discount_value || 10,
      };
      setAppliedCoupon(couponData);
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(couponData));
    } catch {
      setCouponError("Could not validate coupon. Please try again.");
    }
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError("");
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, []);

  const clearCart = useCallback(async () => {
    if (isLoggedIn && cartId) {
      try {
        const itemsRes = await cartService.getCartItems();
        const items = (itemsRes.data?.data || itemsRes.data || []).filter(
          (item) => item.cart_id === cartId
        );
        await Promise.all(
          items.map((item) =>
            cartService.deleteCartItem({
              cart_item_id: item.cart_item_id,
              luu: "website",
            })
          )
        );
      } catch {
        // silent
      }
    }
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, [cartId, isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        addToWishlist,
        removeFromWishlist,
        clearCart,
        cartCount,
        cartTotal,
        discountedTotal,
        discountAmount,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        loading,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
