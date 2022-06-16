import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import awsActions from "components/inventory/tools/tool_details/tool_jobs/aws/aws-actions";

function LogsBackupManagementAwsStorageAccountSelectInput({fieldName, model, setModel, disabled, textField, valueField, s3ToolId}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [awsStorageAccounts, setAwsStorageAccounts] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setScheduledTasks([]);
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
      setIsLoading(true);
      await loadAwsStorageAccounts(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadAwsStorageAccounts = async (cancelSource) => {
    const response = await awsActions.getS3BucketList(s3ToolId, getAccessToken, cancelSource);
    const awsStorageAccountsList = response?.data?.message;
    console.log(response);
  };

  const setDataFunction = (fieldName, selectedOption) => {
    const task = model?.getData("task");
    task.region = selectedOption?.regions;
    task.awsBucketName = selectedOption?.bucketName;
    model.setData("task", task);
    setModel({...model});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      selectOptions={awsStorageAccounts}
    />
  );
}

LogsBackupManagementAwsStorageAccountSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  s3ToolId: PropTypes.string
};

LogsBackupManagementAwsStorageAccountSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "task.awsBucketName",
};

export default LogsBackupManagementAwsStorageAccountSelectInput;