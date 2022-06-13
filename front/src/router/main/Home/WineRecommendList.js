import * as React from "react";
import { connect } from "react-redux";
import { Box, Typography, Card, CardActionArea, Link, CardContent } from "@mui/material/";

function WineList(props) {
  const wines = props.recomWine;
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };
  return (
    <>
      {/* 와인 */}
      <Box sx={{ m: 2, display: "flex", justifyContent: "space-evenly" }}>
        {wines ? (
          wines &&
          wines.map((wine, index) => {
            return (
              <Card sx={{ minWidth: 230, maxWidth: 230, minHeight: 350 }} key={index}>
                <CardActionArea href={"/detail/" + wine.wineSeq}>
                  {/* <CardMedia component="img" height="250" image={`/img/${wine.ename}.jpg`} style={{ objectFit: "cover" }} alt="와인이미지" /> */}
                  <Box sx={{ height: 250, display: "flex", justifyContent: "center" }}>
                    <img
                      style={{
                        Width: 50,
                        minHeight: 250,
                        maxHeight: 250,
                        width: "auto",
                        height: "auto",
                        objectFit: "cover",
                      }}
                      src={`/img/${wine.ename}.jpg`}
                      onError={handleImgError}
                      alt=""
                    />
                  </Box>
                  <CardContent>
                    <Box sx={{ height: 95 }}>
                      <Typography gutterBottom sx={{ fontSize: 20, fontWeight: "bold" }} component="div">
                        {wine.kname}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                      {Math.ceil(wine.price / 100) * 100} 원
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })
        ) : (
          <Box sx={{ pt: 3, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 16 }}>좋아요 누른 와인이 없습니다.</Typography>
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
      </Box>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(WineList);
