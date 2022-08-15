import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import placeHolderImg from "../assets/placeholder.png";
import Box from "@mui/material/Box";
import { DeleteButton, UpdateButton } from "../utils/buttons/Buttons";
import { useSelector } from "react-redux";
import { DeleteNewsContent, DeleteAnouncementContent } from "../auth/firebase";
import { toastWarnNotify } from "../utils/customToastify";

export default function Details() {
  const { state } = useLocation();
  // id, textContent, date, imgUrl, title, userEmail, userId ,comment
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleUpdate = () => {
    const { id, textContent, date, imgUrl, title, userEmail, userId, contentType } = state;
    if (!user) {
      toastWarnNotify("Login for update of this blog!");
    }
    navigate(`/updatecontent/${id}`, {
      state: { id, textContent, date, imgUrl, title, userEmail, userId, contentType },
    });
  };

  const handleDelete = () => {
    const { contentType } = state;
    if(contentType === "news"){
      DeleteNewsContent(state.id, navigate)
    }
    else if(contentType === "anouncement"){
      DeleteAnouncementContent(state.id, navigate)
    }

  }

  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <Typography
          sx={{ fontFamily: "Girassol", textAlign: "center", color: "primary" }}
          variant="h2"
          noWrap
        >
          <Typography
            variant="h2"
            sx={{
              display: { xs: "none", md: "inline" },
              fontFamily: "Girassol",
              textAlign: "center",
              color: "primary",
            }}
          >
            ────
          </Typography>{" "}
          Details{" "}
          <Typography
            variant="h2"
            sx={{
              display: { xs: "none", md: "inline" },
              fontFamily: "Girassol",
              textAlign: "center",
              color: "primary",
            }}
          >
            ────
          </Typography>
        </Typography>
        <Card
          sx={{
            maxWidth: 600,
            width: "90%",
            margin: "auto",
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontFamily: "Girassol" }}
              >
                {state.title.toUpperCase()}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            height="300px"
            image={state.imgUrl ? state.imgUrl : placeHolderImg}
            alt={state.title}
          />
          <CardContent sx={{ bgcolor: "primary.light" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Girassol", fontSize: "1.5rem" }}
            >
              {state.textContent}
            </Typography>
          </CardContent>

          <CardActions disableSpacing sx={{ textAlign: "center" }}>
            <IconButton>
              <ReplyAllIcon
                sx={{ color: "green" }}
                onClick={() => navigate(-1)}
              />
            </IconButton>
          </CardActions>

          {user?.uid === state?.userId ? (
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <UpdateButton onClick={handleUpdate}>UPDATE</UpdateButton>
              <DeleteButton onClick={handleDelete}>
                DELETE
              </DeleteButton>
            </Box>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
