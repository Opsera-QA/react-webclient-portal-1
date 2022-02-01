import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "../../buttons/ActionBarButton";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";

function ActionBarPublishPipelineButton({pipeline, isActionAllowedFunction}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isPublishing, setIsPublishing] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handlePublishPipelineFunction = async () => {
    try {
      setIsPublishing(true);
      await pipelineActions.publishPipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showSystemInformationToast("You have published a copy of this pipeline template in your organization's private catalog for others in your organization to use.  Overall settings of the pipeline are shared but no tools or activity logs have been duplicated in this process.");
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue publishing this pipeline");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsPublishing(false);
      }
    }
  };

  if (pipeline == null || isActionAllowedFunction("publish_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={handlePublishPipelineFunction}
      icon={faShareAll}
      popoverText={`Publish this pipeline template to your organization's private catalog`}
      isBusy={isPublishing}
      className={"ml-3"}
    />
  );
}

ActionBarPublishPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  isActionAllowedFunction: PropTypes.func,
};

export default ActionBarPublishPipelineButton;