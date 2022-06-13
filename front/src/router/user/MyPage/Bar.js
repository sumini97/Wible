import { NavLink } from "react-router-dom";
import { Box, Link, Container } from "@mui/material/";

function Bar() {
  const url = "http://j6a303.p.ssafy.io/api";

  const menus = [
    { name: "리뷰목록", path: "/mypage" },
    { name: "좋아요", path: "/mypage/like" },
    { name: "프로필", path: "/mypage/userInfo" },
  ];

  return (
    <div>
      <div>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #E5E5E5",
            marginBottom: 5,
          }}
        ></Box> */}
        <Box
          sx={{
            mt: 10,
            px: 50,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        ></Box>
      </div>
      <div style={{ textAlign: "center", fontSize: 28 }}>마이페이지</div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "43.5%",
        }}
      >
        {menus.map((menu, index) => {
          return (
            <NavLink
              style={{
                color: "#706B6B",
                textDecoration: "none",
                marginRight: 10,
                fontSize: 18,
              }}
              to={menu.path}
              key={index}
            >
              <div className="sidebar-item">
                <p>{menu.name}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
export default Bar;
