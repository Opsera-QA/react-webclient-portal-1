import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import RegisterSourceRepositoryHookButton
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";

// TODO: Refactor
function EventBasedTriggerDetails({ pipeline, model, savePipelineFunction }) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");

  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${pipeline?.owner}/${pipeline?._id}/source`);
  }, [JSON.stringify(pipeline)]);


  return (
    <FieldContainer>
      <div className={"d-flex justify-content-between"}>
        <div className={"no-wrap-inline mt-auto"}><h6 className={"mb-0"}>Webhook URL:</h6></div>
        <RegisterSourceRepositoryHookButton
          model={model}
          savePipelineFunction={savePipelineFunction}
          pipeline={pipeline}
          branch={model?.getData("branch")}
        />
      </div>
      <div className={"d-flex mt-2"}>
        <div className={"text-break small-label-text mr-2"}>{triggerUrl}</div>
        <CopyToClipboardIcon copyString={triggerUrl} />
      </div>
    </FieldContainer>
  );
}

EventBasedTriggerDetails.propTypes = {
  pipeline: PropTypes.object,
  model: PropTypes.object,
  savePipelineFunction: PropTypes.func,
};

export default EventBasedTriggerDetails;