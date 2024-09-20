import axios from "axios";

interface RegisterInputs {
    email: string;
    name: string;
    number: number;
    password: string;
    confirmPassword: string;
  }
  interface LoginInputs {
    email: string;
    password: string;
  }
  
  export interface Response {
    token: string;
  }


export   const fetchRegisterData = async (data: RegisterInputs) => {
    await axios
      .post<
      RegisterInputs,
        Response
      >("https://b846882921d4f43c.mokky.dev/register", data)
      .then((data) => localStorage.setItem("token", data.token));
  };



  
    export const fetchLoginData = async (data: LoginInputs) => {
        try {
            const response =  await axios
            .post<Response>("https://b846882921d4f43c.mokky.dev/auth", data)
            localStorage.setItem("token", response.data.token)
            return true;
        } catch (error) {
            console.error('Ошибка авторизации', error)
            return false
        }
     
    };
