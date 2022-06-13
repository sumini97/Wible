import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TopNav from "./TopNav";
import WineList from "./WineList";
import WineRecommendList from "./WineRecommendList";
import { Box, Link, Grid, Typography, ToggleButtonGroup, ToggleButton, Select, MenuItem } from "@mui/material/";
import Send from "../../../config/Send";
import banner from "../../../res/img/banner_fix.png";

function Home({ userSlice }) {
  const [popular, setPopular] = useState("red");
  const [recommend, setRecommend] = useState("red");
  const [criteria, setCriteria] = useState("score");

  const handlePopular = (event, newPopular) => {
    setPopular(newPopular);
  };
  const handleRecommend = (event, newRecommend) => {
    setRecommend(newRecommend);
  };
  const handleCriteria = (event) => {
    setCriteria(event.target.value);
  };

  const getData = () => {
    Send.get(`/wine/best`);
  };

  const [bestWine, setBestWine] = useState([]);
  const getBestWine = () => {
    Send.get(`/wine/best/${criteria}/${popular}`).then((res) => {
      setBestWine(res.data);
    });
  };

  const [recomWine, setRecomWine] = useState([]);
  const getRecomWine = () => {
    Send.get(`/wine/${recommend}/${userSlice.userSeq}/`).then((res) => {
      setRecomWine(res.data);
    });
  };

  useEffect(() => {
    getBestWine();
  }, [popular, criteria]);

  useEffect(() => {
    getRecomWine();
  }, [recommend, userSlice.userSeq]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <TopNav />
        <Box>
          <img src={banner} style={{width:"100%",height:350}}></img>
        </Box>
        {/* <Box style={{ backgroundColor: "#F4C6C9", height: 300 }}>　</Box> */}
      </div>

      {/* 와인 */}
      <div style={{ marginTop: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {/* 인기 와인 */}
            <div style={{ marginBottom: 75 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h5" sx={{ ml: 5, mr: 3, pt: 0.5 }}>
                    지금 인기 있는 와인은?
                  </Typography>
                  <ToggleButtonGroup size="small" color="secondary" exclusive value={popular} onChange={handlePopular}>
                    <ToggleButton value="red">레드</ToggleButton>
                    <ToggleButton value="white">화이트</ToggleButton>
                    <ToggleButton value="rose">로제</ToggleButton>
                    <ToggleButton value="sparkling">스파클링</ToggleButton>
                    <ToggleButton value="dessert">디저트</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Select size="small" sx={{ mr: 3 }} value={criteria} onChange={handleCriteria}>
                  <MenuItem value={"score"}>평점순</MenuItem>
                  <MenuItem value={"review"}>리뷰순</MenuItem>
                  <MenuItem value={"like"}>좋아요순</MenuItem>
                </Select>
              </Box>
              <WineList bestWine={bestWine}></WineList>
            </div>
            {/* 추천 와인 */}
            {userSlice.userSeq !== 0 ? (
              <div style={{ marginBottom: 75 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h5" sx={{ ml: 5, mr: 3, pt: 0.5 }}>
                    당신만을 위한 와인 추천
                  </Typography>
                  <ToggleButtonGroup size="small" color="secondary" exclusive value={recommend} onChange={handleRecommend}>
                    <ToggleButton value="red">레드</ToggleButton>
                    <ToggleButton value="white">화이트</ToggleButton>
                    <ToggleButton value="rose">로제</ToggleButton>
                    <ToggleButton value="sparkling">스파클링</ToggleButton>
                    <ToggleButton value="dessert">디저트</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <WineRecommendList recomWine={recomWine}></WineRecommendList>
              </div>
            ) : (
              <Box sx={{ pt: 3, display: "flex", justifyContent: "center" }}>
                <Link href="/survey">
                  <button
                    style={{
                      borderRadius: 20,
                      backgroundColor: "#F4C6C9",
                      border: 0,
                      color: "white",
                      width: 500,
                      height: 40,
                      marginBottom: 10,
                    }}
                  >
                    내 와인 취향 찾으러 가기
                  </button>
                </Link>
              </Box>
            )}
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(Home);
