import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import ToolReadOnlyDetailPanel from "components/inventory/tools/tool_details/ToolReadOnlyDetailPanel";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {Link} from "react-router-dom";

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
        setToolModel(new Model(tool, metadata, false));
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

  const getBody = () => {
    if (toolModel) {
      return (
        <div>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
            <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
            <div>
              <Link to={`/inventory/tools/details/${toolId}`} target="_blank" rel="noopener noreferrer">
                Click here to view the selected Tool&apos;s details
              </Link>
            </div>
          </div>
          <ToolReadOnlyDetailPanel toolModel={toolModel} />
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

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Tool Data"} />);
  }

  // TODO: Merge this in once OPL-1459 is approved
  return (
    <InfoContainer
      titleIcon={faTools}
      titleText={`${toolModel?.getData("name")}`}
    >
      {getBody()}
    </InfoContainer>
  );
}

ToolInfoContainer.propTypes = {
  toolId: PropTypes.string,
};

export default ToolInfoContainer;