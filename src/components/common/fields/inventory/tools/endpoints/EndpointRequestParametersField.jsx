import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import EndpointRequestParameterFieldSummaryPanel from "components/common/fields/inventory/tools/endpoints/EndpointRequestParameterFieldSummaryPanel";
import endpointRequestFieldMetadata from "@opsera/definitions/constants/api/request/body/endpointRequestField.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

export default function EndpointRequestParametersField(
  {
    model,
    fieldName,
    className,
  }) {
  const field = model?.getFieldById(fieldName);
  const requestParameterObjects = DataParsingHelper.parseArray(model?.getData(fieldName));

  const getBody = () => {
    return requestParameterObjects.map((requestParameter, index) => {
      return (
        <EndpointRequestParameterFieldSummaryPanel
          key={`${fieldName}-${index}`}
          model={modelHelpers.parseObjectIntoModel(requestParameter, endpointRequestFieldMetadata)}
        />
      );
    });
  };

  if (field == null || requestParameterObjects == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <H4FieldSubHeader
        subheaderText={field?.label}
      />
      {getBody()}
    </FieldContainer>
  );
}

EndpointRequestParametersField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};
