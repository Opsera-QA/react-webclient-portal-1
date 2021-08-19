import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import toolsActions from "components/inventory/tools/tools-actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import {getSingularOrPluralString} from "components/common/helpers/string-helpers";
import ToolsUsedInPipelineTable from "components/reports/tools/pipelines/ToolsUsedInPipelineTable";

function ToolUsedInPipelinesField({ dataObject, showTable }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [dataObject]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPipelines(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (cancelSource = cancelTokenSource) => {
    if (dataObject.getData("_id") !== "") {
      const response = await toolsActions.getRelevantPipelinesV2(getAccessToken, cancelSource, dataObject);

      if (isMounted?.current === true && response?.data != null) {
        setPipelines(response?.data?.data);
      }
    }
  };

  const getPipelineCards = () => {
    return (
      <Row>
        {pipelines.map((pipeline) => {
          return (
            <Col md={6} key={pipeline._id}>
              <PipelineSummaryCard
                pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
                loadPipelineInNewWindow={false}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  const getDisplay = () => {
    if (showTable) {
      return (
        <ToolsUsedInPipelineTable data={pipelines} loadData={loadData} isLoading={isLoading} isMounted={isMounted}/>
        );
    }

    return (getPipelineCards());
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Pipelines"} size={"sm"} />;
  }

  if (!isLoading && dataObject == null || dataObject.getData("_id") === "") {
    return <></>;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          This tool is not currently used in any pipelines</span>
        </div>
      </div>
    );
  }
console.log(pipelines);
  return (
    <div>
      <div className="form-text text-muted mb-2">
        <span>This tool is used in {pipelines.length} {getSingularOrPluralString(pipelines?.length, "pipeline","pipelines")}</span>
      </div>
      {getDisplay()}
    </div>
  );
}

ToolUsedInPipelinesField.propTypes = {
  dataObject: PropTypes.object,
  showTable: PropTypes.bool
};

export default ToolUsedInPipelinesField;