import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function JsonFieldBase(
  {
    className,
    json,
    collapsed,
    enableClipboard,
    displayDataTypes,
  }) {
  return (
    <div className={className}>
      <ReactJson
        src={DataParsingHelper.parseJson(json, {})}
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
  json: PropTypes.any,
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