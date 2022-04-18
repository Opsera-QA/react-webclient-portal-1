import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {getScriptLanguageDisplayMode} from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import PullScriptValueIcon from "components/inventory/scripts/details/PullScriptValueIcon";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptModel from "components/inventory/scripts/script.model";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import InfoContainer from "components/common/containers/InfoContainer";
import { faExclamationTriangle, faFileCode, faFileDownload } from "@fortawesome/pro-light-svg-icons";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { parseError } from "components/common/helpers/error-helpers";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";
import FieldContainer from "components/common/fields/FieldContainer";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ScriptViewerField(
  {
    className,
    scriptId,
    titleText,
    pixelHeight,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [scriptModel, setScriptModel] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setScriptModel(undefined);

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [scriptId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await pullScriptLibrary(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(parseError(error));
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const pullScriptLibrary = async (cancelSource = cancelTokenSource) => {
    const response = await scriptsActions.getScriptById(getAccessToken, cancelSource, scriptId);
    const newScript = response?.data?.data;
    const scriptMetadata = response?.data?.metadata;

    if (newScript) {
      const newModel = {...new ScriptModel({...newScript}, scriptMetadata, false, setScriptModel, getAccessToken, cancelTokenSource, loadData)};
      setScriptModel({...newModel});
      setErrorMessage("");
    }
  };

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