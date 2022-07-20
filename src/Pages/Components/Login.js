import { Button, Form, message, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../helpers/url";
import "./Login.css";

const Login = () => {
  const onLogin = (values) => {
    const loginData = {
      name: values.username,
      password: values.password,
    };
    axios.post(`${baseURL}/login`, loginData).then((res) => {
      if(res.data.res!== 'UnAuthenticated')
      {
      navigate("/profile",  {state : {userData : res.data}});
      }
      else{
        message.error("Wrong username or password"); 
      }
    });
    if (values.username === "ashif" && values.password === "net1234") {
      navigate("/home");
    } else {
     // message.error("Wrong username or password");
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <body>
        <div class="login-bg">
          <div class="login-left">
            <div class="login-logo">
              <img src="image/logo.png" />
            </div>
            <h1>Welcome back!</h1>
            <p>Sign in to your account to continue</p>

            <div class="login-form">
              <h3>Login</h3>
              <Form onFinish={onLogin}>
              <div>
              <img src="image/email-icon.png"  style = {{float : 'left', margin: "15px 0px 0p 0px"}}/>
                <Form.Item
                name="username"
              >
                  <Input placeholder="Verizon Id" />
                </Form.Item>
                </div>
                <img src="image/pwd-icon.png" style = {{float : 'left', margin: "15px 0px 0p 0px"}}/>
                <Form.Item
                name = "password"
                >
                  <Input
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <div class="forget-password">
                  <a href="">Forget Password?</a>
                </div>
                <div class="login-button">
                  <Button
                    htmlType="submit"
                    style={{
                      backgroundColor: "#D52B1E",
                      border: "none",
                      color: "white",
                      height: '10px'
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
              <div class="login-form-pera">
                <p>Please contact to System Administrator.</p>
              </div>
            </div>
          </div>
          <div class="login-right">
            <img src="image/image.png" />
          </div>
        </div>
      </body>
    </>
  );
};

export default Login;
