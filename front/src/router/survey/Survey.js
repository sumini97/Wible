import { useState } from "react";
import { connect } from "react-redux";
import TopNav from "../main/Home/TopNav";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuestionOne from "./QuestionOne";
import QuestionTwo from "./QuestionTwo";
import QuestionThree from "./QuestionThree";
import QuestionFour from "./QuestionFour";
import QuestionFive from "./QuestionFive";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#F4C6C9",
      contrastText: "#fff",
    },
    end: {
      main: "#C4C4C4",
      contrastText: "#000000",
    },
  },
});

function Survey(props) {
  const [page, setPage] = useState(1);
  const [wine, setWine] = useState("");
  const [price, setPrice] = useState();
  const [sweet, setSweet] = useState();
  const [body, setBody] = useState();
  const [country, setCountry] = useState(() => []);

  const handlePage = (page) => {
    setPage(page);
    if (wine === "") {
      setPage(page - 1);
      alert("와인종류를 선택해주세요.");
    }
    if (page === 3 && price === undefined) {
      setPage(page - 1);
      alert("가격대를 선택해주세요.");
    }
    if (page === 4 && sweet === undefined) {
      setPage(page - 1);
      alert("당도를 선택해주세요.");
    }
    if (page === 5 && body === undefined) {
      setPage(page - 1);
      alert("바디감을 선택해주세요.");
    }
  };

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <TopNav />
        <Box sx={{ mt: 10, mb: 5, mx: 20, display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
            당신을 위한 wible 와인 추천
          </Typography>
        </Box>
        <Box sx={{ mb: 7, mx: 75, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: 0.19 * `${page}`, height: 15, backgroundColor: "#F4C6C9", borderRadius: 5 }}></Box>
          <Typography>{page} / 5</Typography>
        </Box>
        <Box sx={{ mx: 75 }}>
          {/* 질문 */}
          <Box sx={{ height: 350 }}>
            {page === 1 ? (
              <QuestionOne wine={wine} setWine={setWine}></QuestionOne>
            ) : page === 2 ? (
              <QuestionTwo price={price} setPrice={setPrice}></QuestionTwo>
            ) : page === 3 ? (
              <QuestionThree sweet={sweet} setSweet={setSweet}></QuestionThree>
            ) : page === 4 ? (
              <QuestionFour body={body} setBody={setBody}></QuestionFour>
            ) : page === 5 ? (
              <QuestionFive country={country} setCountry={setCountry}></QuestionFive>
            ) : null}
          </Box>
          {/* 버튼 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
            <ThemeProvider theme={theme}>
              {page === 5 ? (
                <Link
                  to={"/survey/result"}
                  state={{
                    wine: wine,
                    price: price,
                    sweet: sweet,
                    body: body,
                    country: country,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="end">
                    완료
                  </Button>
                </Link>
              ) : (
                <Button variant="contained" color="neutral" onClick={() => handlePage(page + 1)}>
                  다음
                </Button>
              )}
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              {page === 1 ? null : (
                <Button variant="contained" color="neutral" onClick={() => handlePage(page - 1)}>
                  이전
                </Button>
              )}
            </ThemeProvider>
          </Box>
        </Box>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(Survey);
