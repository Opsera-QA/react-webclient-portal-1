import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import Col from "react-bootstrap/Col";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Row from "react-bootstrap/Row";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function PipelineSubscriptionsPanel({className}) {
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);

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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
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

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      await getActivityLogs(cancelSource);
    }
  };

  const getActivityLogs = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getSubscribedPipelines(getAccessToken, cancelSource);
    const pipelineSubscriptionsData = response?.data?.data;

    if (isMounted?.current === true && pipelineSubscriptionsData) {
      setPipelines(pipelineSubscriptionsData);
    }
  };

  if (isLoading) {
    return <span><LoadingIcon isLoading={isLoading} />Loading Pipeline Subscriptions</span>
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          You are not currently subscribed to any Pipelines</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="mb-2">You are currently subscribed to <strong>{pipelines.length}</strong> pipelines.</div>
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
    </div>
  );
}

PipelineSubscriptionsPanel.propTypes = {
  className: PropTypes.string
};

export default PipelineSubscriptionsPanel;
