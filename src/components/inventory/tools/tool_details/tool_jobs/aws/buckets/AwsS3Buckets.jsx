import React, {useContext, useEffect, useRef, useState} from "react";
import AwsS3BucketsTable from "./AwsS3BucketsTable";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import AwsS3BucketsOverlay from "./AwsS3BucketsOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import awsActions from "../aws-actions";

function AwsS3Buckets({ toolData, loadData, isLoading, toolApplications }) {
  const toastContext = useContext(DialogToastContext);
  const [awsS3Buckets, setAwsS3Buckets] = useState([]);
  const [isBucketLoading, setIsBucketLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [bucketDetail, setBucketDetail] = useState({});

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

  const onRowSelect = async (grid, row) => {    
    const response = await awsActions.getS3BucketDetails(toolData.getData("_id"), row.regions, row.bucketName, getAccessToken, cancelTokenSource);
    
    if(response.status === 200) {
      setBucketDetail(response.data.message);
    }
    // let selectedRow = toolData?.getArrayData("applications")[row?.index];
    // toastContext.showOverlayPanel(
    //   <AwsS3BucketsOverlay
    //     azureDataObject={selectedRow?.configuration}
    //     applicationId={selectedRow?._id}
    //     toolData={toolData}
    //     loadData={loadData}
    //   />
    // );
  };

  return (
    <AwsS3BucketsTable
      isLoading={isBucketLoading}
      toolData={toolData}
      loadData={loadData}
      onRowSelect={onRowSelect}
      awsS3Buckets={awsS3Buckets}
    />
  );
}

AwsS3Buckets.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolApplications: PropTypes.array
};
export default AwsS3Buckets;
