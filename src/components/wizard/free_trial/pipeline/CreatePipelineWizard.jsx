import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import PipelineCreationRadioOptionInput from "components/wizard/free_trial/pipeline/PipelineCreationRadioOptionInput";

function CreatePipelineWizard() {
  const toastContext = useContext(DialogToastContext);
  const [selectedOption, setSelectedOption] = useState(undefined);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={"Tool"}
      showCloseButton={true}
    >
      <div className={"mx-3 my-3"}>
        <PipelineCreationRadioOptionInput
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
    </CreateCenterPanel>
  );
}

CreatePipelineWizard.propTypes = {
  toolMetadata: PropTypes.object,
};

export default CreatePipelineWizard;


