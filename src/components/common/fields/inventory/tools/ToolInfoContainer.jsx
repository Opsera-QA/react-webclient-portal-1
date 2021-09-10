import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import ToolReadOnlyDetailPanel from "components/inventory/tools/tool_details/ToolReadOnlyDetailPanel";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";

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
      const response = await toolsActions.getRoleLimitedToolByIdV2(getAccessToken, cancelSource, toolId);

      if (response?.data?.data) {
        setToolModel(new Model(response.data.data[0], toolMetadata, false));
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

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Tool Data"} />);
  }

  // TODO: Merge this in once OPL-1459 is approved
  return (
    <InfoContainer
      titleIcon={faTools}
      titleText={`${toolModel?.getData("name")}`}
    >
      <ToolReadOnlyDetailPanel toolModel={toolModel} />
    </InfoContainer>
  );
}

ToolInfoContainer.propTypes = {
  toolId: PropTypes.string,
};

export default ToolInfoContainer;