import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Send from "../../config/Send";
import ReviewList from "./ReviewList";
import TopNav from "../main/Home/TopNav";
import { Box, Grid, Typography, Card, Avatar, TextareaAutosize, Button, Rating, Pagination } from "@mui/material/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as hs } from "@fortawesome/free-solid-svg-icons";
import { faHeart as hr } from "@fortawesome/free-regular-svg-icons";
import { faCircle as cs } from "@fortawesome/free-solid-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#C4C4C4",
      contrastText: "#fff",
    },
  },
});

function Detail(props) {
  const { wineSeq } = useParams();
  const [wineProfile, setWineProfile] = useState({});
  const level = [1, 2, 3, 4, 5];
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };

  //와인정보
  const getDetail = () => {
    Send.get(`/wine/${wineSeq}`, {
      params: {
        userSeq: props.userSlice.userSeq,
        wineSeq: wineSeq,
      },
    }).then((res) => {
      setWineProfile(res.data);
    });
  };

  // 좋아요
  const postLike = (wineSeq, e) => {
    e.preventDefault();
    const data = {
      userSeq: props.userSlice.userSeq,
      wineSeq: wineSeq,
    };
    Send.post("/wine/like", JSON.stringify(data)).then((res) => {
      if (res.status === 200) {
        getDetail();
      }
    });
  };

  // 좋아요 취소
  const deleteLike = (wineSeq, e) => {
    e.preventDefault();
    Send.delete("/wine/like", {
      params: {
        userSeq: props.userSlice.userSeq,
        wineSeq: wineSeq,
      },
    }).then((res) => {
      if (res.status === 200) {
        getDetail();
      }
    });
  };

  // 리뷰정보
  const handleRate = (event) => {
    setRate(event.target.value);
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  // 리뷰작성
  const postComment = (wineSeq, e) => {
    e.preventDefault();
    const data = {
      reviewScore: rate * 2,
      reviewText: comment,
      userSeq: props.userSlice.userSeq,
      wineSeq: wineSeq,
    };
    Send.post("/wine/review", JSON.stringify(data)).then((res) => {
      setComment("");
      getReview();
    });
  };

  // 리뷰불러오기
  const getReview = () => {
    Send.get(`/wine/review/${wineSeq}`, {
      params: {
        wineSeq: wineSeq,
        page: page - 1,
      },
    }).then((res) => {
      setComments(res.data.content);
      setTotalPage(res.data.totalPages);
    });
  };

  // 리뷰페이지
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    getReview();
  }, [page]);

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <TopNav />
        <Box sx={{ mt: 10, mb: 5, mx: 20, pl: 15, display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: 32, fontWeight: "bold", mb: 1 }}>{wineProfile.kname}</Typography>
                <Typography sx={{ fontSize: 16, mb: 1 }}>{wineProfile.ename}</Typography>
                <Box sx={{ display: "flex" }}>
                  {wineProfile.like_check ? (
                    <FontAwesomeIcon icon={hs} size="2xl" style={{ color: "red" }} onClick={(e) => deleteLike(wineProfile.wineSeq, e)} />
                  ) : (
                    <FontAwesomeIcon icon={hr} size="2xl" onClick={(e) => postLike(wineProfile.wineSeq, e)} />
                  )}
                  <Typography sx={{ mx: 1, mt: 0.5, mb: 3 }}>좋아요 {wineProfile.like_cnt}</Typography>
                </Box>
                <Card sx={{ maxWidth: 400, height: 600, display: "flex", justifyContent: "center" }}>
                  {/* <CardMedia
                    component="img"
                    width="345"
                    height="450"
                    image="http://j6a303.p.ssafy.io/img/Vinha%20da%20Ponte%202016.jpg"
                    objectFit="cover"
                    alt="wine image"
                  /> */}
                  <img
                    style={{
                      maxWidth: 400,
                      minHeight: 600,
                      maxHeight: 600,
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    src={`/img/${wineProfile.ename}.jpg`}
                    onError={handleImgError}
                    alt="사진"
                  />
                </Card>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ px: 15 }}>
                {/* 와인정보 */}
                <Box sx={{ px: 2, display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {wineProfile.type === "RED" ? (
                      <FontAwesomeIcon icon={cs} size="2xl" style={{ color: "#C50D0D" }} />
                    ) : wineProfile.type === "WHITE" ? (
                      <FontAwesomeIcon icon={cs} size="2xl" style={{ color: "#FFF5EE" }} />
                    ) : wineProfile.type === "ROSE" ? (
                      <FontAwesomeIcon icon={cs} size="2xl" style={{ color: "#FFE4E1" }} />
                    ) : wineProfile.type === "SPARKLING" ? (
                      <FontAwesomeIcon icon={cs} size="2xl" style={{ color: "#FFFACD" }} />
                    ) : (
                      <FontAwesomeIcon icon={cs} size="2xl" style={{ color: "#D2691E" }} />
                    )}
                    <Typography sx={{ ml: 2, mr: 3, mt: 0.5, fontSize: 24 }}>{wineProfile.type}</Typography>
                    <hr style={{ height: 30 }} />
                    <Typography sx={{ ml: 3, mt: 0.5, fontSize: 24 }}>{wineProfile.country}</Typography>
                    {wineProfile.winery ? <Typography sx={{ mt: 0.5, fontSize: 24 }}>, {wineProfile.winery}</Typography> : null}
                  </Box>
                  <Typography sx={{ mx: 1, mt: 0.5, fontSize: 32, fontWeight: "bold" }}>{Math.ceil(wineProfile.price / 100) * 100} 원</Typography>
                </Box>
                <hr />
                <Box sx={{ display: "flex", justifyContent: "top", my: 3, ml: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Box sx={{ mr: 2 }}>
                      <Typography sx={{ fontWeight: "bold" }}>산도</Typography>
                      <Box sx={{ display: "flex" }}>
                        {level.map((lv, index) => {
                          return (
                            <div key={index}>
                              {wineProfile.acidity >= lv ? (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2, bgcolor: purple[100] }}>{lv}</Avatar>
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2 }}>{lv}</Avatar>
                              )}
                            </div>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box sx={{ mr: 2 }}>
                      <Typography sx={{ fontWeight: "bold" }}>당도</Typography>
                      <Box sx={{ display: "flex" }}>
                        {level.map((lv, index) => {
                          return (
                            <div key={index}>
                              {wineProfile.sweet >= lv ? (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2, bgcolor: purple[100] }}>{lv}</Avatar>
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2 }}>{lv}</Avatar>
                              )}
                            </div>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box sx={{ mr: 2 }}>
                      <Typography sx={{ fontWeight: "bold" }}>바디</Typography>
                      <Box sx={{ display: "flex" }}>
                        {level.map((lv, index) => {
                          return (
                            <div key={index}>
                              {wineProfile.body >= lv ? (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2, bgcolor: purple[100] }}>{lv}</Avatar>
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2 }}>{lv}</Avatar>
                              )}
                            </div>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box sx={{ mr: 2 }}>
                      <Typography sx={{ fontWeight: "bold" }}>타닌</Typography>
                      <Box sx={{ display: "flex" }}>
                        {level.map((lv, index) => {
                          return (
                            <div key={index}>
                              {wineProfile.tannin >= lv ? (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2, bgcolor: purple[100] }}>{lv}</Avatar>
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, mr: 0.2 }}>{lv}</Avatar>
                              )}
                            </div>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mx: 1.5, mb: 3, display: "flex" }}>
                  <Typography sx={{ mr: 5, fontWeight: "bold" }}>품종</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{wineProfile.grapes}</Typography>
                </Box>
                <Box sx={{ mx: 1.5, mb: 3, display: "flex" }}>
                  <Typography sx={{ mr: 5, fontWeight: "bold" }}>도수</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{wineProfile.alcohol}</Typography>
                </Box>
                {/* <Box sx={{ mx: 1.5, mb: 3, display: "flex" }}>
                  <Typography sx={{ mr: 3, fontWeight: "bold" }}>아로마</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>#자두 #체리 #모카</Typography>
                </Box> */}
                <Box sx={{ mx: 1.5, mb: 3, display: "flex" }}>
                  <Typography sx={{ mr: 3, fontWeight: "bold" }}>페어링</Typography>
                  {wineProfile.food
                    ? wineProfile.food.split(" | ").map((tag, index) => {
                        return (
                          <Typography sx={{ fontWeight: "bold" }} key={index}>
                            #{tag}　
                          </Typography>
                        );
                      })
                    : null}
                </Box>
                {/* 와인리뷰 */}
                <hr />
                <Box sx={{ px: 2 }}>
                  <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: "bold", mr: 3 }}>와인리뷰</Typography>
                    {/* <Typography sx={{ fontSize: 20, fontWeight: "bold", mx: 1 }}>평점</Typography> */}
                    {/* <Typography sx={{ fontSize: 20 }}>{wineProfile.score}</Typography> */}
                  </Box>
                  <Box sx={{ ml: 3, display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Rating name="size-medium" value={rate} precision={0.5} sx={{ mx: 2, height: 5 }} onChange={handleRate} />
                      <Typography sx={{ mt: 3 }}>{rate * 2}점</Typography>
                    </Box>
                    <TextareaAutosize
                      minRows={3}
                      placeholder="리뷰를 입력하세요."
                      style={{ width: 600 }}
                      maxLength="44"
                      value={comment}
                      onChange={handleComment}
                    />
                    <ThemeProvider theme={theme}>
                      <Button sx={{ mx: 2, mb: 4 }} variant="contained" color="neutral" onClick={(e) => postComment(wineProfile.wineSeq, e)}>
                        리뷰 작성
                      </Button>
                    </ThemeProvider>
                  </Box>
                  <ReviewList comments={comments} />
                  <Pagination sx={{ my: 2, mx: 35 }} page={page} count={totalPage} onChange={handleChange} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(Detail);
