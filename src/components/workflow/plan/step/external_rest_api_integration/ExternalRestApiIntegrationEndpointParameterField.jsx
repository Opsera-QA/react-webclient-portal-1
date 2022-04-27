import React, { useState } from "react";
import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import InfoContainer from "components/common/containers/InfoContainer";

//TODO: We should probably make a better displayer
function ExternalRestApiIntegrationEndpointParameterField({
  fieldName,
  model,
  height,
  titleRightSideButton,
}) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <InfoContainer
      titleIcon={faCheckCircle}
      titleText={`Constructed ${model?.getLabel(fieldName)}`}
      className={"h-100"}
      minimumHeight={height}
      maximumHeight={height}
      titleRightSideButton={titleRightSideButton}
    >
      <div className={"m-3"}>
        <JsonFieldBase
          className={"h-100 mb-2"}
          json={model?.getData(fieldName)}
        />
        <div className={"mt-auto"}>
          <InfoText
            customMessage={`
                 Please Note: Until updated and saved, 
                 this will include all previously saved fields.
               `}
          />
        </div>
      </div>
    </InfoContainer>
  );
}

ExternalRestApiIntegrationEndpointParameterField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  height: PropTypes.string,
  titleRightSideButton: PropTypes.object,
};

export default ExternalRestApiIntegrationEndpointParameterField;
