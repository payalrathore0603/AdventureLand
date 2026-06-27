import * as yup from "yup";

export const signupSchema = yup.object({
    name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  conformPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm Password is required"),

  phone: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits"
    )
    .required(),

  address: yup.object({
    street: yup
      .string()
      .required("Street is required"),

      country: yup
      .string()
      .required("Country name is required"),

       state: yup
      .string()
      .required("State name is required"),

        city: yup
      .string()
      .required("City name is required"),

       pincode: yup
      .string()
      .matches(
        /^[0-9]{6}$/,
        "Pincode must be 6 digits"
      )
      .required("Pincode is required"),
  }),
})