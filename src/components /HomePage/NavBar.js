import React from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Grid, 
  Button, 
  ThemeProvider, 
  createTheme,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

export const NavBar = () => {
  const navigate = useNavigate(); 

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: '#555' }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <StyledTypography variant="h6">AI Marketplace</StyledTypography>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => navigate("/model/add")}
              >
                Add Model
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
