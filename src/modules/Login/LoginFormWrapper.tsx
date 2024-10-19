/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import LoginForm from "./LoginForm";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/AuthServices";
import {
  setAccessToken,
  setIsLogin,
  setUserData,
} from "../../slices/AuthSlice";
import { AppDispatch, RootState } from "../../store";
import { authTokenKeyName } from "../../utils/configs/authConfig";
import { showToast } from "../../utils/showToaster";

export type LoginFormInitialValues = {
  username: string;
  password: string;
};

const LoginFormWrapper = () => {
  const { returnUrl } = useSelector((state: RootState) => state?.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const afterLogin = (res: any) => {
    const userData = {
      username: res?.student?.username,
      name: res?.student?.name,
      userId: res?.student?.id,
    };

    dispatch(setUserData(userData));
    dispatch(setIsLogin(true));
    dispatch(setAccessToken(res?.token));
    localStorage.setItem(authTokenKeyName, res?.token);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate(returnUrl ? `/${returnUrl}` : "/dashboard");
  };

  const [login] = useLoginMutation();

  const initialValues: LoginFormInitialValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string().required("Please enter user name"),
    password: string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginFormInitialValues,
    { setSubmitting }: FormikHelpers<LoginFormInitialValues>
  ) => {
    setSubmitting(true);

    login(values).then((res: any) => {
      setSubmitting(false);
      if (res.error) {
        showToast("error", res?.error?.message);
      } else {
        if (res?.data) {
          afterLogin(res?.data);
          showToast("success", "Login successful");
        } else {
          showToast("error", "Invalid username or password");
        }
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <LoginForm formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormWrapper;
