import React from "react";
import PropTypes from "prop-types";
import {
  faCog,
} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSourceRepositoryEditorOverlay
  from "components/workflow/plan/source/PipelineSourceRepositoryEditorOverlay";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function EditPipelineWorkflowSourceRepositoryIcon(
  {
    pipeline,
    status,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const launchSourceRepositoryConfigurationOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineSourceRepositoryEditorOverlay
        pipeline={pipeline}
      />
    );
  };

  if (status === "running" || status === "paused") {
    return (
      <OverlayIconBase
        icon={faCog}
        className={"text-muted not-allowed ml-2"}
        onClickFunction={launchSourceRepositoryConfigurationOverlay}
        overlayBody={"Cannot access settings while pipeline is running"}
      />
    );
  }

  return (
    <OverlayIconBase
      icon={faCog}
      className={"text-muted pointer ml-2"}
      onClickFunction={launchSourceRepositoryConfigurationOverlay}
      overlayBody={"Configure pipeline level settings such as source repository and webhook events"}
    />
  );
}

EditPipelineWorkflowSourceRepositoryIcon.propTypes = {
  pipeline: PropTypes.object,
  status: PropTypes.string,
};