import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {awsActions} from "components/common/list_of_values_input/tools/aws/aws.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AwsBucketSelectInput(
  {
    s3ToolId,
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [awsBuckets, setAwsBuckets] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setAwsBuckets([]);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(s3ToolId) === true) {
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
  }, [s3ToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadAwsStorageAccounts(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadAwsStorageAccounts = async (cancelSource) => {
    const response = await awsActions.getS3BucketList(getAccessToken, cancelSource, s3ToolId);
    const buckets = DataParsingHelper.parseArray(response?.data?.data, []);
    setAwsBuckets([...buckets]);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      busy={isLoading}
      disabled={disabled}
      selectOptions={awsBuckets}
      error={error}
      visible={visible}
    />
  );
}

AwsBucketSelectInput.propTypes = {
  s3ToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

AwsBucketSelectInput.defaultProps = {
  valueField: "bucketName",
  textField: "bucketName",
};

export default AwsBucketSelectInput;