import React, { useState } from "react";
import { connect } from "react-redux";
import { update } from "../../../store/user"; 
import Button from "@mui/material/Button";
import axios from "axios";
import {
  checkNickname,
  checkPhoneNumber,
  checkPhoneDuplicate,
} from "../ValidCheck";
function UserInfo({ userSlice,updateUser }) {
  console.log(userSlice)
  const url = "http://j6a303.p.ssafy.io/api";
  const [userName, setUsername] = useState(userSlice.userName);
  const [nickname, setNickname] = useState(userSlice.userNickname);
  const [phone, setPhone] = useState(userSlice.userPhone);
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [pwdChange, setPwdChange] = useState(false);
  function CheckNickname() {
    checkNickname(nickname, url);
  }
  function CheckPhoneNumber() {
    checkPhoneNumber(phone);
  }
  function CheckPhoneDuplicate() {
    checkPhoneDuplicate(phone, url);
  }

  function handleNickname(event) {
    setNickname(event.target.value);
  }
  function handlePhone(event) {
    setPhone(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handlePasswordConfirm(event) {
    setPasswordConfirm(event.target.value);
  }

  const Logout = () => {
    window.localStorage.clear();
    document.location.href = `/login`
  };


  function ModifyUserInfo() {
    axios
      .put(url + `/userinfo`, {
        user_seq: userSlice.userSeq,
        nickname: nickname,
        phone: phone,
      })
      .then((response) => {
        console.log(response);
        updateUser({nickname,phone});
        alert("수정되었습니다.");
      })
      .catch((error) => {});
  }

  function ModifyPwd() {
    if (
      password === "" ||
      password === undefined ||
      passwordConfirm === "" ||
      passwordConfirm === undefined
    ) {
      alert("입력하지 않은 정보가 있습니다. 확인해주세요.");
    } else if (!/^[a-zA-Z0-9]{8,12}$/.test(password)) {
      alert("숫자,영문자 조합으로 8~12자리");
      return;
    } else if (password != passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      console.log(password, passwordConfirm);
      axios
        .put(url + `/userinfo/password`, {
          user_seq: userSlice.userSeq,
          password: password,
        })
        .then((response) => {
          setPwdChange(false);
          alert("비밀번호가 변경되었습니다.");
        })
        .catch((error) => {});
    }
  }
  const LabelStyle = {
    display: "flex",
    width: 120,
    marginLeft: "10%  ",
    marginBottom: 40,
    marginTop: 5,
  };
  const InputStyle = {
    height: 30,
    width: "50%",
    fontSize: 15,
    border: "1px solid #E8E7E7",
  };
  return (
    <>
      {pwdChange === false ? (
        <div
          style={{
            marginTop: 60,
            marginLeft: "28%",
            marginRight: "28%",
            position: "absolute",
            width: "44%",
            height: "60%",
            border: "1px solid #BABABA",
            borderRadius: 7,
          }}
        >
          <div style={{ marginTop: 40 }}>
            <div id="id" style={{ display: "flex" }}>
              <div style={LabelStyle}>아이디</div>
              <div style={{ marginTop: 2 }}>{userSlice.userEmail}</div>
            </div>
            <div id="pwd" style={{ display: "flex" }}>
              <div style={LabelStyle}>비밀번호</div>
              <Button
                style={{
                  height: 30,
                  fontSize: 13,
                  background: "#F4C6C9",
                }}
                variant="contained"
                onClick={() => setPwdChange(true)}
              >
                비밀번호 변경하기
              </Button>
            </div>
            <div id="name" style={{ display: "flex" }}>
              <div style={LabelStyle}>이름</div>
              <div style={{ marginTop: 2 }}>{userName}</div>
            </div>
            <div id="nickname" style={{ display: "flex" }}>
              <div style={LabelStyle}>닉네임</div>
              <input
                style={InputStyle}
                value={nickname}
                onChange={handleNickname}
              ></input>
              <Button
                style={{
                  border: "1px solid #9E777B",
                  color: "#9E777B",
                  height: 35,
                  marginLeft: 6,
                  fontSize: 13,
                }}
                onClick={() => CheckNickname()}
                variant="outlined"
              >
                중복체크
              </Button>
            </div>
            <div id="phone" style={{ display: "flex" }}>
              <div style={LabelStyle}>휴대폰 번호</div>
              <input
                style={InputStyle}
                value={phone}
                onChange={handlePhone}
                onBlur={() => CheckPhoneNumber()}
              ></input>
              <Button
                style={{
                  border: "1px solid #9E777B",
                  color: "#9E777B",
                  height: 35,
                  marginLeft: 6,
                  fontSize: 13,
                }}
                onClick={() => CheckPhoneDuplicate()}
                variant="outlined"
              >
                중복체크
              </Button>
            </div>
            <Button
              variant="contained"
              style={{ width: 200, marginLeft: "35%", background: "#F4C6C9" }}
              onClick={() => ModifyUserInfo()}
            >
              수정 완료
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: 60,
            marginLeft: "28%",
            marginRight: "28%",
            position: "absolute",
            width: "44%",
            height: "45%",
            border: "1px solid #BABABA",
            borderRadius: 7,
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: 50, color: "#706B6B", marginBottom: 30 }}>
            <b>
              비밀번호(8자 이상 12자 이하)는 문자 하나, 숫자 하나가 들어가야
              합니다.
            </b>
          </div>
          <div style={{ display: "flex" }}>
            <div
              id="label"
              style={{
                marginLeft: "16%",
                width: 120,
                marginBottom: 30,
              }}
            >
              새 비밀번호
            </div>
            <input
              style={{ outline: "none", height: 25, width: 300, fontSize: 15 }}
              onChange={handlePassword}
            ></input>
          </div>

          <div style={{ display: "flex" }}>
            <div id="label" style={{ marginLeft: "16%", width: 120 }}>
              비밀번호 확인
            </div>
            <input
              style={{ outline: "none", height: 25, width: 300, fontSize: 15 }}
              onChange={handlePasswordConfirm}
            ></input>
          </div>
          <Button
            variant="contained"
            style={{
              marginTop: 40,
              width: 200,
              height: 33,
              background: "#F4C6C9",
            }}
            onClick={() => ModifyPwd()}
          >
            비밀번호 변경
          </Button>
        </div>
      )}
    </>
  );
}
function mapStateToProps(state) {
  return { userSlice: state.user };
}

function mapDispatchToProps(dispatch) {
  return { updateUser: (user) => dispatch(update(user)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo); 