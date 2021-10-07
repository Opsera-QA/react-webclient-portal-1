import React, {useContext, useEffect, useRef, useState} from "react";
import AwsS3BucketsTable from "./AwsS3BucketsTable";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import awsActions from "../aws-actions";

function AwsS3Buckets({ toolData, loadData, isLoading }) {  
  const [awsS3Buckets, setAwsS3Buckets] = useState([]);
  const [isBucketLoading, setIsBucketLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadBuckets(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadBuckets = async (cancelSource = cancelTokenSource) => {
    try {
      setIsBucketLoading(true);
      const response = await awsActions.getS3BucketList(toolData.getData("_id"), getAccessToken, cancelSource);      
      if(response.status === 200) {
        setAwsS3Buckets(response.data.message);
      }

    } catch (error) {
      if(isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsBucketLoading(false);
      }      
    }
  };

  
  return (
    <AwsS3BucketsTable
      isLoading={isBucketLoading}
      toolData={toolData}
      loadData={loadData}
      awsS3Buckets={awsS3Buckets}
    />
  );
}

AwsS3Buckets.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default AwsS3Buckets;
