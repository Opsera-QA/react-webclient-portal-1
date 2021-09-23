import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import DockerSecretsInput from "../DockerSecretsInput";
import _ from "lodash";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerTagTypeSelectionInput from "./DockerTagTypeSelectionInput";
import ReactJson from "react-json-view";

function JenkinsStepConfigurationDockerEditorPanel({model, setModel}) {
  const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);

  const getDynamicTagNameField = () => {
    if (model?.getData("dockerTagType") === "other") {
      return (
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"dockerDynamicTagName"}
        />
      );
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
          {getDynamicTagNameField()}
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

  if (model?.getData("buildType") !== "docker") {
    return null;
  }

  return (
    <div className={"mb-3"}>
      <TextInputBase disabled={false} fieldName={"dockerName"} dataObject={model} setDataObject={setModel}/>
      {getDockerTagInputs()}
      <TextInputBase disabled={false} fieldName={"dockerPath"} dataObject={model} setDataObject={setModel}/>
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
      <div className={"mt-2"}>
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
    </div>
  );
}

JenkinsStepConfigurationDockerEditorPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default JenkinsStepConfigurationDockerEditorPanel;
