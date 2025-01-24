import S from "fluent-json-schema";

const headerSchema = S.object()
    .prop("authorization", S.string().pattern(/^Bearer\s.+$/).required());

const bodyCreateCarSchema = S.object()
  .prop("model", S.string().minLength(1).pattern(/^[^\d]+$/).required())
  .prop("brand", S.string().minLength(1).pattern(/^[^\d]+$/).required())
  .prop("cv", S.number().minimum(1).required())
  .prop("year", S.number().minimum(1).required());

const bodyUpdateCarSchema = S.object()
  .prop("model", S.string().minLength(1))
  .prop("brand", S.string().minLength(1))
  .prop("cv", S.number().minimum(1))
  .prop("year", S.number().minimum(1));

export const createCarSchema = {
  headers: headerSchema,
  body: bodyCreateCarSchema,
};

export const updateCarSchema = {
  headers: headerSchema,
  body: bodyUpdateCarSchema,
};
