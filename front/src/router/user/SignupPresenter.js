import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function SignupPresenter({
  onEmailHandler,
  checkEmail,
  onPasswordHandler,
  onPasswordConfirmHandler,
  onNameHandler,
  onNicknameHandler,
  onPhoneNumberHandler,
  checkId,
  checkNickname,
  checkPhoneNumber,
  checkPhoneDuplicate,
  onCreate,
}) {
  const ContainerStyle = {
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 30,
    width: "80%",
  };
  const DuplicateStyle = {
    display: "flex",
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    marginBottom: 30,
  };
  const DuplicateBtn = {
    marginLeft: 2,
    color: "#9E777B",
    borderBlockColor: "#9E777B",
  };

  return (
    <Container style={{ position: "absolute", left: "20%", right: "20%", width: "60%" }}>
      <div style={{ marginTop: "10vh", marginBottom: "5vh" }}>
        <Typography variant="h4" gutterBottom component="div" style={{ textAlign: "center" }}>
          회원가입
        </Typography>
      </div>

      <div
        style={{
          width: "100%",
          height: 3,
          background: "black",
          marginBottom: "3vh",
        }}
      ></div>

      <div id="form">
        <div id="email" style={DuplicateStyle}>
          <TextField
            id="outlined-required"
            label="아이디(이메일)"
            placeholder="ex.wible@naver.com"
            onChange={onEmailHandler}
            onBlur={checkEmail}
            size="small"
            style={{ width: "86.9%" }}
          />
          <Button variant="outlined" color="error" style={DuplicateBtn} onClick={checkId}>
            중복확인
          </Button>
        </div>

        <TextField
          id="outlined-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          placeholder="숫자,영문자 조합으로 8~12자리"
          onChange={onPasswordHandler}
          style={ContainerStyle}
          size="small"
        />
        <TextField
          id="outlined-password-input"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          autoComplete="current-password"
          size="small"
          onChange={onPasswordConfirmHandler}
          style={ContainerStyle}
        />
        <TextField
          id="outlined-helperText"
          label="이름"
          placeholder="이름을 입력해주세요"
          onChange={onNameHandler}
          defaultValue=""
          style={ContainerStyle}
          size="small"
        />
        <div style={DuplicateStyle}>
          <TextField
            id="outlined-helperText"
            label="닉네임"
            defaultValue=""
            onChange={onNicknameHandler}
            placeholder="닉네임은 한글로만 혹은 영어로만 이루어져야 합니다"
            style={{ width: "86.9%" }}
            size="small"
          />
          <Button variant="outlined" color="error" style={DuplicateBtn} onClick={checkNickname}>
            중복확인
          </Button>
        </div>

        <div style={DuplicateStyle}>
          <TextField
            id="outlined-helperText"
            label="휴대폰번호"
            defaultValue=""
            placeholder="휴대폰 번호를 010-0000-0000 형식으로 입력해주세요"
            style={{ width: "86.9%" }}
            size="small"
            onChange={onPhoneNumberHandler}
            onBlur={checkPhoneNumber}
          />
          <Button variant="outlined" color="error" style={DuplicateBtn} onClick={checkPhoneDuplicate}>
            중복확인
          </Button>
        </div>
      </div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#F0B8BF",
          width: "20%",
          marginLeft: "40%",
          display: "inline-block",
        }}
        onClick={onCreate}
      >
        가입하기
      </Button>
    </Container>
  );
}

export default SignupPresenter;
