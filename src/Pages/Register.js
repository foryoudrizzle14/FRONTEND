import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {AuthApi} from '../shared/Api'

// 닉네임 정규식
const nicknameRegex = /^[A-Za-z0-9]{3,}$/;
// 비밀번호 정규식
const passwordRegex = /^.{4,}$/;
// 오류 메세지
const alertMessage = {
  nickErr: "닉네임 규칙에 어긋납니다! (영문과 숫자를 사용하여 3글자 이상)",
  pwErr: "비밀번호 규칙에 어긋납니다!!(4글자 이상)",
  pwMachErr: "패스워드가 불일치합니다.",
};

function Register() {
  const [nickName, setNickName] = useState({
    value: "",
    err: null,
  });
  const [password, setPassword] = useState({
    value: "",
    err: null,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    err: null,
  });

  const onNickNameChangeHandler = (event) => {
    const inputNickName = event.target.value;
    setNickName((prevNickName) => ({
      ...prevNickName,
      value: inputNickName,
    }));
  };

  const onPasswordChangeHandler = (event) => {
    const inputPassword = event.target.value;
    setPassword((prevPassword) => ({
      ...prevPassword,
      value: inputPassword,
    }));
  };

  const onConfirmPasswordChangeHandler = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      value: inputConfirmPassword,
    }));
  };

  const verifySiginUpData = () => {
    // 유효성 검사 결과 저장
    const verifiedNickname = nicknameRegex.test(nickName.value);
    const verifiedPassword = passwordRegex.test(password.value);
    const verifiedConfirmPassword = password.value === confirmPassword.value;
    
    setNickName((prevNickName) => ({
      ...prevNickName,
      err: !verifiedNickname,
    }));
    // 비밀번호 유효성 검사
    setPassword((prevPassword) => ({
      ...prevPassword,
      err: !verifiedPassword,
    }));
    // 비밀번호 재입력 일치 여부 검사
    setConfirmPassword((prevConfimPw) => ({
      ...prevConfimPw,
      err: !verifiedConfirmPassword,
    }));
    return !verifiedNickname || !verifiedPassword || !verifiedConfirmPassword
      ? false
      : true;
  };
  const onSubmitHandler = async() => {
    const signUpVerfy = verifySiginUpData();
    if (signUpVerfy) {  // 회원 가입 요청 가능

      try {
        const res = await AuthApi.signup({nickname:nickName.value, password:password.value})
        console.log(res)  
      } catch (err) {
        console.log(err)
      }
      
   

      return;
    } else {
      // 회원가입 부적합으로 함수 종료
      return;
    }
  };
  return (
    <StSignupContainer>
      <h1>회원가입</h1>
      <label>
        닉네임 :
        <StAlertBox>{nickName.err ? alertMessage.nickErr : null}</StAlertBox>
      </label>
      <input
        type="text"
        placeholder="My Nickname"
        onChange={onNickNameChangeHandler}
      />
      <label>
        비밀번호 :
        <StAlertBox>{password.err ? alertMessage.pwErr : null}</StAlertBox>
      </label>
      <input
        type="password"
        placeholder="Password"
        onChange={onPasswordChangeHandler}
      />
      <label>
        비밀번호 재입력 :
        <StAlertBox>
          {confirmPassword.err ? alertMessage.pwMachErr : null}
        </StAlertBox>
      </label>
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={onConfirmPasswordChangeHandler}
      />
      <div>
        <StBtn onClick={onSubmitHandler}>회원가입</StBtn>
        <Link to={"/"}>
          <StBtn>취소</StBtn>
        </Link>
      </div>
    </StSignupContainer>
  );
}
export default Register;

const StSignupContainer = styled.div`
  max-width: 1200px;
  margin: 15px auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: column;
  border: 3px solid black;
`;
const StBtn = styled.button`
  margin: 5px;
`;
const StAlertBox = styled.div`
  color: tomato;
  font-weight: bold;
`;