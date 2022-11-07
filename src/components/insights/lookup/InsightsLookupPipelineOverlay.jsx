import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { insightsLookupActions } from "./insightsLookup.actions";
import { AuthContext } from "../../../contexts/AuthContext";
import InsightsLookupDetailsTable from "./InsightsLookupDetailsTable";
import axios from "axios";

const InsightsLookupPipelineOverlay = ({ componentName }) => {
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
};

export default InsightsLookupPipelineOverlay;
