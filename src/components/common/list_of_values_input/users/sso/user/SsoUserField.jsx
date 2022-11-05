import React from "react";
import PropTypes from "prop-types";
import useGetSsoUserById from "components/common/list_of_values_input/users/sso/user/useGetSsoUserById";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function SsoUserField(
  {
    model,
    fieldName,
    className,
  }) {
  const field = model?.getFieldById(fieldName);
  const ssoUserId = model?.getData(fieldName);
  const {
    ssoUser,
    isLoading,
    error,
  } = useGetSsoUserById(
    ssoUserId,
    false,
  );

  const getFormattedValue = () => {
    if (isMongoDbId(ssoUserId) !== true) {
      return "";
    }

    if (ssoUser) {
      return `${ssoUser.firstName} ${ssoUser.lastName} (${ssoUser.email})`;
    }

    return ssoUserId;
  };

  if (field == null) {
    return null;
  }

  return (
    <StandaloneTextFieldBase
      className={className}
      text={getFormattedValue()}
      isBusy={isLoading}
      label={field?.label}
      error={error}
    />
  );
}

SsoUserField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};