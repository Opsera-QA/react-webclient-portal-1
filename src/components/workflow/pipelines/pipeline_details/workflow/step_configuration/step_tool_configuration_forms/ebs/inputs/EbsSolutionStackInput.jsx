import React, {useContext, useEffect, useRef, useState} from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from 'prop-types';
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";
import EbsSolutionStackVersionInput from "./EbsSolutionStackVersionInput";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

// TODO: Make base component for EbsSolutionStackInput and just handle the extra input and custom setDataFunction inside this EBS pipeline step tailored input
function EbsSolutionStackInput({model, setModel, disabled, awsToolId}) {
  const {getAccessToken} = useContext(AuthContext);
  const [stackList, setStackList] = useState([]);
  const [stackKeyList, setStackKeyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [awsToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setStackList([]);
      setStackKeyList([]);
      setErrorMessage("");

      if (isMongoDbId(awsToolId)) {
        await loadStackList(cancelSource);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Could not load Stack List!");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadStackList = async (cancelSource = cancelTokenSource) => {
    const response = await AWSActionsHelper.getSolutionStackList(getAccessToken, cancelSource, awsToolId);
    const stackList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(stackList) && stackList.length > 0) {
      setStackKeyList(Object.keys(stackList));
      setStackList(stackList);
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newDataObject = model;
    newDataObject.setData("platform", value);
    newDataObject.setData("solutionStackName", "");
    newDataObject.setData("customDockerCompose", false);
    newDataObject.setData("dockerComposeScriptId", "");
    setModel({...newDataObject});
  };

  return (
    <>
      <SelectInputBase
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        dataObject={model}
        filter={"contains"}
        errorMessage={errorMessage}
        selectOptions={stackKeyList}
        busy={isLoading}
        fieldName={"platform"}
        disabled={disabled || isLoading}
      />
      {model?.getData("platform") &&
      <EbsSolutionStackVersionInput
        setDataObject={setModel}
        dataObject={model}
        stackList={stackList}
      />
      }
    </>
  );
}

EbsSolutionStackInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  awsToolId: PropTypes.string,
};

export default EbsSolutionStackInput;

