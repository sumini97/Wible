import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import search from "../../../res/img/search.png";
import Barolo2015 from "../../../res/img/Barolo2015.jpg";
import Rating from "@mui/material/Rating";

function ReviewItem({ url, review, userSeq, getUserReview }) {
  console.log(review);
  const [modify, setModify] = useState(false);
  const [content, setContent] = useState(review.review_text);
  const [score, setScore] = useState(review.review_score);
  const handleImgError = (e) => {
    e.target.src = "https://wine21.speedgabia.com/no_image2.jpg";
  };
  console.log(content);
  function ModifyReview() {
    axios
      .put(url + `/wine/review`, {
        reviewScore: score,
        reviewSeq: review.review_seq,
        reviewText: content,
      })
      .then((response) => {
        console.log(response);
        getUserReview();
      })
      .catch((error) => {});
  }

  //user_seq 이거 !!!!!추가해야함
  function DeleteReview() {
    console.log(review.review_seq);
    axios
      .delete(url + `/wine/review`, {
        params: {
          reviewSeq: review.review_seq,
        },
      })
      .then(function (response) {
        console.log(response);
        document.location.href = "/mypage";
      })
      .catch(function (error) {
        console.log(error);
        document.location.href = "/mypage";
      });
  }

  function contentHandler(event) {
    setContent(event.target.value);
  }
  function scoreHandler(event) {
    setScore(event.target.value);
  }
  return (
    <div
      style={{
        borderBottom: "1px solid #C4C4C4",
        height: 200,
        display: "flex",
      }}
    >
      <div
        id="img"
        style={{ width: "8%", marginTop: 25, marginLeft: 50, marginRight: 40 }}
      >
        <img
          style={{
            minHeight: 140,
            maxHeight: 140,
            maxWidth: 50,
            minWidth: 40,
            objectFit: "cover",
          }}
          src={`img/${review.ename}.jpg`}
          onError={handleImgError}
        ></img>
      </div>
      <div id="infos" style={{ width: "70%", marginTop: 30 }}>
        <div
          id="type, country,grapes"
          style={{ fontSize: 15, display: "flex" }}
        >
          <div id="type" style={{ marginRight: 10 }}>
            {review.type === "RED" && (
              <div style={{ display: "flex" }}>
                <CircleIcon style={{ color: "#C50D0D" }}></CircleIcon>
                <div style={{ marginLeft: 5 }}>Red</div>
              </div>
            )}
            {review.type === "WHITE" && (
              <div style={{ display: "flex" }}>
                <CircleIcon style={{ color: "#C3ECB8" }}></CircleIcon>
                <div style={{ marginLeft: 5 }}>White</div>
              </div>
            )}
            {review.type === "SPARKLING" && (
              <div style={{ display: "flex" }}>
                <CircleIcon style={{ color: "#CBF9FF" }}></CircleIcon>
                <div style={{ marginLeft: 5 }}>Sparkling</div>
              </div>
            )}
            {review.type === "ROSE" && (
              <div style={{ display: "flex" }}>
                <CircleIcon style={{ color: "#FFAEAE" }}></CircleIcon>
                <div style={{ marginLeft: 5 }}>Rose</div>
              </div>
            )}
            {review.type === "DESSERT" && (
              <div style={{ display: "flex" }}>
                <CircleIcon style={{ color: "#FFF4CC" }}></CircleIcon>
                <div style={{ marginLeft: 5 }}>Dessert</div>
              </div>
            )}
          </div>
          <div>/</div>
          <div id="country" style={{ marginLeft: 10, marginRight: 10 }}>
            {review.country}
          </div>
          <div>/</div>
          <div id="grapes" style={{ marginLeft: 10, marginRight: 3 }}>
            {review.grapes}
          </div>
        </div>

        <div
          id="name"
          style={{ cursor: "pointer" }}
          onClick={() =>
            (document.location.href = `/detail/${review.wine_seq}`)
          }
        >
          <div style={{ marginTop: 10, fontSize: 20 }}>{review.kname}</div>
          <div style={{ fontSize: 15, color: "#B2ACAC", marginBottom: 10 }}>
            {review.ename}
          </div>
        </div>

        {modify === false ? (
          <div style={{ fontSize: 14 }}>{review.review_text}</div>
        ) : (
          <input
            value={content}
            onChange={contentHandler}
            style={{ width: "100%" }}
          ></input>
        )}
        <div style={{ marginTop: 10 }}>
          {modify === false ? (
            <Button
              color="secondary"
              style={{
                border: "1px solid #E8E7E7",
                maxWidth: 40,
                maxHeight: 25,
                minWidth: 40,
                minHeight: 25,
                fontSize: 10,
                color: "#B2ACAC",
              }}
              onClick={() => {
                setModify(true);
              }}
            >
              수정
            </Button>
          ) : (
            <Button
              color="secondary"
              style={{
                border: "1px solid #E8E7E7",
                maxWidth: 40,
                maxHeight: 25,
                minWidth: 40,
                minHeight: 25,
                fontSize: 10,
                color: "#B2ACAC",
              }}
              onClick={() => {
                setModify(false);
                ModifyReview();
              }}
            >
              완료
            </Button>
          )}

          <Button
            color="secondary"
            style={{
              marginLeft: 5,
              border: "1px solid #E8E7E7",
              maxWidth: 40,
              maxHeight: 25,
              minWidth: 40,
              minHeight: 25,
              fontSize: 10,
              color: "#B2ACAC",
            }}
            onClick={() => {
              DeleteReview();
            }}
          >
            삭제
          </Button>
        </div>
      </div>

      <div id="ratings" style={{ width: "20%", marginRight: 20 }}>
        <div style={{ textAlign: "center", marginTop: 60 }}>나의 평점</div>
        <div style={{ textAlign: "center", fontSize: 30 }}>
          {modify === false ? (
            <div> {review.review_score}</div>
          ) : (
            <input
              value={score}
              onChange={scoreHandler}
              style={{ width: "50%", fontSize: 20, textAlign: "center" }}
            ></input>
          )}
        </div>
        <div id="star">
          <Rating
            style={{
              marginLeft: 30,
              marginBottom: 20,
              marginTop: 5,
              color: "#891826",
            }}
            name="read-only"
            value={review.review_score / 2}
            readOnly
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
export default ReviewItem;
