import {
  InfoCircleFilled,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CImg,
  CRow,
} from "@coreui/react";
import { Button, Form, Input, notification } from "antd";
import Cookies from "js-cookie";
import React, { useReducer, useState } from "react";
import { Redirect } from "react-router-dom";
import userApi from "../../../api/userApi";
import { fakeAuth } from "../../../fakeAuth";
import dataFetchReducer from "./reducer/index";
const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Directstate, setDirectstate] = useState({ redirectToReferrer: false });
  // const [state, setstate] = useState({ email: " ", password: "" });
  const onLogin = (values) => {
    console.log(values);
    // setstate({ email: values.email, password: values.password });
    // props.history.push("/dashboard");
    const fetchCreateProduct = async () => {
      try {
        const response = await userApi.postUser(values);
        console.log("Login succesfully: ", response);
        fakeAuth.authenticate(() => {
          setDirectstate(() => ({
            redirectToReferrer: true,
          }));
        });
        Cookies.set("tokenUser", response.token);
        setTimeout(() => {
          Cookies.remove("tokenUser");
        }, 600000);
        // console.log("token: ", response.token);
      } catch (error) {
        console.log("failed to fetch login: ", error);
        notification.open({
          message: "Login Fail",
          description: "Your email or password is incorrect",
          icon: <InfoCircleFilled style={{ color: "red" }} />,
        });
      }
    };
    fetchCreateProduct();
    setError(null);
    setLoading(true);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [productList, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  const { from } = props.location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = Directstate;
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form form={form} onFinish={onLogin}>
                    <h1>ADMIN LOGIN</h1>
                    <p className="text-muted">Sign In to admin account</p>
                    <Form.Item
                      name="email"
                      className="mb-3"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      className="mb-3"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </Form.Item>

                    <CRow>
                      <CCol xs="12">
                        <Button
                          color="primary"
                          style={{
                            width: "100%",
                            backgroundColor: "blue",
                            color: "white",
                          }}
                          htmlType="submit"
                        >
                          Login
                        </Button>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </Form>
                </CCardBody>
              </CCard>
              <CCard className="text-white d-md-down-none">
                <CImg
                  src={"img/login_bg.jpg"}
                  style={{ width: "100%", height: "auto" }}
                  // fluid
                  // className="mb-2"
                />
                {/* <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>

                </CCardBody> */}
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
