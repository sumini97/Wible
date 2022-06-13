import SignupPresenter from "./SignupPresenter";
import React, { useState } from "react";
import axios from "axios";
import {
  checkId,
  checkEmail,
  checkNickname,
  checkPhoneNumber,
  checkPhoneDuplicate,
} from "./ValidCheck";

function SignupContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const url = "http://j6a303.p.ssafy.io/api";

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  function CheckId() {
    checkId(email, url);
  }
  function CheckEmail() {
    checkEmail(email);
  }
  function CheckNickname() {
    checkNickname(nickname, url);
  }

  function CheckPhoneNumber() {
    checkPhoneNumber(phoneNumber);
  }

  function CheckPhoneDuplicate() {
    checkPhoneDuplicate(phoneNumber, url);
  }

  const onCreate = () => {
    if (
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      name === "" ||
      nickname === "" ||
      phoneNumber === ""
    ) {
      alert("입력하지 않은 정보가 있습니다. 확인해주세요.");
    } else if (!/^[a-zA-Z0-9]{8,12}$/.test(password)) {
      alert("숫자,영문자 조합으로 8~12자리");
      return;
    } else if (password != passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      console.log(email, password, name, nickname, phoneNumber);
      axios
        .post(url + `/user`, {
          email: email,
          password: password,
          nickname: nickname,
          name: name,
          phone: phoneNumber,
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
            setName("");
            setNickname("");
            setPhoneNumber("");
            alert("회원가입이 완료되었습니다!");
            document.location.href = "/accounts/login";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <SignupPresenter
        onEmailHandler={onEmailHandler}
        checkId={CheckId}
        checkEmail={CheckEmail}
        onPasswordHandler={onPasswordHandler}
        onPasswordConfirmHandler={onPasswordConfirmHandler}
        onNameHandler={onNameHandler}
        onPhoneNumberHandler={onPhoneNumberHandler}
        onNicknameHandler={onNicknameHandler}
        checkNickname={CheckNickname}
        checkPhoneNumber={CheckPhoneNumber}
        checkPhoneDuplicate={CheckPhoneDuplicate}
        onCreate={onCreate}
      ></SignupPresenter>
    </>
  );
}
export default SignupContainer;
