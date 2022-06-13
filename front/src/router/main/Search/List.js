import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material/";

import WineItem from "./WineItem";
import Pagination from "react-js-pagination";
import "./Paging.css";
function List({ wines, totalCnt, page, handlePageChange, url, goDetail }) {
  return (
    <>
      <div>
        {wines &&
          wines.map((wine) => (
            ////detail url 바꿔야함. 상진님께 여줘보자!
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                (document.location.href = `/detail/${wine.wineSeq}`)
              }
            >
              <WineItem wine={wine} url={url}></WineItem>
            </div>
          ))}
      </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </>
  );
}
export default List;
