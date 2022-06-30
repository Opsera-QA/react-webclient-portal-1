import React from "react";
import PropTypes from "prop-types";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

function EndpointRequestField(
  {
    titleText,
    endpointObject,
    height,
  }) {
  const getQueryParameterField = () => {
    const queryParameters = dataParsingHelper.parseJson(endpointObject?.queryParameters, false);

    if (queryParameters) {
      return (
        <FieldContainer>
          <StandaloneJsonField
            titleText={"Query Parameters"}
            json={queryParameters}
          />
        </FieldContainer>
      );
    }
  };

  const getRequestBodyField = () => {
    const requestBody = dataParsingHelper.parseJson(endpointObject?.requestBody, false);

    if (requestBody) {
      return (
        <FieldContainer>
          <StandaloneJsonField
            titleText={"Request Body"}
            json={requestBody}
          />
        </FieldContainer>
      );
    }
  };

  if (endpointObject == null) {
    return null;
  }

  return (
    <FieldContainer>
      <InfoContainer
        titleIcon={faCode}
        titleText={titleText}
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

EndpointRequestField.propTypes = {
  endpointObject: PropTypes.object,
  height: PropTypes.string,
  titleText: PropTypes.string,
};

export default EndpointRequestField;
