import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import RegisterSourceRepositoryHookButton
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import FieldContainer from "components/common/fields/FieldContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CopyToClipboardButton from "components/common/buttons/clipboard/CopyToClipboardButton";

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
      </div>
      <InfoText customMessage={triggerUrl} />
      <div className={"d-flex justify-content-end mt-2"}>
        <CopyToClipboardButton size={"sm"} copyString={triggerUrl} className={"mr-2"} />
        <RegisterSourceRepositoryHookButton
          model={model}
          savePipelineFunction={savePipelineFunction}
          pipeline={pipeline}
        />
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