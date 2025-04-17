import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link as RouterLink } from "react-router-dom";

// Import redux actions and selectors
import {
  selectProducts,
  selectCart,
  selectCartItemsCount,
  selectCartTotal,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/products/productsSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for showing confirmation dialog
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  // State for showing checkout success message
  const [showCheckoutSuccess, setShowCheckoutSuccess] = React.useState(false);

  // Get data from Redux store
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const totalItems = useSelector(selectCartItemsCount);
  const totalPrice = useSelector(selectCartTotal);

  // Filter only products that are in the cart
  const cartItems = products.filter((product) => cart[product.id]);

  // Handle increment quantity
  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  // Handle decrement quantity
  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/");
  };

  // Handle clear cart confirmation
  const handleOpenClearCartDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseClearCartDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setOpenConfirmDialog(false);
  };

  // Handle checkout
  const handleCheckout = () => {
    // In a real app, you would navigate to checkout page
    // For demo purposes, we'll just show a success message and clear the cart
    setShowCheckoutSuccess(true);
    dispatch(clearCart());
  };

  // Close success snackbar
  const handleCloseSuccessSnackbar = () => {
    setShowCheckoutSuccess(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #f6f9fc 0%, #eef1f5 100%)",
          pt: 6,
          pb: 4,
          boxShadow: "inset 0 -1px 0 0 rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 4,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={handleContinueShopping}
              sx={{
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Continue Shopping
            </Button>
            <Typography
              component="h1"
              variant="h3"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: { xs: 2, sm: 0 },
              }}
            >
              Your Shopping Cart
            </Typography>

            <Box sx={{ opacity: 0 }}>Hello World</Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 4, flexGrow: 1 }}>
        {totalItems === 0 ? (
          /* Empty cart message */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
            }}
          >
            <ShoppingCartIcon
              sx={{ fontSize: 80, color: "rgba(25,118,210,0.2)", mb: 3 }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Your cart is empty
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500 }}
            >
              Looks like you haven't added any products to your cart yet. Browse
              our collection and find something you'll love!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingBagIcon />}
              onClick={handleContinueShopping}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
              }}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          /* Cart content */
          <Grid container spacing={4}>
            {/* Cart items list */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  mb: { xs: 3, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Cart Items ({totalItems})
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={handleOpenClearCartDialog}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>

                {/* Cart items */}
                {cartItems.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          width: { xs: "100%", sm: 140 },
                          height: { xs: 140, sm: "auto" },
                          objectFit: "cover",
                        }}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          p: 2,
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="h6"
                              component={RouterLink}
                              to={`/products/${product.id}`}
                              sx={{
                                fontWeight: "bold",
                                color: "text.primary",
                                textDecoration: "none",
                                "&:hover": {
                                  color: "primary.main",
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              {product.title}
                            </Typography>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveItem(product.id)}
                              aria-label="remove item"
                              sx={{ ml: 1 }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.description}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              bgcolor: "rgba(25,118,210,0.08)",
                              borderRadius: 2,
                              p: 0.5,
                            }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleDecrementQuantity(product.id)
                              }
                              size="small"
                              sx={{
                                bgcolor: "white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                "&:hover": { bgcolor: "#f5f5f5" },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                              {cart[product.id]}
                            </Typography>

                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleIncrementQuantity(product.id)
                              }
                              disabled={
                                cart[product.id] >= product.availableQty
                              }
                              size="small"
                              sx={{
                                bgcolor: "white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                "&:hover": { bgcolor: "#f5f5f5" },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="body2" color="text.secondary">
                              ${product.price.toFixed(2)} each
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              ${(product.price * cart[product.id]).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Paper>
            </Grid>

            {/* Order summary */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  position: "sticky",
                  top: 20,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                  Order Summary
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">
                    Subtotal ({totalItems} items)
                  </Typography>
                  <Typography variant="body1">
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" color="success.main">
                    Free
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Estimated Tax</Typography>
                  <Typography variant="body1">
                    ${(totalPrice * 0.07).toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${(totalPrice + totalPrice * 0.07).toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "rgba(25,118,210,0.04)",
                    borderRadius: 2,
                    border: "1px dashed rgba(25,118,210,0.2)",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Secure checkout</strong> with encrypted payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free shipping on all orders. 30-day free returns.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Clear cart confirmation dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseClearCartDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Clear your shopping cart?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove all items from your cart? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseClearCartDialog}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClearCart}
            color="error"
            variant="contained"
            autoFocus
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>

      {/* Checkout success snackbar */}
      <Snackbar
        open={showCheckoutSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your order has been placed successfully! Thank you for shopping with
          us.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
