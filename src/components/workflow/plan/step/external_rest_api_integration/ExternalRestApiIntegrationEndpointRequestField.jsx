import React from "react";
import PropTypes from "prop-types";
import { faCodeSimple } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

function ExternalRestApiIntegrationEndpointRequestField({
  endpointObject,
  height,
}) {
  const getQueryParameterField = () => {
    const queryParameters = dataParsingHelper.parseJson(endpointObject?.queryParameters, false);

    if (queryParameters) {
      return (
        <StandaloneJsonField
          titleText={"Query Parameters"}
          json={queryParameters}
        />
      );
    }
  };

  const getRequestBodyField = () => {
    const requestBody = dataParsingHelper.parseJson(endpointObject?.requestBody, false);

    if (requestBody) {
      return (
        <StandaloneJsonField
          titleText={"Query Parameters"}
          json={requestBody}
        />
      );
    }
  };


  if (endpointObject == null) {
    return null;
  }

  return (
    <FieldContainer>
      <InfoContainer
        titleIcon={faCodeSimple}
        titleText={`External API Request`}
        minimumHeight={height}
        maximumHeight={height}
      >
        <div className={"m-3"}>
          <StandaloneTextFieldBase
            text={endpointObject?.url}
            label={"Endpoint URL"}
            showClipboardButton={true}
          />
          {getQueryParameterField()}
          {getRequestBodyField()}
        </div>
      </InfoContainer>
    </FieldContainer>
  );
}

ExternalRestApiIntegrationEndpointRequestField.propTypes = {
  endpointObject: PropTypes.object,
  height: PropTypes.string,
};

export default ExternalRestApiIntegrationEndpointRequestField;
