import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import ExportJsonButton from "temp-library-components/button/export/ExportJsonButton";

function StandaloneJsonField(
  {
    json,
    titleText,
    className,
    collapsed,
    exportFileName,
    enableClipboard,
    displayDataTypes,
    isLoading,
    minimumHeight,
    maximumHeight,
  }) {
  const rightSideButtons = () => {
    if (enableClipboard !== false && json !== null) {
      return (
        <div className={"d-flex"}>
          <CopyToClipboardButton
            copyString={JSON.stringify(json)}
            size={"sm"}
            className={"ml-3"}
          />
          <ExportJsonButton
            json={json}
            fileName={exportFileName}
            buttonSize={"sm"}
            className={"ml-3"}
          />
        </div>
      );
    }
  };

  return (
    <InfoContainer
      titleIcon={faBracketsCurly}
      titleText={titleText}
      className={className}
      isLoading={isLoading}
      minimumHeight={minimumHeight}
      maximumHeight={maximumHeight}
      titleRightSideButton={rightSideButtons()}
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
  json: PropTypes.any,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  enableClipboard: PropTypes.bool,
  displayDataTypes: PropTypes.bool,
  isLoading: PropTypes.bool,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  exportFileName: PropTypes.string,
};

StandaloneJsonField.defaultProps = {
  enableClipboard: true,
  displayDataTypes: false,
};

export default StandaloneJsonField;