import { FormikProps } from "formik";
import { LoginFormInitialValues } from "./LoginFormWrapper";
import ATMTextField from "../../components/atoms/ATMTextField/ATMTextField";
import ATMPasswordField from "../../components/atoms/ATMPasswordField/ATMPasswordField";
import { ATMButton } from "../../components/atoms/ATMButton/ATMButton";
type Props = {
  formikProps: FormikProps<LoginFormInitialValues>;
};

const LoginForm = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, errors, touched } =
    formikProps;

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col gap-6  md:w-[500px] w-full h-fit">
        <div className="flex flex-col gap-2">
          <i className="font-medium">Welcome!</i>
          <div className="text-xl font-bold"> Login to Play With COde </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* User Name */}
          <div className="">
            <ATMTextField
              name="username"
              value={values.username}
              onChange={(e) => setFieldValue("username", e.target.value)}
              label="User Name"
              placeholder="Enter User Name"
              onBlur={handleBlur}
              isTouched={touched?.username}
              errorMessage={errors?.username}
              isValid={!errors?.username}
            />
          </div>

          {/* Password */}
          <div className="">
            <ATMPasswordField
              name="password"
              value={values.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              label="Password"
              placeholder="Enter Password"
              onBlur={handleBlur}
              isTouched={touched?.password}
              errorMessage={errors?.password}
              isValid={!errors?.password}
            />
          </div>
        </div>
        <div>
          <ATMButton isLoading={isSubmitting} type="submit">
            Login
          </ATMButton>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
