import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from '../shared/Api';

//emaill 정규식 적용
const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegex = /^.{4,}$/;
const alertMessage = {
  emailErr: "이메일 규칙에 어긋납니다!",
  pwErr: "비밀번호 규칙에 어긋납니다!!(4글자 이상)",
  pwMachErr: "패스워드가 불일치합니다.",
};


function Register() {
  const [email, setEmail] = useState({ value: "", err: null });
  const [password, setPassword] = useState({ value: "", err: null });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", err: null });

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail((prevEmail) => ({ ...prevEmail, value: inputEmail }));
  };

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword((prevPassword) => ({ ...prevPassword, value: inputPassword }));
  };

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword((prevConfimPw) => ({ ...prevConfimPw, value: inputConfirmPassword }));
  };

  const validateSignUpData = () => {
    const isEmailValid = emailRegex.test(email.value);
    const isPasswordValid = passwordRegex.test(password.value);
    const doPasswordsMatch = password.value === confirmPassword.value;

    setEmail((prevEmail) => ({ ...prevEmail, err: !isEmailValid }));
    setPassword((prevPassword) => ({ ...prevPassword, err: !isPasswordValid }));
    setConfirmPassword((prevConfimPw) => ({ ...prevConfimPw, err: !doPasswordsMatch }));

    return isEmailValid && isPasswordValid && doPasswordsMatch;
  };

  const handleSubmit = async () => {
    const isSignUpValid = validateSignUpData();

    if (isSignUpValid) {
      try {
        const res = await AuthApi.signup({ email: email.value, password: password.value });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <StSignupContainer>
      <h1>Sign up</h1>
      <label>
        Email:
        <StAlertBox>{email.err ? alertMessage.emailErr : null}</StAlertBox>
      </label>
      <input type="text" placeholder="Email" onChange={handleEmailChange} />
      <label>
        Password:
        <StAlertBox>{password.err ? alertMessage.pwErr : null}</StAlertBox>
      </label>
      <input type="password" placeholder="Password" onChange={handlePasswordChange} />
      <label>
        Confirm Password:
        <StAlertBox>{confirmPassword.err ? alertMessage.pwMachErr : null}</StAlertBox>
      </label>
      <input type="password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
      <div>
        <StBtn onClick={handleSubmit}>Sign Up</StBtn>
        <Link to={"/"}>
          <StBtn>Cancel</StBtn>
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