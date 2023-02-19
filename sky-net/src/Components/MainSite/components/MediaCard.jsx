import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IMAGE_URL from "../assets/images.jpeg";
import { useTheme } from "@mui/material";
import { tokens } from "../theme/theme";

export default function MediaCard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card
      sx={{
        width: 250,
        margin: "10px",
        backgroundColor: colors.blueAccent[900],
      }}
    >
      <CardMedia sx={{ height: 140 }} image={IMAGE_URL} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
