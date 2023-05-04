import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";
import CopyToClipboardButton from "components/common/buttons/clipboard/CopyToClipboardButton";
import ExportJsonButton from "temp-library-components/button/export/ExportJsonButton";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    theme,
  }) {
  const [copiedJson, setCopiedJson] = useState(undefined);

  useEffect(() => {
    setCopiedJson(undefined);
    const parsedJson = DataParsingHelper.parseJson(json);

    if (parsedJson) {
      setCopiedJson({...DataParsingHelper.cloneDeep(parsedJson)});
    }
  }, [json]);

  const rightSideButtons = () => {
    if (enableClipboard !== false && copiedJson != null) {
      return (
        <div className={"d-flex"}>
          <CopyToClipboardButton
            copyString={JSON.stringify(copiedJson, undefined, 2)}
            size={"sm"}
            className={"ml-3"}
          />
          <ExportJsonButton
            json={copiedJson}
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
        json={copiedJson}
        enableClipboard={enableClipboard}
        displayDataTypes={displayDataTypes}
        collapsed={collapsed}
        theme={theme}
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
  theme: PropTypes.string,
};

StandaloneJsonField.defaultProps = {
  enableClipboard: true,
  displayDataTypes: false,
};

export default StandaloneJsonField;