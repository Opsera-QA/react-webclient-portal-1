import { hasStringValue } from "components/common/helpers/string-helpers";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.REACT_APP_OPSERA_NODE_JWT_SECRET;

export const apiTokenHelper = {};

apiTokenHelper.generateJwtServiceTokenWithValue = (
  payload = {},
  expirationDuration = "1h",
) => {
  try {
    return jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: expirationDuration,
      },
      undefined,
    );
  } catch (error) {
    // TODO: Should we log error?
    console.error(error);
  }
};

apiTokenHelper.generateApiCallToken = (
  id,
  expirationDuration = "2m",
) => {
  if (hasStringValue(id) === false) {
    return null;
  }

  const payload = {
    id: id,
  };

  return apiTokenHelper.generateJwtServiceTokenWithValue(
    payload,
    expirationDuration,
  );
};