import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import ActionBarDuplicateButton from "components/common/actions/buttons/ActionBarDuplicateButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";

function ActionBarDuplicatePipelineButton({pipeline, isActionAllowedFunction}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isDuplicating, setIsDuplicating] = useState(false);
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

  const duplicatePipelineFunction = async () => {
    try {
      setIsDuplicating(true);
      await pipelineActions.duplicatePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showSystemInformationToast("A new pipeline configuration has been created, duplicating all of the settings from this one.  That pipeline is now in your list of Pipelines for viewing.  No tools or activity logs have been duplicated in this process.");
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue duplicating this pipeline");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsDuplicating(false);
      }
    }
  };

  if (pipeline == null || isActionAllowedFunction("duplicate_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  return (
    <ActionBarDuplicateButton
      duplicateFunction={duplicatePipelineFunction}
      itemName={"Pipeline"}
      className={"ml-3"}
      isDuplicating={isDuplicating}
    />
  );
}

ActionBarDuplicatePipelineButton.propTypes = {
  pipeline: PropTypes.object,
  isActionAllowedFunction: PropTypes.func
};

export default ActionBarDuplicatePipelineButton;