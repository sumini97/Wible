import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Rating from "@mui/material/Rating";
import no_image from "../../../res/img/no_image.jpg";

function WineItem({wine, url}) {
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };
  return (
    <>
      <div
      style={{
        width: 180,
        height: 265,
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 18,
        marginRight: 27,
        borderRadius: 10,
        boxShadow: "2px 3px 7px 2px lightgrey",
        padding: 15,
      }}
    >
      <div id="image" style={{ height: 140,marginTop:5,marginBottom:15 }}>
        <img
          style={{
            minHeight: 140,
            maxHeight: 140,
            maxWidth: 50,
            minWidth: 40,
            objectFit: "cover",
          }}
          src={`http://j6a303.p.ssafy.io/img/${wine.ename}.jpg`}
          onError={handleImgError}
        ></img>
      </div>
      <div
        id="name"
        style={{ height: 70, textAlign:"left"}}
      >
        <div id="kname" style={{ fontSize: 14, marginTop: 3 }}>
          {wine.kname}
        </div>
        <div id="ename" style={{ fontSize: 12, color: "#B2ACAC" }}>
          {wine.ename}
        </div>
      </div>

      <div id="score" style={{ display: "flex" }}>
      <div style={{marginTop:4, fontSize:20 }}>{wine.score}</div>
        <div style={{marginTop:1, }}>
          <Rating
            style={{
              marginLeft: 10,
              color: "#891826",
            }}
            name="read-only"
            value={Math.floor(wine.score)}
            readOnly
            size="small"
          />
        </div>
      </div>
    </div>
    </>
  );
}
export default WineItem;
