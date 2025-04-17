import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductById,
  selectCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../../redux/products/productsSlice";

// MUI Components
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  IconButton,
  Chip,
  Rating,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PaymentIcon from "@mui/icons-material/Payment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get product and cart from Redux store
  const product = useSelector((state) => selectProductById(state, productId));
  const cart = useSelector(selectCart);

  // Local state for tabs
  const [tabValue, setTabValue] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Check if product exists
  useEffect(() => {
    if (!product) {
      // Product not found, redirect to products page
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null; // Return early if product is not found

  // Cart functionality
  const handleAddToCart = () => {
    dispatch(addToCart(productId));
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(productId));
  };

  const inCart = Boolean(cart[productId]);
  const quantity = cart[productId] || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Breadcrumbs Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate("/")} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Product Details */}
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                minHeight: "400px",
              }}
            />
            <Chip
              label={`$${product.price.toFixed(2)}`}
              color="primary"
              size="medium"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                fontWeight: "bold",
                fontSize: "1rem",
                px: 2,
                py: 2.5,
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: { xs: 2, sm: 3 },
            }}
          >
            {/* Title and Rating */}
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography sx={{ ml: 1, color: "text.secondary" }}>
                4.5 (24 reviews)
              </Typography>
            </Box>

            {/* Stock Status */}
            <Box sx={{ display: "flex", mb: 3 }}>
              <Chip
                label={`${product.availableQty} in stock`}
                color={product.availableQty < 10 ? "warning" : "success"}
                size="medium"
                sx={{ fontWeight: "500" }}
              />
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{ mb: 4, color: "text.secondary", lineHeight: 1.8 }}
            >
              {product.description}
              {/* Extended description for product details page */}
              {` This premium product offers exceptional quality and performance.
              Designed with user comfort and functionality in mind, it provides
              an outstanding experience that exceeds expectations. Our products
              are built to last with durable materials and rigorous quality control.`}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Quantity and Add to Cart */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mr: 3, fontWeight: "bold" }}
              >
                Quantity:
              </Typography>

              {!inCart ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
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
                    onClick={handleDecrementQuantity}
                    sx={{
                      bgcolor: "white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography variant="h6" sx={{ fontWeight: "bold", mx: 3 }}>
                    {quantity}
                  </Typography>

                  <IconButton
                    color="primary"
                    onClick={handleIncrementQuantity}
                    disabled={quantity >= product.availableQty}
                    sx={{
                      bgcolor: "white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Shipping and Returns */}
            <Box sx={{ mt: "auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 1.5,
                    }}
                  >
                    <LocalShippingIcon
                      color="primary"
                      sx={{ mb: 1, fontSize: 28 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      Free Shipping
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 1.5,
                    }}
                  >
                    <AssignmentReturnIcon
                      color="primary"
                      sx={{ mb: 1, fontSize: 28 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      Easy Returns
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 1.5,
                    }}
                  >
                    <PaymentIcon color="primary" sx={{ mb: 1, fontSize: 28 }} />
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      Secure Payment
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Product Tabs (Description, Specifications, Reviews) */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Paper
          elevation={0}
          sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderRadius: 2 }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {product.description}
              {` This premium product offers exceptional quality and performance.
              Designed with user comfort and functionality in mind, it provides
              an outstanding experience that exceeds expectations.

              Our products are built to last with durable materials and rigorous quality control.
              Each piece undergoes extensive testing to ensure it meets our high standards for
              performance and reliability.

              We're committed to customer satisfaction and stand behind our products with
              a comprehensive warranty and exceptional customer service. If you have any
              questions or concerns, our support team is ready to help you.`}
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Product Specifications
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Dimensions
                  </Typography>
                  <Typography variant="body2">
                    10.2 x 5.8 x 2.3 inches
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="body2">1.2 pounds</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Material
                  </Typography>
                  <Typography variant="body2">Aluminum, Plastic</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Color
                  </Typography>
                  <Typography variant="body2">
                    Black, Silver, Rose Gold
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  Additional Information
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Warranty
                  </Typography>
                  <Typography variant="body2">
                    1 Year Manufacturer Warranty
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body2">
                    Free Shipping (2-3 business days)
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Returns
                  </Typography>
                  <Typography variant="body2">
                    30-day money-back guarantee
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    SKU
                  </Typography>
                  <Typography variant="body2">
                    PRD-{productId}0{productId}5
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box>
              {/* Sample Reviews - In a real application, these would be loaded from an API */}
              {[1, 2, 3].map((review) => (
                <Box key={review} sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mr: 2 }}
                    >
                      Customer {review}
                    </Typography>
                    <Rating
                      value={5 - review * 0.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Posted on {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {review === 1 &&
                      "Absolutely love this product! It exceeded all my expectations in terms of quality and functionality. Would definitely recommend to anyone looking for a premium experience."}
                    {review === 2 &&
                      "Great product, works exactly as described. Shipping was fast and packaging was good. The only reason I'm not giving 5 stars is that the instructions could be clearer."}
                    {review === 3 &&
                      "Decent product for the price. It does what it's supposed to do, but the build quality could be better. Customer service was helpful when I had questions."}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetails;
