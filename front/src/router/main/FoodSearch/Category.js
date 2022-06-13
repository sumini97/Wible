import axios from "axios";

import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function Category({wines, handleWines, url,handleClicked}) {
  const [MeatOpen, setMeatOpen] = React.useState(false);
  const [FishOpen, setFishOpen] = React.useState(false);
  const [FoodOpen, setFoodOpen] = React.useState(false);
  const [LightOpen, setLightOpen] = React.useState(false);
  const [DessertOpen, setDessertOpen] = React.useState(false);
  const [clickedItem, setClickedItem] = useState("");

  const ClickedStyle = {
    background:"#891820",
    color: "white",
    width:140
  };
  
  const TypeStyle = {
    width:140
  };
  const handleMeatClick = () => {
    setMeatOpen(!MeatOpen);
  };
  const handleFishClick = () => {
    setFishOpen(!FishOpen);
  };
  const handleFoodClick = () => {
    setFoodOpen(!FoodOpen);
  };
  const handleLightClick = () => {
    setLightOpen(!LightOpen);
  };
  const handleDessertClick = () => {
    setDessertOpen(!DessertOpen);
  };

  const handleClickedItem = (name) => {
    setClickedItem(name);
    handleClicked(true);
  };
  console.log(clickedItem);

  useEffect(() => {
    getWines();
    console.log(wines);
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, [clickedItem]);

  function getWines() {
    console.log(clickedItem);
    console.log(typeof(clickedItem));

    axios
    .get(url + `/food`, {
      params: {
        food:clickedItem
      },
    })
      .then(function (response) {
        console.log(response);
        handleWines(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <>
      {/* 고기류 */}
      <List
        sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleMeatClick}>
          <ListItemText primary="고기류" />
          {MeatOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={MeatOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton
            style={clickedItem===1 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(1);
              }}
              sx={{ pl: 4}}
            >
              <ListItemText primary="소고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===2 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(2);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="돼지고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===3 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(3);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="닭고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===4 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(4);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="오리고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===5 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(5);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="양고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===6 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(6);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="사슴고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===7 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(7);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="송아지고기" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===8 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(8);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="절임육" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* 생선류 */}
      <List
        sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleFishClick}>
          <ListItemText primary="해산물류" />
          {FishOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={FishOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton
            style={clickedItem===9 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(9);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="연어" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===10 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(10);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="참치" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===11 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(11);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="조개류" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===12 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(12);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="생선류" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* 요리류 */}
      <List
        sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleFoodClick}>
          <ListItemText primary="요리류" />
          {FoodOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={FoodOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton
            style={clickedItem===13 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(13);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="파스타" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===14 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(14);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="매운요리" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===15 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(15);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="버섯요리" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* 가벼운음식 */}
      <List
        sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleLightClick}>
          <ListItemText primary="가벼운 음식" />
          {LightOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={LightOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton
            style={clickedItem===16 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(16);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="치즈" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===17 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(17);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="과일" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===18 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(18);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="샐러드" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* 디저트 */}
      <List
        sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleDessertClick}>
          <ListItemText primary="디저트류" />
          {DessertOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={DessertOpen} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItemButton
            style={clickedItem===19 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(19);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="디저트" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===20 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(20);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="스낵류" />
            </ListItemButton>
            <ListItemButton
            style={clickedItem===21 ? ClickedStyle : TypeStyle}
              onClick={() => {
                handleClickedItem(21);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="식전주" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}
export default Category;
