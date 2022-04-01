import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import LoadingDialog from "components/common/status_notifications/loading";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptModel from "components/inventory/scripts/script.model";
import ScriptSummaryPanel from "components/inventory/scripts/details/ScriptSummaryPanel";

function ScriptOverlay({ scriptId }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
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

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

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
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const pullScriptLibrary = async (cancelSource = cancelTokenSource) => {
    const response = await scriptsActions.getScriptById(getAccessToken, cancelSource, scriptId);
    const newScript = response?.data?.data;
    const scriptMetadata = response?.data?.metadata;

    if (newScript) {
      let newModel = {...new ScriptModel({...newScript}, scriptMetadata, false, setScriptModel, getAccessToken, cancelTokenSource, loadData)};
      setScriptModel({...newModel});
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Loading Script"} />;
    }

    if (scriptModel != null) {
      return <ScriptSummaryPanel scriptModel={scriptModel} />;
    }

    return `No Script Found`;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`[${scriptModel?.getData("name")}] Script Viewer`}
      titleIcon={faFileCode}
      showToasts={true}
      isLoading={isLoading}
      pageLink={`/inventory/scripts`}
      linkTooltipText={"Visit Scripts Library"}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

ScriptOverlay.propTypes = {
  scriptId: PropTypes.string,
};

export default ScriptOverlay;