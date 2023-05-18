import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../shared/Api";

function LogIn() {
  const [email, setEmail] = useState({
    value: "",
    err: null,
  });
  const [password, setPassword] = useState({
    value: "",
    err: null,
  });

  const onEmailChangeHandler = (event) => {
    const inputEmail = event.target.value;
    setEmail((prevEmail) => ({
      ...prevEmail,
      value: inputEmail,
    }));
  };

  const onPasswordChangeHandler = (event) => {
    const inputPassword = event.target.value;
    setPassword((prevPassword) => ({
      ...prevPassword,
      value: inputPassword,
    }));
  };

  const onSubmitHandler = async () => {
    if (email.value && password.value) {
      alert("Log in!");

      try {
        const res = await AuthApi.signin({
          email: email.value,
          password: password.value,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter your email and password.");
      return;
    }
  };

  return (
    <Container>
      <h1>Log In</h1>
      <label>Email</label>
      <input
        type="text"
        value={email.value}
        placeholder="Type your Email"
        onChange={onEmailChangeHandler}
      />
      <label>Password</label>
      <input
        type="password"
        value={password.value}
        placeholder="Type your Password"
        onChange={onPasswordChangeHandler}
      />
      <div>
        <Button type="submit" onClick={onSubmitHandler}>
          Log In
        </Button>
        <Link to={"/signup"}>
          <Button type="button">Sign Up</Button>
        </Link>
        <Link to={"/"}>
          <Button type="button">Go Back</Button>
        </Link>
      </div>
    </Container>
  );
}

export default LogIn;

const Container = styled.div`
  max-width: 1200px;
  margin: 15px auto;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: column;

  border: 3px solid black;
`;

const Button = styled.button`
  margin: 5px;
`;
