import React, {useState} from "react";
import PropTypes from "prop-types";
import {getScriptLanguageDisplayMode} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import PullScriptValueIcon from "components/inventory/scripts/details/PullScriptValueIcon";
import InfoContainer from "components/common/containers/InfoContainer";
import { faExclamationTriangle, faFileCode, faFileDownload } from "@fortawesome/pro-light-svg-icons";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";
import FieldContainer from "components/common/fields/FieldContainer";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetScriptModelById from "components/inventory/scripts/hooks/useGetScriptModelById";

function ScriptViewerField(
  {
    className,
    scriptId,
    titleText,
    pixelHeight,
  }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    scriptModel,
    setScriptModel,
    loadData,
  } = useGetScriptModelById(scriptId);

  const getPullScriptIcon = () => {
    if (isMongoDbId(scriptId) === true) {
      return (
        <PullScriptValueIcon
          setIsLoading={setIsLoading}
          loadScriptFunction={loadData}
          setErrorMessage={setErrorMessage}
        />
      );
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (<CenterLoadingIndicator />);
    }

    if (isMongoDbId(scriptId) !== true) {
      return (
        <CenteredContentWrapper>
          <div className={"mt-5"}>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />
            <span>No Script to view</span>
          </div>
        </CenteredContentWrapper>
      );
    }

    if (hasStringValue(errorMessage) === true) {
      return (
        <CenteredContentWrapper>
          <div className={"mt-5"}>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />{errorMessage}
          </div>
        </CenteredContentWrapper>
      );
    }

    if (scriptModel == null) {
      return (
        <CenteredContentWrapper>
          <div className={"mt-5"}>
            <IconBase icon={faFileDownload} className={"mr-2"} />
            <span>The Script must be pulled from the database before it can be seen</span>
          </div>
        </CenteredContentWrapper>
      );
    }

    return (
      <CodeInputBase
        mode={getScriptLanguageDisplayMode(scriptModel?.getData("type"))}
        isLoading={isLoading}
        setDataFunction={() => {}}
        inputId={`${scriptId}`}
        height={`${pixelHeight - 2}px`}
        value={scriptModel?.getData("value")}
        disabled={true}
      />
    );
  };

  return (
    <FieldContainer>
      <InfoContainer
        titleIcon={faFileCode}
        titleText={titleText}
        titleRightSideButton={getPullScriptIcon()}
        maximumHeight={`${pixelHeight}px`}
        minimumHeight={`${pixelHeight}px`}
        isLoading={isLoading}
        className={className}
      >
        {getBody()}
      </InfoContainer>
    </FieldContainer>
  );
}

ScriptViewerField.propTypes = {
  className: PropTypes.string,
  scriptId: PropTypes.string,
  titleText: PropTypes.string,
  pixelHeight: PropTypes.number,
};

ScriptViewerField.defaultProps = {
  titleText: "Script Viewer",
  pixelHeight: 400,
};

export default ScriptViewerField;