import React from "react";
import PropTypes from "prop-types";
import { faCodeSimple } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";

function ExternalRestApiIntegrationEndpointResponseField({
  responseObject,
  height,
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
      <InfoContainer
        titleIcon={faCodeSimple}
        titleText={`External API Response`}
        minimumHeight={height}
        maximumHeight={height}
      >
        <div className={"m-3"}>
          <StandaloneTextFieldBase
            text={String(responseObject?.status)}
            label={"Status Code"}
          />
          {getResponseBodyField()}
        </div>
      </InfoContainer>
    </FieldContainer>
  );
}

ExternalRestApiIntegrationEndpointResponseField.propTypes = {
  responseObject: PropTypes.object,
  height: PropTypes.string,
};

export default ExternalRestApiIntegrationEndpointResponseField;
