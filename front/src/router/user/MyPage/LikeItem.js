import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import search from "../../../res/img/search.png";
import Barolo2015 from "../../../res/img/Barolo2015.jpg";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
function LikeItem({ url, like, userSeq, getUserLike }) {
  const [likeIcon, setLikeIcon] = useState(true);
  function handleLikeIcon(event) {
    setLikeIcon(event);
  }

  function ClickHeart() {
    axios
      .post(url + `/wine/like`, {
        userSeq: userSeq,
        wineSeq: like.wine_seq,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function RemoveHeart() {
    axios
      .delete(url + `/wine/like`, {
        params: {
          userSeq: userSeq,
          wineSeq: like.wine_seq,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };
  return (
    <div
      style={{
        width: 180,
        height: 275,
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 18,
        marginRight: 27,
        borderRadius: 10,
        boxShadow: "2px 3px 7px 2px lightgrey",
        padding: 15,
      }}
    >
      <div id="image" style={{ marginLeft: 65, height: 140 }}>
        <img
          style={{
            minHeight: 140,
            maxHeight: 140,
            maxWidth: 50,
            minWidth: 40,
            objectFit: "cover",
          }}
          src={`http://j6a303.p.ssafy.io/img/${like.ename}.jpg`}
          onError={handleImgError}
        ></img>
      </div>
      <div
        id="heart"
        style={{ marginTop: 10, height: 25 }}
        onClick={() => {
          if (likeIcon === true) {
            handleLikeIcon(false);
            RemoveHeart();
          } else {
            handleLikeIcon(true);
            ClickHeart();
          }
        }}
      >
        {likeIcon === true ? (
          <FavoriteIcon
            style={{ color: "#F9595F", cursor: "pointer" }}
          ></FavoriteIcon>
        ) : (
          <FavoriteBorderOutlinedIcon
            style={{ color: "#F9595F", cursor: "pointer" }}
          ></FavoriteBorderOutlinedIcon>
        )}
      </div>
      <div
        id="name"
        style={{ height: 80, cursor: "pointer" }}
        onClick={() => (document.location.href = `/detail/${like.wine_seq}`)}
      >
        <div id="kname" style={{ fontSize: 14, marginTop: 3 }}>
          {like.kname}
        </div>
        <div id="ename" style={{ fontSize: 12, color: "#B2ACAC" }}>
          {like.ename}
        </div>
      </div>

      <div id="score" style={{ height: 30, display: "flex" }}>
        <div>{like.score}</div>
        <div style={{ marginTop: 3 }}>
          <Rating
            style={{
              marginLeft: 10,
              color: "#891826",
            }}
            name="read-only"
            value={Math.floor(like.score)}
            readOnly
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
export default LikeItem;
