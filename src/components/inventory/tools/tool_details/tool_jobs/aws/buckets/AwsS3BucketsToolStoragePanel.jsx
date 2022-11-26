import React, {useContext, useEffect, useRef, useState} from "react";
import AwsS3BucketsTable from "./AwsS3BucketsTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {awsActions} from "components/common/list_of_values_input/tools/aws/aws.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: Only pass in tool id
function AwsS3BucketsToolStoragePanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [awsS3Buckets, setAwsS3Buckets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    if (toolData) {
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
  }, [toolData]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadBuckets(cancelSource);
    }
    catch (error) {
      setError(error);
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadBuckets = async (cancelSource = cancelTokenSource) => {
    const response = await awsActions.getS3BucketList(getAccessToken, cancelSource, toolData.getData("_id"));
    const buckets = DataParsingHelper.parseArray(response?.data?.data, []);
    setAwsS3Buckets([...buckets]);
  };

  return (
    <AwsS3BucketsTable
      isLoading={isLoading}
      toolData={toolData}
      loadData={loadData}
      awsS3Buckets={awsS3Buckets}
      error={error}
    />
  );
}

AwsS3BucketsToolStoragePanel.propTypes = {
  toolData: PropTypes.object,
};

export default AwsS3BucketsToolStoragePanel;
