import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Divider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              py: 2,
              px: 3,
              color: "white",
              background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Unauthorized Access
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  color: "white",
                  bgcolor: "error.main",
                  p: 1.2,
                  borderRadius: "50%",
                  mr: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(211,47,47,0.3)",
                }}
              >
                <LockIcon />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Admin Access Required
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You do not have permission to access this Admin area. This
                  route requires special authorization privileges that are not
                  available with your current account.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: "medium", mb: 1 }}>
                Please contact your application administrator:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: salman@gmail.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: (123) 456-7890
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "rgba(211,47,47,0.04)",
                borderRadius: 2,
                border: "1px dashed rgba(211,47,47,0.2)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InfoOutlinedIcon sx={{ color: "error.main", mr: 2 }} />
              <Typography variant="body2" color="text.secondary">
                If you believe you should have access to this area, please
                verify you are logged in with the correct account.
              </Typography>
            </Box>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              px: 4,
              pb: 4,
              pt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              color="error"
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
                py: 1.2,
                boxShadow: "0 4px 12px rgba(211,47,47,0.3)",
                background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
              }}
              endIcon={<ArrowForwardIcon fontSize="small" />}
            >
              Go to Homepage
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized;
