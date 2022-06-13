import { useState } from "react";
import logo from "../../res/img/logo.png";
import { Box, Breadcrumbs, Link, Typography, TextField } from "@mui/material/";
import { connect } from "react-redux";
import { save } from "../../store/user";
import { useNavigate } from "react-router-dom";
import Send from "../../config/Send";

function Login({ saveUser, userSlice }) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    Send.post(`/user/login`, JSON.stringify(data))
      .then((res) => {
        if (res.status === 202) {
          alert("이메일 및 비밀번호를 확인해주세요.");
          return;
        }
        window.localStorage.setItem("idToken", JSON.stringify(res.data));
        Send.get(`userinfo/seq/${res.data.userSeq}`).then((response) => {
          saveUser(response.data);
        });
        history({
          pathname: "/",
          props: {
            userId: data.userId,
            userSeq: res.data.userSeq,
            userCreatableCount: res.data.userCreatableCount,
          },
        });
      })
      .catch((e) => console.log(e));
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <>
      {/* 상단 구성 */}
      <div>
        <Breadcrumbs style={{ display: "flex", flexDirection: "row-reverse", marginTop: 10, marginRight: 350 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            회원가입
          </Link>
          <Link underline="hover" color="inherit" href="/">
            로그인
          </Link>
        </Breadcrumbs>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href="/">
            <img width={250} src={logo} alt="logo" />
          </Link>
        </Box>

        <Box sx={{ mt: 20, mb: 5, display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
            로그인
          </Typography>
          <TextField color="secondary" id="email" label="Email" variant="outlined" sx={{ my: 1, width: 300 }} onChange={onEmailHandler} />
          <TextField
            color="secondary"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={{ my: 2, width: 300 }}
            onChange={onPasswordHandler}
            onKeyPress={handleEnter}
          />
          <button
            style={{ borderRadius: 5, backgroundColor: "#F4C6C9", border: 0, color: "white", width: 300, height: 40, marginBottom: 10 }}
            onClick={onSubmit}
          >
            로그인
          </button>
          <button style={{ borderRadius: 5, backgroundColor: "#F4C6C9", border: 0, color: "white", width: 300, height: 40, marginBottom: 10 }}>
            회원가입
          </button>
        </Box>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

function mapDispatchToProps(dispatch) {
  return { saveUser: (user) => dispatch(save(user)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
