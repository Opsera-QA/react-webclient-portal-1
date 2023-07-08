import React from "react";
import PropTypes from "prop-types";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function EndpointResponseField(
  {
    responseObject,
    titleText,
  }) {
  const getResponseBodyField = () => {
    const response = responseObject?.message;

    if (typeof response === "object") {
      return (
        <StandaloneJsonField
          titleText={"Response Body"}
          json={response}
        />
      );
    }

    return (
      <StandaloneTextFieldBase
        text={String(response)}
        label={`Response Body (${capitalizeFirstLetter(typeof response)})`}
      />
    );
  };

  if (responseObject == null) {
    return null;
  }

  return (
    <FieldContainer>
      <H5FieldSubHeader
        subheaderText={titleText}
      />
      <StandaloneTextFieldBase
        text={String(responseObject?.status)}
        label={"Status Code"}
      />
      {getResponseBodyField()}
    </FieldContainer>
  );
}

EndpointResponseField.propTypes = {
  responseObject: PropTypes.object,
  titleText: PropTypes.string,
};
