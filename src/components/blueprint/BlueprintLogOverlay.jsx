import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import blueprintMetadata from "components/blueprint/blueprint-metadata";
import blueprintsActions from "components/blueprint/blueprints-actions";
import BlueprintSearchResult from "components/blueprint/BlueprintSearchResult";
import LoadingDialog from "components/common/status_notifications/loading";

function BlueprintLogOverlay({ pipelineId, runCount }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [logData, setLogData] = useState(undefined);

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
  }, [pipelineId, runCount]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getSearchResults(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSearchResults = async (cancelSource = cancelTokenSource) => {
    let newModel = new Model({...blueprintMetadata.newObjectFields}, blueprintMetadata, false);
    newModel.setData("title", pipelineId);
    newModel.setData("pipelineId", pipelineId);
    newModel.setData("runNumber", runCount);

    let newLog = {
      data: [],
      xmlData: false,
      anchore: false,
      stats: false,
      title: pipelineId,
      runNumber: runCount,
      pipelineId: pipelineId,
    };

    const response = await blueprintsActions.getBlueprintSearchResults(getAccessToken, cancelSource, newModel);

    if (isMounted?.current === true && response?.data) {
      newLog.data = response?.data?.data ? response?.data?.data : [];
      newLog.xmlData = response?.data?.reports?.xml?.status === 200 ? response.data.reports.xml : false;
      newLog.anchore = response?.data?.reports?.anchore_report ? response.data.reports.anchore_report : false;
      newLog.stats = response?.data?.reports?.anchore_stats ? response.data.reports.anchore_stats : false;
      setLogData(newLog);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Loading Blueprint Log Data"} />;
    }

    if (logData != null) {
      return <BlueprintSearchResult logData={logData} closeModal={closePanel} />;
    }

    // TODO: Style better.
    return `No Blueprint Log Data found for Pipeline ${pipelineId} run ${runCount}`;
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Blueprint Search Results`}
      titleIcon={faFileInvoice}
      showToasts={true}
      isLoading={isLoading}
      fullWidth={true}
      pageLink={`/blueprint/${pipelineId}/${runCount}`}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </CenterOverlayContainer>
  );
}

BlueprintLogOverlay.propTypes = {
  pipelineId: PropTypes.string,
  runCount: PropTypes.string
};

export default BlueprintLogOverlay;