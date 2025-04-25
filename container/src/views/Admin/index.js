import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  Security as SecurityIcon,
  DashboardCustomize as DashboardIcon,
  People as PeopleIcon,
  BarChart as AnalyticsIcon,
} from "@mui/icons-material";

const Admin = ({ userData }) => {
  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          my: 4,
          borderRadius: 2,
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#fff",
              color: "#1a237e",
              fontWeight: "bold",
              fontSize: "1.5rem",
              mr: 2,
            }}
          >
            {userData.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ mb: 0.5, fontWeight: "bold" }}>
              Welcome, {userData.name}
            </Typography>
            <Typography variant="body1">
              <Chip
                label="Super Admin"
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  mr: 1,
                }}
              />
              {userData.email}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#1976d2",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          View Profile
        </Button>
      </Paper>

      {/* Quick Stats */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        System Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ACTIVE USERS
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#e8eaf6",
                    color: "#3949ab",
                    width: 32,
                    height: 32,
                  }}
                >
                  <PeopleIcon fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                128
              </Typography>
              <Typography variant="body2" sx={{ color: "success.main" }}>
                +12% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  PENDING APPROVALS
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#fff8e1",
                    color: "#ff6d00",
                    width: 32,
                    height: 32,
                  }}
                >
                  <SecurityIcon fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                5
              </Typography>
              <Typography variant="body2" sx={{ color: "warning.main" }}>
                2 require immediate attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  DEPARTMENTS
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#e0f2f1",
                    color: "#00897b",
                    width: 32,
                    height: 32,
                  }}
                >
                  <DashboardIcon fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                12
              </Typography>
              <Typography variant="body2" sx={{ color: "info.main" }}>
                2 new this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ACTIVITY LEVEL
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "#f3e5f5",
                    color: "#8e24aa",
                    width: 32,
                    height: 32,
                  }}
                >
                  <AnalyticsIcon fontSize="small" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                87%
              </Typography>
              <Typography variant="body2" sx={{ color: "success.main" }}>
                +5% from average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Admin Actions */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              Recent Activity
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  User "Maria Lopez" created
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Today, 10:30 AM
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  Permission changed for "Marketing" group
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Yesterday, 4:15 PM
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  System update completed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Apr 23, 2025
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  Security policy updated
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Apr 21, 2025
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              Administrative Tools
            </Typography>
            <Button
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#42a5f5",
                },
              }}
            >
              Manage User Permissions
            </Button>
            <Button
              variant="outlined"
              sx={{
                mb: 2,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#42a5f5",
                  bgcolor: "rgba(26,35,126,0.04)",
                },
              }}
            >
              System Configuration
            </Button>
            <Button
              variant="outlined"
              sx={{
                mb: 2,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#42a5f5",
                  bgcolor: "rgba(26,35,126,0.04)",
                },
              }}
            >
              View Security Logs
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#42a5f5",
                  bgcolor: "rgba(26,35,126,0.04)",
                },
              }}
            >
              Generate Reports
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
