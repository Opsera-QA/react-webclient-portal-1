import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

function JsonFieldBase(
  {
    className,
    json,
    collapsed,
    enableClipboard,
    displayDataTypes,
  }) {
  const getJsonBody = () => {
    if (json && typeof json === "object") {
      return json;
    }

    return {};
  };

  return (
    <div className={className}>
      <ReactJson
        src={getJsonBody()}
        enableClipboard={enableClipboard}
        displayDataTypes={displayDataTypes}
        collapsed={collapsed}
        quotesOnKeys={false}
        indentWidth={2}
      />
    </div>
  );
}

JsonFieldBase.propTypes = {
  json: PropTypes.object,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  enableClipboard: PropTypes.bool,
  displayDataTypes: PropTypes.bool,
};

JsonFieldBase.defaultProps = {
  enableClipboard: false,
  displayDataTypes: false,
};

export default JsonFieldBase;