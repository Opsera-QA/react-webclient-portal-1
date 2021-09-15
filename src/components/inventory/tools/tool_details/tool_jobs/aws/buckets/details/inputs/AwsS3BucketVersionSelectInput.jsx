import React, {useEffect, useState, useContext, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import awsActions from "../../../aws-actions";

function AwsS3BucketVersionSelectInput({ fieldName, model, setModel }) {

  const { getAccessToken } = useContext(AuthContext);
  const [bucketVersions, setBucketVersions] = useState(undefined);
  const [isVersionLoading, setIsVersionLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadBucketVersions(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadBucketVersions = async (cancelSource = cancelTokenSource) => {
    try {
      setIsVersionLoading(true);
      const response = await awsActions.getS3BucketVersions(getAccessToken, cancelSource);      
      if(response.status === 200) {
        setBucketVersions(response.data.data);
      }

    } catch (error) {
      if(isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsVersionLoading(false);
      }      
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}      
      selectOptions={bucketVersions ? bucketVersions : []}
      valueField="value"
      textField="name"
      isLoading={isVersionLoading}
      placeholder="Select Bucket Version"
    />
  );
}

AwsS3BucketVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default AwsS3BucketVersionSelectInput;
