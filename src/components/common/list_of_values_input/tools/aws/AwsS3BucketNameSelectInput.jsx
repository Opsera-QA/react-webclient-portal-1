import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {awsActions} from "components/common/list_of_values_input/tools/aws/aws.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AwsS3BucketNameSelectInput({  awsToolId, visible, fieldName, model, setModel, setDataFunction, clearDataFunction, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const [bucketList, setBucketList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setError(undefined);

    if (hasStringValue(awsToolId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [awsToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getBucketList(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getBucketList = async (cancelSource = cancelTokenSource) => {
    const response = await awsActions.getS3BucketListWithRegions(getAccessToken, cancelSource, awsToolId);
    const buckets = DataParsingHelper.parseArray(response?.data?.data, []);
    setBucketList([...buckets]);
  };

  if (visible === false) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={bucketList}
      busy={isLoading}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      error={error}
    />
  );
}

AwsS3BucketNameSelectInput.propTypes = {
  awsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

export default AwsS3BucketNameSelectInput;