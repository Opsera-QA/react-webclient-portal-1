import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";
import axios from "axios";

function AWSBucketNameSelectionInput({  awsToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [bucketList, setBucketList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    if ( awsToolId && awsToolId !== "") {
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
      setIsLoading(true);
      await getBucketList(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showFormErrorBanner(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getBucketList = async (cancelSource = cancelTokenSource) => {
    if (isMounted?.current === true) {
      const response  = await AWSActionsHelper.getBucketList(awsToolId, getAccessToken, cancelSource);
      let bucketListResponse = response?.data?.data;

      if (Array.isArray(bucketListResponse)) {
        setBucketList(bucketListResponse);
      }
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