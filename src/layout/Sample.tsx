import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";

const Sample = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FlexiView
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to FlexiView
        </Typography>

        <Card sx={{ maxWidth: 345, marginTop: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              MUI Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore MUI components and customize styles with ease using
              FlexiView.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Sample;
