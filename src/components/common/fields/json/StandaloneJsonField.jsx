import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";

function StandaloneJsonField(
  {
    json,
    titleText,
    className,
    collapsed,
    enableClipboard,
    displayDataTypes,
  }) {
  return (
    <InfoContainer
      titleIcon={faBracketsCurly}
      titleText={titleText}
      className={className}
    >
      <JsonFieldBase
        className={"m-3"}
        json={json}
        enableClipboard={enableClipboard}
        displayDataTypes={displayDataTypes}
        collapsed={collapsed}
      />
    </InfoContainer>
  );
}

StandaloneJsonField.propTypes = {
  titleText: PropTypes.string,
  json: PropTypes.object,
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