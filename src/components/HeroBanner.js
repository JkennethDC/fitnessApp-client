import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HeroImage from "../images/Home.jpg";

export default function HeroBanner() {
  return (
    <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="#E93A3B" fontWeight="600" fontSize="26px">
            Fitness Club
          </Typography>
          <Typography fontWeight="700" fontSize={{ lg: '44px', xs: '40px' }}>
            Achieve Your Goal <br /> With a friendly Helper
          </Typography>
        </Box>

        <Box component="img"
          src={HeroImage}
          alt="banner"
          sx={{
            maxHeight: { xs: '40vh', md: '60vh' }, 
            width: 'auto',
            display: { xs: 'none', md: 'block' }, 
            ml: 3
          }}
        />
      </Stack>
    </Box>
  );
}
