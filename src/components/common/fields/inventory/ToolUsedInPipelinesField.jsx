import React, {useContext, useEffect, useState} from "react";
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

function ToolUsedInPipelinesField({ dataObject }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [dataObject]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadPipelines();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadPipelines = async () => {
    if (dataObject.getData("_id") !== "") {
      const response = await toolsActions.getRelevantPipelines(dataObject, getAccessToken);

      if (response?.data != null) {
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
    )
  }

  return (
    <div>
      <div className="form-text text-muted mb-2">
        <span>This tool is used in {pipelines.length} pipelines</span>
      </div>
      {getPipelineCards()}
    </div>
  );
}

ToolUsedInPipelinesField.propTypes = {
  dataObject: PropTypes.object,
};

export default ToolUsedInPipelinesField;