import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { insightsLookupActions } from "./insightsLookup.actions";
import { AuthContext } from "../../../contexts/AuthContext";
import InsightsLookupDetailsTable from "./InsightsLookupDetailsTable";
import axios from "axios";
import {formatDate} from "../../common/helpers/date/date.helpers";

const InsightsLookupPipelineOverlay = ({ componentName, pipeline, startDate, endDate, orgs }) => {
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

      const DATE_STRING_FORMAT = "MM/dd/yyyy";
      const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
      const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);

      const data = await insightsLookupActions.getComponentByName(
          getAccessToken,
          cancelTokenSource,
          componentName,
          pipeline,
          formattedStartDate,
          formattedEndDate,
          orgs
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
  orgs: PropTypes.array,
};

export default InsightsLookupPipelineOverlay;
