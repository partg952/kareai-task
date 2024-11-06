"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
export default function Signin() {
  const [selected, setSelected] = useState("login");
  const [loginData, setLoginData] = useState({});
  const [signupData,setSignupData] = useState({});
  return (
    <div className="flex flex-col w-full mx-auto justify-center items-center h-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target);
                }}
              >
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                  }}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    onPress={e => {
                      axios.post(
                        "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/login",loginData
                      ).then(res =>{
                          console.log(res.data);
                      }).catch(err => {
                        console.log(err.response.data.detail);
                      });
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  
                 
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={e => {
                    setSignupData({...signupData,email : e.target.value});
                  }}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onChange={e => {
                    setSignupData({...signupData,password : e.target.value});
                  }}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onPress={e => {
                    axios.post(
                      "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/signup",signupData
                    ).then(res => {
                      console.log(res.data);
                    });
                  }}>
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
