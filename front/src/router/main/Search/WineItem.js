import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Rating from "@mui/material/Rating";
import no_image from "../../../res/img/no_image.jpg";

function WineItem(wine, url) {
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          //background: "#C50D0D",
          marginLeft: 70,
          marginTop: 20,
          borderBottom: "1px solid #C4C4C4",
        }}
      >
        <div
          id="front"
          style={{
            width: "8%",
            marginRight: 40,
            paddingBottom: 20,
            paddingLeft: 30,
          }}
        >
          <img
            style={{
              minHeight: 140,
              maxHeight: 140,
              maxWidth: 50,
              minWidth: 40,
              objectFit: "cover",
            }}
            src={`img/${wine.wine.ename}.jpg`}
            onError={handleImgError}
          ></img>
        </div>

        <div id="middle" style={{ marginTop: 13, width: 420 }}>
          <div id="type" style={{ display: "flex", marginBottom: 6 }}>
            {wine.wine.type === "RED" && (
              <CircleIcon style={{ color: "#C50D0D" }}></CircleIcon>
            )}
            {wine.wine.type === "WHITE" && (
              <CircleIcon style={{ color: "#C3ECB8" }}></CircleIcon>
            )}
            {wine.wine.type === "SPARKLING" && (
              <CircleIcon style={{ color: "#CBF9FF" }}></CircleIcon>
            )}
            {wine.wine.type === "ROSE" && (
              <CircleIcon style={{ color: "#FFAEAE" }}></CircleIcon>
            )}
            {wine.wine.type === "DESSERT" && (
              <CircleIcon style={{ color: "#FFF4CC" }}></CircleIcon>
            )}

            <div style={{ marginLeft: 5, marginTop: 4, fontSize: 12 }}>
              {wine.wine.type}
            </div>
          </div>
          <div id="kname" style={{ fontSize: 20 }}>
            {wine.wine.kname}
          </div>
          <div
            id="ename"
            style={{ fontSize: 15, color: "#B2ACAC", marginBottom: 10 }}
          >
            {wine.wine.ename}
          </div>
          <div
            id="grapes,country"
            style={{ display: "flex", marginBottom: 10 }}
          >
            {wine.wine.grapes.length > 50 ? (
              <div
                id="grapes"
                style={{
                  width: 290,
                  paddingRight: 13,
                  paddingLeft: 13,
                  paddingTop: 3,
                  paddingBottom: 5,
                  color: "#ffffff",
                  fontSize: 13,
                  display: "inline-block",
                  background: "#891826",
                  borderRadius: "15px",
                  marginRight: 10,
                }}
              >
                {wine.wine.grapes}
              </div>
            ) : wine.wine.grapes === "" ? (
              <div></div>
            ) : (
              <div
                id="grapes"
                style={{
                  paddingRight: 13,
                  paddingLeft: 13,
                  paddingTop: 3,
                  paddingBottom: 5,
                  color: "#ffffff",
                  fontSize: 13,
                  display: "inline-block",
                  background: "#891826",
                  borderRadius: "15px",
                  marginRight: 10,
                }}
              >
                {wine.wine.grapes}
              </div>
            )}
            <div
              id="country"
              style={{
                height: 20,
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 3,
                paddingBottom: 5,
                color: "#ffffff",
                fontSize: 13,
                display: "inline-block",
                background: "#891826",
                borderRadius: "15px",
                marginRight: 10,
              }}
            >
              {wine.wine.country === "FRANCE" && "프랑스"}
              {wine.wine.country === "ITALY" && "이탈리아"}
              {wine.wine.country === "PORTUGAL" && "포르투갈"}
              {wine.wine.country === "SPAIN" && "스페인"}
              {wine.wine.country === "GERMANY" && "독일"}
              {wine.wine.country === "UNITED_STATES" && "미국"}
              {wine.wine.country === "CANADA" && "캐나다"}
              {wine.wine.country === "CHILE" && "칠레"}
              {wine.wine.country === "AUSTRALIA" && "호주"}
              {wine.wine.country === "NEW_ZEALAND" && "뉴질랜드"}
              {wine.wine.country === "ARGENTINA" && "아르헨티나"}
              {wine.wine.country === "AUSTRIA" && "오스트리아"}
              {wine.wine.country === "BULGARIA" && "불가리아"}
              {wine.wine.country === "HUNGARY" && "헝가리"}
              {wine.wine.country === "MOLDOVA" && "몰도바"}
              {wine.wine.country === "ROMANIA" && "루마니아"}
              {wine.wine.country === "SOUTH_AFRICA" && "아프리카"}
              {wine.wine.country === "URUGUAY" && "우루과이"}
            </div>
          </div>
        </div>

        <div id="back" style={{ marginTop: 13, width: 100 }}>
          <div id="score" style={{ textAlign: "center", fontSize: 30 }}>
            {wine.wine.score}
          </div>
          <div id="star">
            <Rating
              style={{
                marginLeft: 6,
                marginBottom: 20,
                marginTop: 5,
                color: "#891826",
              }}
              name="read-only"
              value={Math.floor(wine.wine.score)}
              readOnly
              size="small"
            />
          </div>
          <div id="price" style={{ textAlign: "center" }}>
            약 <b>{wine.wine.price}원</b>
          </div>
        </div>
      </div>
    </>
  );
}
export default WineItem;
