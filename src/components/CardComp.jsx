import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import placeHolderImg from "../assets/placeholder.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { toastWarnNotify } from "../utils/customToastify";

export default function CardComp({ content }) {
  const [isValid, setIsValid] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { open, data } = useSelector((state) => state.modal);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);

  const navigate = useNavigate();

  const openDetails = () => {
    const { id, textContent, date, imgUrl, title, userEmail, userId, contentType } =
      content;
    if (!user) {
      toastWarnNotify("Login for detials!");
    }
    navigate(`/detail/${id}`, {
      state: {
        id,
        textContent,
        date,
        imgUrl,
        title,
        userEmail,
        userId,
        contentType
      },
    });
  };

  function checkImage(url) {
    var image = new Image();
    image.onload = function () {
      if (this.width > 0) {
        setIsValid(true);
      }
    };
    image.onerror = function () {
      setIsValid(false);
    };
    image.src = url;
  }

  checkImage(content.imgUrl);

  return (
    <>
      {open && (
        <Modal
          name={open}
          data={data}
          handleOpen={handleOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <Card sx={{ minWidth: 345, maxWidth: 345 }}>
        <Box onClick={openDetails} sx={{ cursor: "pointer" }}>
          <CardMedia
            component="img"
            height={140}
            image={isValid ? content.imgUrl : placeHolderImg}
            alt="content-img"
          />

          <CardContent sx={{ bgcolor: "primary.light", height: "125px" }}>
            <Typography
              variant="h5"
              component="h2"
              color="primary"
              sx={{ fontFamily: "Girassol" }}
            >
              {content.title}
            </Typography>
            <Typography variant="body2" color="secondary.light">
              {content.date}
            </Typography>
            <p
              variant="body1"
              color="secondary"
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": 2,
                "-webkit-box-orient": "vertical",
                "text-overflow": "ellipsis",
                overflow: "hidden",
                fontSize: "0.8rem",
              }}
            >
              {content.textContent?.length > 80
                ? content.textContent.slice(0, 80) + "..."
                : content.textContent}
            </p>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
          <Avatar sx={{ m: 1, width: 24, height: 24 }} />
          <Typography variant="body1" color="secondary">
            {content.userEmail}{" "}
          </Typography>
        </Box>
      </Card>
    </>
  );
}
