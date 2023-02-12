import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

function JsonFieldBase(
  {
    className,
    json,
    collapsed,
    enableClipboard,
    displayDataTypes,
  }) {
  const parsedJson = DataParsingHelper.parseJson(json, {});
  const sortedObject = DataParsingHelper.parseObject(ObjectHelper.sortObjectDeeply(parsedJson), {});

  return (
    <div className={className}>
      <ReactJson
        src={sortedObject}
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