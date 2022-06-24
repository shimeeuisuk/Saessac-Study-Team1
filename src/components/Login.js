function Login() {
  const tryLogin = () =>{
    fetch('')
  }

  return (
    <div>
      <p>Login Page</p>
      <div>
        <p>id</p><input />
        <p>password</p><input type="password"/>
        <div onClick={tryLogin}>Login</div>
      </div>
    </div>
  );
}

export default Login;