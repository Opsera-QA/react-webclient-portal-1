import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

function ActionBarPublishPipelineButton({pipeline}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const {
    isMounted,
    toastContext,
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

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

  if (pipeline == null || PipelineRoleHelper.canPublishPipelineToCatalog(userData, pipeline) !== true) {
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
};

export default ActionBarPublishPipelineButton;