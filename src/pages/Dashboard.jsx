import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFetch } from "../auth/firebase";
import { useSelector } from "react-redux";
import loadingGif from "../assets/loading.gif";
import { Box } from "@mui/material";
import CardComp from "../components/CardComp";

const Dashboard = () => {
  const { isLoading } = useFetch();
  const { newsContent } = useSelector((state) => state.newsContent);
  const { anouncementsContent } = useSelector((state) => state.anouncementsContent);

  return (
    <div>
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
        </Typography>
        Dashboard{" "}
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
      {isLoading && (
        <Box
          component="img"
          sx={{
            width: 40,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            cursor: "pointer",
          }}
          alt="loading"
          src={loadingGif}
        />
      )}

      {!isLoading && (
        <>
          <Container sx={{ marginTop: "4rem" }}>
             NEWS{" "}
            <Grid
              container
              justifyContent="center"
              spacing={2}
              sx={{ paddingTop: "2rem" }}
            >
              {newsContent?.map((content) => (
                <Grid item key={content.id}>
                  <CardComp content={content} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container sx={{ marginTop: "4rem" }}>
             ANOUNCEMENTS{" "}
            <Grid
              container
              justifyContent="center"
              spacing={2}
              sx={{ paddingTop: "2rem" }}
            >
              {anouncementsContent?.map((content) => (
                <Grid item key={content.id}>
                  <CardComp content={content} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};
export default Dashboard;
