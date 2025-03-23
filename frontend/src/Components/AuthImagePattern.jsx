import { Box, Grid2 as Grid, Typography } from "@mui/material";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        justifyContent: "center",
        p: 6,
      }}
    >
      <Box maxWidth={400} textAlign="center">
        <Grid container spacing={1.5} justifyContent="center" mb={4}>
          {[...Array(9)].map((_, i) => (
            <Grid
              key={i}
              size={4}
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 2,
                backgroundColor: "primary.main",
                opacity: 0.1,
                animation: i % 2 === 0 ? "pulse 1.5s infinite" : "none",
                "@keyframes pulse": {
                  "0%": { opacity: 0.1 },
                  "50%": { opacity: 0.3 },
                  "100%": { opacity: 0.1 },
                },
              }}
            />
          ))}
        </Grid>
        <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="secondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthImagePattern;
