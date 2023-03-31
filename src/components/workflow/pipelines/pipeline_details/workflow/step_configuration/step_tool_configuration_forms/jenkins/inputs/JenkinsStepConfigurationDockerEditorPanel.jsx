import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import DockerSecretsInput from "../DockerSecretsInput";
import _ from "lodash";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerTagTypeSelectionInput from "./DockerTagTypeSelectionInput";
import ReactJson from "react-json-view";
import DockerPreviousStepDataInputForm from "./DockerPreviousStepDataInputForm";
import DockerNameInput from "./DockerNameInput";
import DockerCommitShaTrimDirectionSelectionInput from "./DockerCommitShaTrimDirectionSelectionInput";
import NumberPickerInputBase from "components/common/inputs/number/picker/base/NumberPickerInputBase";

function JenkinsStepConfigurationDockerEditorPanel({model, setModel, buildType, plan, stepId}) {
  const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);

  const getDynamicTagFields = () => {

    switch (model?.getData("dockerTagType")) {
      case "other":
        return (
          <TextInputBase
            dataObject={model}
            setDataObject={setModel}
            fieldName={"dockerDynamicTagName"}
          />
        );
      case "commit_sha":
        return (
          <>
            <BooleanToggleInput 
              dataObject={model}
              setDataObject={setModel}
              fieldName={"specifyCommitIdChar"}
            />
            {model?.getData("specifyCommitIdChar") && (
              <>                
                <DockerCommitShaTrimDirectionSelectionInput 
                  dataObject={model}
                  setDataObject={setModel}
                />                
                <NumberPickerInputBase
                  dataObject={model}
                  setDataObject={setModel}                  
                  fieldName={"commitIdCharLimit"}
                />
              </>
            )}            
          </>          
        );
      default:
        return null;
    }
  };

  const getDynamicDockerTagInput = () => {
    if (model?.getData("dynamicTag") === true) {
      return (
        <>
          <DockerTagTypeSelectionInput
            dataObject={model}
            setDataObject={setModel}
            fieldName={"dockerTagType"}
          />
          {getDynamicTagFields()}
        </>
      );
    } else {
      return (
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"dockerTagName"}
        />
      );
    }
  };

  const getDockerTagInputs = () => {
    return (
      <>
        <BooleanToggleInput dataObject={model} setDataObject={setModel} fieldName={"dynamicTag"}/>
        {getDynamicDockerTagInput()}
      </>
    );
  };

  if (buildType !== "docker") {
    return null;
  }

  return (
    <div className={"mb-3"}>      
      <DockerNameInput model={model} setModel={setModel} />
      {getDockerTagInputs()}
      <TextInputBase fieldName={"dockerPath"} dataObject={model} setDataObject={setModel}/>
      <JsonInput
        className={"my-2"}
        fieldName={"buildArgs"}
        model={model}
        setModel={setModel}
      />
      <div className="text-muted mb-2">
        Enter Runtime Build arguments as a key/value pair JSON Object. You can add any number of runtime arguments to
        the JSON Object.
      </div>
      <div className={"my-2"}>
        Sample:
        <div>
          <ReactJson
            name={false}
            className={"my-1 px-2"}
            src={{ Key1: "Value1", Key2: "value2" }}
            displayDataTypes={false}
          />
        </div>
      </div>
      <DockerSecretsInput
        setDataObject={setModel}
        dataObject={model}
        deleteDockerSecrets={deleteDockerSecrets}
        setDeleteDockerSecrets={setDeleteDockerSecrets}
        addSecret={deleteDockerSecrets || _.isEmpty(model.data.dockerBuildPathJson)}
      />
      <DockerPreviousStepDataInputForm 
        setModel={setModel}
        model={model}
        plan={plan}
        stepId={stepId}
      />
    </div>
  );
}

JenkinsStepConfigurationDockerEditorPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  buildType: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default JenkinsStepConfigurationDockerEditorPanel;
