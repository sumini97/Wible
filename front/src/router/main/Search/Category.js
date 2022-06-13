import React, { useState } from "react";
import { Box, Button, Typography, Slider, Rating } from "@mui/material/";
import { styled } from "@mui/material/styles";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { red } from "@mui/material/colors";

function Category({
  url,
  keyword,
  type,
  body,
  sweetness,
  tanin,
  acidity,
  country,
  keywordHandler,
  maxPriceHandler,
  minPriceHandler,
  typeHandler,
  countryHandler,
  sweetnessHandler,
  bodyHandler,
  taninHandler,
  acidityHandler,
  getWines,
}) {
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "1",
    },
    {
      value: 40,
      label: "2",
    },
    {
      value: 60,
      label: "3",
    },
    {
      value: 80,
      label: "4",
    },
    {
      value: 100,
      label: "5",
    },
  ];

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

  function valuetext(value) {
    return `${value}원`;
  }
  const [price, setPrice] = React.useState([0, 1000000]);
  const handlePrice = (event, newValue) => {
    setPrice(newValue);
    if (newValue[0] === 0) {
      minPriceHandler("");
    } else {
      minPriceHandler(newValue[0]);
    }
    if (newValue[1] === 100) {
      maxPriceHandler("");
    } else {
      maxPriceHandler(newValue[1]);
    }
  };

  const WineClickedStyle = {
    width: 86,
    height: 35,
    borderRadius: "30px",
    marginBottom: 10,
    marginRight: 10,
    background: "#891826",
    fontSize: 13,
  };
  const WineTypeStyle = {
    width: 86,
    height: 35,
    borderRadius: "30px",
    marginBottom: 10,
    marginRight: 10,
    background: "#ffffff",
    color: "#891826",
    fontSize: 13,
  };
  const CountryClickedStyle = {
    width: 86,
    height: 35,
    borderRadius: "30px",
    marginBottom: 10,
    marginRight: 5,
    background: "#891826",
    fontSize: 13,
  };
  const CountryTypeStyle = {
    width: 86,
    height: 35,
    borderRadius: "30px",
    marginBottom: 10,
    marginRight: 5,
    background: "#ffffff",
    color: "#891826",
    fontSize: 13,
  };
  const CategoryStyle = {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: "#4F0529",
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#891826",
    },
    "& .MuiRating-iconHover": {
      color: "#891826",
    },
  });

  console.log(country);
  return (
    <>
      <div>
        {/* 종류 */}
        <div style={{ marginBottom: 20 }}>
          <div style={CategoryStyle}>종류</div>
          <Button
            variant="contained"
            style={
              type.includes("RED") === true ? WineClickedStyle : WineTypeStyle
            }
            onClick={() => {
              if (type.includes("RED") === true) {
                typeHandler(type.filter((word) => word !== "RED"));
                //setType({ ...type, redWine: false });
              } else {
                typeHandler([...type, "RED"]);
                //setType({ ...type, redWine: true });
              }
            }}
          >
            레드
          </Button>

          <Button
            variant="contained"
            style={
              type.includes("WHITE") === true ? WineClickedStyle : WineTypeStyle
            }
            onClick={() => {
              if (type.includes("WHITE") === true) {
                typeHandler(type.filter((word) => word !== "WHITE"));
                //setType({ ...type, redWine: false });
              } else {
                typeHandler([...type, "WHITE"]);
                //setType({ ...type, redWine: true });
              }
            }}
          >
            화이트
          </Button>
          <Button
            variant="contained"
            style={
              type.includes("SPARKLING") === true
                ? WineClickedStyle
                : WineTypeStyle
            }
            onClick={() => {
              if (type.includes("SPARKLING") === true) {
                typeHandler(type.filter((word) => word !== "SPARKLING"));
                //setType({ ...type, redWine: false });
              } else {
                typeHandler([...type, "SPARKLING"]);
                //setType({ ...type, redWine: true });
              }
            }}
          >
            스파클링
          </Button>
          <br></br>
          <Button
            variant="contained"
            style={
              type.includes("ROSE") === true ? WineClickedStyle : WineTypeStyle
            }
            onClick={() => {
              if (type.includes("ROSE") === true) {
                typeHandler(type.filter((word) => word !== "ROSE"));
                //setType({ ...type, redWine: false });
              } else {
                typeHandler([...type, "ROSE"]);
                //setType({ ...type, redWine: true });
              }
            }}
          >
            로제
          </Button>
          <Button
            variant="contained"
            style={
              type.includes("DESSERT") === true
                ? WineClickedStyle
                : WineTypeStyle
            }
            onClick={() => {
              if (type.includes("DESSERT") === true) {
                typeHandler(type.filter((word) => word !== "DESSERT"));
                //setType({ ...type, redWine: false });
              } else {
                typeHandler([...type, "DESSERT"]);
                //setType({ ...type, redWine: true });
              }
            }}
          >
            디저트
          </Button>
        </div>

        {/* 가격 */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex" }}>
            <div style={CategoryStyle}>가격</div>
            <div
              style={{
                marginLeft: 3,
                marginTop: 22,
                fontSize: 12,
                color: "#4F0529",
              }}
            >
              (만원)
            </div>
          </div>
          <Box sx={{ width: 300, marginLeft: 1 }}>
            <Slider
              value={price}
              onChange={handlePrice}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              style={{ color: "#F4C6C9", marginBottom: 0 }}
            />
          </Box>
          <div style={{ display: "flex", fontSize: 15 }}>
            <div style={{ marginLeft: 3, marginRight: 282 }}>0</div>
            <div>100+</div>
          </div>
        </div>

        {/* 맛 */}
        <div style={{ marginBottom: 20 }}>
          <div style={CategoryStyle}>맛</div>
          <div>
            <div style={{ display: "flex" }}>
              <div>당도</div>
              <div style={{ marginRight: 18 }}>
                <div>
                  <StyledRating
                    name="customized-color"
                    defaultValue={sweetness}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        newValue = "";
                      }
                      sweetnessHandler(newValue);
                      //setSweetness(newValue);
                    }}
                    precision={1}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    icon={<CircleIcon fontSize="inherit" />}
                    emptyIcon={
                      <CircleOutlinedIcon
                        sx={{ color: red[50] }}
                        fontSize="inherit"
                      />
                    }
                  />
                </div>
              </div>
              <div>바디</div>
              <div>
                <div>
                  <StyledRating
                    name="customized-color"
                    defaultValue={body}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        newValue = "";
                      }
                      bodyHandler(newValue);
                      //setBody(newValue);
                    }}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<CircleIcon fontSize="inherit" />}
                    emptyIcon={
                      <CircleOutlinedIcon
                        sx={{ color: red[50] }}
                        fontSize="inherit"
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>산도</div>
              <div style={{ marginRight: 18 }}>
                <div>
                  <StyledRating
                    name="customized-color"
                    defaultValue={acidity}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        newValue = "";
                      }
                      acidityHandler(newValue);
                      //setAcidity(newValue);
                    }}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<CircleIcon fontSize="inherit" />}
                    emptyIcon={
                      <CircleOutlinedIcon
                        sx={{ color: red[50] }}
                        fontSize="inherit"
                      />
                    }
                  />
                </div>
              </div>
              <div>타닌</div>
              <div>
                <div>
                  <StyledRating
                    name="customized-color"
                    defaultValue={tanin}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        newValue = "";
                      }
                      taninHandler(newValue);
                      //setTanin(newValue);
                    }}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<CircleIcon fontSize="inherit" />}
                    emptyIcon={
                      <CircleOutlinedIcon
                        sx={{ color: red[50] }}
                        fontSize="inherit"
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 국가 */}
        <div style={{ marginBottom: 20, marginTop: 30, width: "1000" }}>
          <div style={CategoryStyle}>국가</div>

          <Button
            variant="contained"
            style={
              country.includes("FRANCE") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("FRANCE") === true) {
                countryHandler(country.filter((word) => word !== "FRANCE"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "FRANCE"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            프랑스
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("ITALY") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("ITALY") === true) {
                countryHandler(country.filter((word) => word !== "ITALY"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "ITALY"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            이탈리아
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("PORTUGAL") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("PORTUGAL") === true) {
                countryHandler(country.filter((word) => word !== "PORTUGAL"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "PORTUGAL"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            포르투갈
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("SPAIN") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("SPAIN") === true) {
                countryHandler(country.filter((word) => word !== "SPAIN"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "SPAIN"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            스페인
          </Button>
          <br></br>
          <Button
            variant="contained"
            style={
              country.includes("GERMANY") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("GERMANY") === true) {
                countryHandler(country.filter((word) => word !== "GERMANY"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "GERMANY"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            독일
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("UNITED_STATES") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("UNITED_STATES") === true) {
                countryHandler(
                  country.filter((word) => word !== "UNITED_STATES")
                );
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "UNITED_STATES"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            미국
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("CANADA") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("CANADA") === true) {
                countryHandler(country.filter((word) => word !== "CANADA"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "CANADA"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            캐나다
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("CHILE") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("CHILE") === true) {
                countryHandler(country.filter((word) => word !== "CHILE"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "CHILE"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            칠레
          </Button>
          <br></br>
          <Button
            variant="contained"
            style={
              country.includes("AUSTRALIA") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("AUSTRALIA") === true) {
                countryHandler(country.filter((word) => word !== "AUSTRALIA"));
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "AUSTRALIA"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            호주
          </Button>
          <Button
            variant="contained"
            style={
              country.includes("NEW_ZEALAND") === true
                ? CountryClickedStyle
                : CountryTypeStyle
            }
            onClick={() => {
              if (country.includes("NEW_ZEALAND") === true) {
                countryHandler(
                  country.filter((word) => word !== "NEW_ZEALAND")
                );
                //setCountry({ ...country, france: false });
              } else {
                countryHandler([...country, "NEW_ZEALAND"]);
                //setCountry({ ...country, france: true });
              }
            }}
          >
            뉴질랜드
          </Button>
        </div>
      </div>
    </>
  );
}
export default Category;
