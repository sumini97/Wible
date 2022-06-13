import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import List from "./List";
import logo from "../../../res/img/logo.png";
import TopNav from "../Home/TopNav";
import { Box, Link, Container } from "@mui/material/";

function FoodSearch() {
  const [wines, setWines] = useState([]);
  const [clicked, setClicked] = useState(false);
  const url = "http://j6a303.p.ssafy.io/api";
  //const url ="http://localhost:8080"
  function handleWines(event) {
    setWines(event);
  }
  function handleClicked(event) {
    setClicked(true);
  }

  return (
    <>
      <TopNav />
      {/* <Box
        sx={{
          my: 0,
          px: 30,
          display: "flex",
          justifyContent: "space-evenly",
          fontSize: 25,
          marginBottom: 1,
        }}
      >
        오늘의 음식에는 어떤 와인이 좋을까?
      </Box> */}
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "7%", marginTop: 20 }}>
          <Category wines={wines} handleWines={handleWines} url={url} handleClicked={handleClicked}></Category>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 25,
            marginLeft: "2%",
          }}
        >
          <List wines={wines} url={url} clicked={clicked}></List>
        </div>
      </div>
    </>
  );
}
export default FoodSearch;
