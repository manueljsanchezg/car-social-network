import S from "fluent-json-schema";

const bodyRegisterUserSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).pattern(/^[^\d]+$/).required())
  .prop("password", S.string().minLength(8).required());

/*
const bodyLoginUserSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("password", S.string().minLength(8).required());
*/

export const registerUserSchema = {
  body: bodyRegisterUserSchema,
};

export const LoginUserSchema = {
  body: bodyRegisterUserSchema,
};
