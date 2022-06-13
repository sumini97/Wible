import axios from "axios";
const url = "";
function checkId(email, url) {
  axios
    .get(url + `/user/email/${email}`)
    .then(function (response) {
      console.log(response.data.valid);
      if (response.data.valid === true) {
        alert("사용 가능한 이메일입니다.");
        return true;
      } else if (response.data.valid === false) {
        alert("이미 존재하는 이메일입니다.");
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function checkEmail(email) {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email) === false) {
    alert("이메일 형식으로 작성하셔야 합니다.");
    return false;
  }
  return true;
}

function checkNickname(nickname, url) {
  let koreanTotalByte = 0;
  let englishTotalByte = 0;
  for (let i = 0; i < nickname.length; i++) {
    if (escape(nickname.charAt(i)).length > 4) {
      //한글일 경우
      koreanTotalByte += 2;
    } else {
      //영어일 경우
      englishTotalByte += 1;
    }
  }
  if (englishTotalByte === 0 && (koreanTotalByte < 4 || koreanTotalByte > 16)) {
    alert("한글닉네임의 경우 2글자 이상 8글자 이하여야 합니다. ");
    return false;
  } else if (
    koreanTotalByte === 0 &&
    (englishTotalByte < 3 || englishTotalByte > 12)
  ) {
    alert("영어닉네임의 경우 3글자 이상 12글자 이하여야 합니다. ");
    return false;
  } else {
    axios
      .get(url + `/user/nickname/${nickname}`)
      .then(function (response) {
        console.log(response);
        if (response.data.valid === false) {
          alert("이미 존재하는 닉네임입니다.");
          return false;
        } else if (response.data.valid === true) {
          alert("사용 가능한 닉네임입니다.");
          return true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function checkPhoneNumber(phoneNumber) {
  const regExp = /^[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}$/;
  if (regExp.test(phoneNumber) === false) {
    alert("휴대폰 번호 형식을 다시 확인해주세요");
    return false;
  }
  return true;
}

function checkPhoneDuplicate(phoneNumber, url) {
  axios
    .get(url + `/user/phone/${phoneNumber}`)
    .then(function (response) {
      if (response.data.valid === true) {
        alert("사용 가능한 휴대폰 번호입니다.");
        return true;
      } else if (response.data.valid === false) {
        alert("이미 존재하는 휴대폰 번호입니다.");
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  checkId,
  checkEmail,
  checkNickname,
  checkPhoneNumber,
  checkPhoneDuplicate,
};
