import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";

function AWSBucketNameSelectionInput({  awsToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [bucketList, setBucketList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBucketList([]);
    if ( awsToolId && awsToolId !== "") {
      loadData();
    }
  }, [awsToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getBucketList();
    }
    catch (error) {
      console.error(error);
      toastContext.showFormErrorBanner(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getBucketList = async () => {
    const response  = await AWSActionsHelper.getBucketList(awsToolId, getAccessToken);
    let bucketListResponse = response?.data?.data;

    if (Array.isArray(bucketListResponse)) {
      setBucketList(bucketListResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoBucketsMessage = () => {
    if (!isLoading && (bucketList == null || bucketList.length === 0) && awsToolId !== "") {
      return ("No Buckets Found!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={bucketList}
        busy={isLoading}
        placeholderText={getNoBucketsMessage()}
        clearDataFunction={clearDataFunction}
        valueField="name"
        textField="name"
        disabled={disabled || isLoading || bucketList.length === 0}
      />
    </div>
  );
}

AWSBucketNameSelectionInput.propTypes = {
  awsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

AWSBucketNameSelectionInput.defaultProps = {
  visible: true,
};

export default AWSBucketNameSelectionInput;