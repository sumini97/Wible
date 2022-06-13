import * as React from "react";
import { connect } from "react-redux";
import logo from "../../../res/img/logo.png";
import { Box, Breadcrumbs, Link } from "@mui/material/";

function TopNav({ userSlice }) {
  const Logout = () => {
    window.localStorage.clear();
  };

  return (
    <>
      <div>
        {window.localStorage.getItem("idToken") === null ? (
          <Breadcrumbs
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: 5,
              marginRight: 350,
            }}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/accounts/signup">
              회원가입
            </Link>
            <Link underline="hover" color="inherit" href="/accounts/login">
              로그인
            </Link>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: 5,
              marginRight: 350,
            }}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/" onClick={Logout}>
              로그아웃
            </Link>
          </Breadcrumbs>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href="/">
            <img width={250} src={logo} alt="logo" />
          </Link>
        </Box>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            px: 50,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link href="/search" color="inherit" underline="none">
            와인검색
          </Link>
          <Link href="/wineinfo" color="inherit" underline="none">
            와인사전
          </Link>
          <Link href="/foodSearch" color="inherit" underline="none">
            음식추천
          </Link>
          {userSlice.userSeq && userSlice.userSeq !== 0 ? (
            <Link href="/mypage" color="inherit" underline="none">
              마이페이지
            </Link>
          ) : (
            <Link href="/accounts/login" color="inherit" underline="none">
              마이페이지
            </Link>
          )}
        </Box>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(TopNav);
