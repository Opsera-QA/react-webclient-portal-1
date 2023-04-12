import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { insightsLookupActions } from "./insightsLookup.actions";
import { AuthContext } from "../../../contexts/AuthContext";
import InsightsLookupDetailsTable from "./InsightsLookupDetailsTable";
import axios from "axios";

const InsightsLookupPipelineOverlay = ({ componentName, pipeline, startDate, endDate }) => {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [lookupDetails, setLookupDetails] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const data = await insightsLookupActions.getComponentByName(
        getAccessToken,
        cancelTokenSource,
        componentName,
          pipeline,
          startDate,
          endDate
      );

      setLookupDetails(data.data.results);
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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  lookupDetails.forEach((temp) => {
    temp.difference = ((new Date(temp.endTimestamp) - new Date(temp.startTimestamp))/60000).toFixed(2).toString();
    if(temp.checkOnly == false){
      temp.deployed = true;
    } else{
      temp.deployed = false;
    }

    if(temp.checkOnly == true){
      temp.validated = true;
    } else{
      temp.validated = false;
    }

    if(temp.checkOnly == true && (temp.successUnitTests.length > 0  || temp.failedUnitTests.length > 0)){
      temp.unitTests = true;
    } else{
      temp.unitTests = false;
    }
  });

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`${componentName} Deployment Details`}
      showToasts={true}
      showCloseButton={false}
    >
      <InsightsLookupDetailsTable
        lookupDetails={lookupDetails}
        isLoading={isLoading}
        loadDataFunction={loadData}
      />
    </CenterOverlayContainer>
  );
};

InsightsLookupPipelineOverlay.propTypes = {
  componentName: PropTypes.string,
  pipeline: PropTypes.string,
  startDate: PropTypes.string,
  endDate:PropTypes.string,
};

export default InsightsLookupPipelineOverlay;
