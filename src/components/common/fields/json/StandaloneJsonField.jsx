import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import FieldContainer from "components/common/fields/FieldContainer";

function StandaloneJsonField(
  {
    model,
    label,
    fieldName,
    className,
    collapsed,
    enableClipboard,
    displayDataTypes,
  }) {
  const getJsonBody = () => {
    const json = model?.getData(fieldName);
    if (json && typeof json === "object") {
      return json;
    }

    return {};
  };

  const getLabel = () => {
    if (label) {
      return (
        <div>
          <label className="mb-2 mr-2 text-muted">
            <span>{label}:</span>
          </label>
        </div>
      );
    }
  };

  return (
    <FieldContainer className={className}>
      {getLabel()}
      <div className="ml-3">
        <ReactJson
          src={getJsonBody()}
          enableClipboard={enableClipboard}
          displayDataTypes={displayDataTypes}
          collapsed={collapsed}
        />
      </div>
    </FieldContainer>
  );
}

StandaloneJsonField.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  enableClipboard: PropTypes.bool,
  displayDataTypes: PropTypes.bool,
};

StandaloneJsonField.defaultProps = {
  enableClipboard: false,
  displayDataTypes: false,
};

export default StandaloneJsonField;