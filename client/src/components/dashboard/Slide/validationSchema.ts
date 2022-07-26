import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  question: Yup.string().min(5, "Too Short!").required("Required"),
  priority: Yup.number().required("Required"),
});
