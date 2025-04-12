import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

// Import redux actions and selectors
import {
  selectProducts,
  selectCart,
  selectLoading,
  selectCartItemsCount,
  selectCartTotal,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/products/productsSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link component={RouterLink} to="/" color="inherit">
        ShopMaster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const totalItems = useSelector(selectCartItemsCount);
  const totalPrice = useSelector(selectCartTotal);

  // Handle cart actions
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleNavigateToDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <main>
        <Box
          sx={{
            background: "linear-gradient(145deg, #f6f9fc 0%, #eef1f5 100%)",
            pt: 6,
            pb: 4,
            boxShadow: "inset 0 -1px 0 0 rgba(0,0,0,0.08)",
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 4,
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="text.primary"
                sx={{
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: { xs: 2, sm: 0 },
                }}
              >
                Premium Products
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: 2,
                  p: 1.5,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(25,118,210,0.1)",
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  color="primary"
                  sx={{
                    mr: 2,
                    "& .MuiBadge-badge": {
                      fontSize: 12,
                      height: 22,
                      minWidth: 22,
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ShoppingCartIcon color="primary" fontSize="large" />
                </Badge>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Cart Total:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{
                maxWidth: 800,
                mx: "auto",
                textAlign: "center",
                mb: 3,
              }}
            >
              Browse our exclusive collection of premium products. All items are
              in stock and ready to ship with 24-hour delivery!
            </Typography>
          </Container>
        </Box>

        <Container
          sx={{
            py: 5,
            "& .MuiGrid-root": {
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle at 50% 40%, rgba(230, 236, 246, 0.4) 0%, rgba(255, 255, 255, 0) 60%)",
                opacity: 0.8,
                zIndex: -1,
              },
            },
          }}
          maxWidth="lg"
        >
          {loading ? (
            <Box sx={{ textAlign: "center", p: 8 }}>
              <Typography align="center" variant="h6" sx={{ mb: 2 }}>
                Loading products...
              </Typography>
              {/* You could add a loading spinner here */}
            </Box>
          ) : (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                      },
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{ position: "relative" }}
                      onClick={() => handleNavigateToDetails(product.id)}
                    >
                      <CardMedia
                        sx={{
                          height: 200,
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                        image={product.image}
                        title={product.title}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1,
                        }}
                      >
                        <Chip
                          label={`${product.availableQty} in stock`}
                          color={
                            product.availableQty < 10 ? "warning" : "success"
                          }
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                        <Chip
                          label={`$${product.price.toFixed(2)}`}
                          color="primary"
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            marginRight: 1.8,
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 2.5,
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                      }}
                      onClick={() => handleNavigateToDetails(product.id)}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: "bold",
                          lineHeight: 1.2,
                          mb: 1.5,
                          height: 50,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          height: 40,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 1.5, pb: 2 }}>
                      {!cart[product.id] ? (
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddToCart(product.id)}
                          fullWidth
                          sx={{
                            py: 1,
                            fontWeight: "bold",
                            borderRadius: 2,
                            textTransform: "none",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            "&:hover": {
                              boxShadow: "0 6px 12px rgba(25,118,210,0.3)",
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: "rgba(25,118,210,0.08)",
                            borderRadius: 2,
                            p: 0.5,
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleDecrementQuantity(product.id)}
                            sx={{
                              bgcolor: "white",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              "&:hover": { bgcolor: "#f5f5f5" },
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {cart[product.id]}
                          </Typography>

                          <IconButton
                            color="primary"
                            onClick={() => handleIncrementQuantity(product.id)}
                            disabled={cart[product.id] >= product.availableQty}
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
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 2,
          mt: "auto",
          background: "linear-gradient(to bottom, #f6f9fc 0%, #eef1f5 100%)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                ShopMaster
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Premium shopping experience with the best products and customer
                service.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Social icons could go here */}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Shop
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                New Arrivals
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Best Sellers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Discounts
              </Typography>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Help Center
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Returns
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Contact Us
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Subscribe to get special offers and news about upcoming sales.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Newsletter form could go here */}
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.08)",
              mt: 4,
              pt: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              © {new Date().getFullYear()} ShopMaster. All rights reserved.
            </Typography>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
