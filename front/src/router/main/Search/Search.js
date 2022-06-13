import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import List from "./List";
import logo from "../../../res/img/logo.png";
import { Box, Link, Container } from "@mui/material/";
import styled from "styled-components";
import { TextField } from "@mui/material/";
import search from "../../../res/img/search.png";
import TopNav from "../Home/TopNav";
import { getSwitchUnstyledUtilityClass } from "@mui/base";
const SearchInput = styled.input`
  position: relative;
  width: 630px;
  height: 35px;
  margin-left: 70px;
  margin-top: 20px;
  margin-bottom: 20px;
  :focus {
    outline: none;
  }
  border: none;
  border-radius: 5px;
  font-size: 14 px;
  padding-left: 20px;
  background: #f1eded;
  placeholder: {
    color: white;
  }
`;

const SearchIcon = styled.img.attrs({
  src: search,
})`
  position: absolute;
  width: 18px;
  height: 18px;
  top: 21.6%;
  left: 82.5%;
`;

function Search() {
  const url = "http://j6a303.p.ssafy.io/api";
  const [totalCnt, setTotalCnt] = useState("0");
  const [page, setPage] = useState(1);
  /////////////wines 수정해야함
  const [wines, setWines] = useState([]);
  // const [type, setType] = useState({
  //   redWine: false,
  //   whiteWine: false,
  //   sparklingWine: false,
  //   roseWine: false,
  //   dessertWine: false,
  // });

  const [type, setType] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sweetness, setSweetness] = useState("");
  const [body, setBody] = useState("");
  const [acidity, setAcidity] = useState("");
  const [tanin, setTanin] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //최소가격 -> price[0], 최대가격 -> price[1]
  // const [country, setCountry] = useState({
  //   france: false,
  //   italy: false,
  //   portugal: false,
  //   spain: false,
  //   germany: false,
  //   america: false,
  //   canada: false,
  //   chile: false,
  //   australia: false,
  //   newZealand: false,
  //   etc: false,
  // });

  const [country, setCountry] = useState([]);

  function typeHandler(value) {
    setType(value);
  }
  function keywordHandler(event) {
    setKeyword(event.target.value);
  }
  function sweetnessHandler(value) {
    setSweetness(value);
  }
  function bodyHandler(value) {
    setBody(value);
  }
  function acidityHandler(value) {
    setAcidity(value);
  }
  function taninHandler(value) {
    setTanin(value);
  }

  function countryHandler(value) {
    setCountry(value);
  }

  function minPriceHandler(value) {
    setMinPrice(value);
  }
  function maxPriceHandler(value) {
    setMaxPrice(value);
  }

  function handlePageChange(event) {
    setPage(event);
  }

  function keywordHandler(event) {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    getWines();
    console.log(wines);
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  useEffect(() => {
    getWines();
    console.log("카테고리 변경 일어남");
  }, [
    page,
    type,
    minPrice,
    maxPrice,
    sweetness,
    body,
    acidity,
    tanin,
    country,
  ]);

  function getWines() {
    // const typeString = JSON.stringify(type);
    const typeString = type.toString();
    const countryString = country.toString();

    console.log(
      keyword,
      typeString,
      minPrice,
      maxPrice,
      body,
      tanin,
      sweetness,
      acidity,
      countryString
    );
    axios
      .get(url + `/search`, {
        params: {
          keyword: keyword,
          type: typeString,
          price_lower: minPrice,
          price_upper: maxPrice,
          body: body,
          tannin: tanin,
          sweet: sweetness,
          acidity: acidity,
          country: countryString,
          page: page - 1,
        },
      })
      .then(function (response) {
        console.log(response);
        setTotalCnt(response.data.totalElements);
        setWines(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onSubmit = (event) => {
    if (event.key === "Enter") {
      console.log(keyword);
      if (keyword !== "" && keyword !== undefined) {
        getWines();
      } else {
        alert("검색어를 입력해주세요.");
      }
    }
  };

  return (
    <>
      {/* 상단아이콘 */}
      <div>
        <TopNav />
      </div>
      {/* 정렬 및 검색 */}

      <Container sx={{ borderTop: 1, borderColor: "#E5E5E5", display: "flex" }}>
        <div style={{ display: "flex" }}>
          <Box
            id="category"
            sx={{
              borderRight: 1,
              borderColor: "#E5E5E5",
              paddingRight: 3,
            }}
          >
            <Category
              url={url}
              keyword={keyword}
              type={type}
              body={body}
              tanin={tanin}
              acidity={acidity}
              sweetness={sweetness}
              country={country}
              keywordHandler={keywordHandler}
              minPriceHandler={minPriceHandler}
              maxPriceHandler={maxPriceHandler}
              typeHandler={typeHandler}
              countryHandler={countryHandler}
              sweetnessHandler={sweetnessHandler}
              bodyHandler={bodyHandler}
              taninHandler={taninHandler}
              acidityHandler={acidityHandler}
              totalCnt={totalCnt}
              wines={wines}
              getWines={getWines}
            ></Category>
          </Box>
          <div id="searchInput,list">
            <div>
              <SearchInput
                // keyword수정
                value={keyword}
                onChange={keywordHandler}
                onKeyPress={onSubmit}
                placeholder="와인 검색"
              ></SearchInput>
              <SearchIcon></SearchIcon>
            </div>

            <List
              wines={wines}
              totalCnt={totalCnt}
              page={page}
              handlePageChange={handlePageChange}
              url={url}
            ></List>
          </div>
        </div>
      </Container>
    </>
  );
}
export default Search;
