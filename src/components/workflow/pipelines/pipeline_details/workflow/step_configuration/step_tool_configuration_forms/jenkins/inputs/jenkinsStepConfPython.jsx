import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PythonFilesInput from "../PythonFilesInput";

function JenkinsStepConfPython({ dataObject, setDataObject }) {
    
    const buildType =dataObject.getData('buildType');

    if(buildType ==="python"){
        return( <>
            <BooleanToggleInput
              dataObject={dataObject}
              setDataObject={setDataObject}
              fieldName={"customScript"}
            />
            {dataObject.getData("customScript") ? (
              <TextAreaInput
                dataObject={dataObject}
                setDataObject={setDataObject}
                fieldName={"commands"}
              />
            ) : (
              <PythonFilesInput
                setDataObject={setDataObject}
                dataObject={dataObject}
                fieldName={"inputDetails"}
              />
            )}
          </>);
    }
    
    return null;
}

JenkinsStepConfPython.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    jenkinsList: PropTypes.any,
};



export default JenkinsStepConfPython;
