import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import ToolReadOnlyDetailPanel from "components/inventory/tools/details/read_only_panel/ToolReadOnlyDetailPanel";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {Link} from "react-router-dom";
import ToolModel from "components/inventory/tools/tool.model";

function ToolInfoContainer({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolModel, setToolModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, toolId);
      const tool = response?.data?.data;

      if (isMounted?.current === true && tool) {
        const metadata = response?.data?.metadata;
        setToolModel(new ToolModel(tool, metadata, false, getAccessToken, cancelTokenSource));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getInfoText = () => {
    if (toolModel) {
      return (
        <div className="text-muted mb-2">
          Configuration details for this item are listed below. Tool and account specific settings are stored in the
          <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
          <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
          <div>
            <Link to={`/inventory/tools/details/${toolId}`} target="_blank" rel="noopener noreferrer">
              Click here to visit the selected Tool&apos;s Registry entry
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="text-muted mb-2">
        The selected Tool was not found when pulling available tools. Its Access Rules may have changed or it may have been deleted.
        <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
        <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
      </div>
    );
  };

  const getBody = () => {
    if (toolModel) {
      return (
        <ToolReadOnlyDetailPanel
          toolModel={toolModel}
        />
      );
    }
  };

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading Tool Data"}
      />
    );
  }

  return (
    <div>
      {getInfoText()}
      <InfoContainer
        titleIcon={faTools}
        titleText={`${toolModel?.getData("name")}`}
      >
        {getBody()}
      </InfoContainer>
    </div>
  );
}

ToolInfoContainer.propTypes = {
  toolId: PropTypes.string,
};

export default ToolInfoContainer;