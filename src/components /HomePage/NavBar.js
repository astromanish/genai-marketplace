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
    fontFamily: "Poppins",
    fontWeight: '600',
    fontStyle: 'normal',
  },
});

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

export const NavBar = () => {
  const navigate = useNavigate(); 

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <StyledTypography variant="h6">Tools of the Future</StyledTypography>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => navigate("/model/add")}
                sx={{ backgroundColor: '#424242' }}
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

