import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import Col from "react-bootstrap/Col";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Row from "react-bootstrap/Row";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { pipelineSubscriptionActions } from "components/workflow/pipelines/subscriptions/pipelineSubscription.actions";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function PipelineSubscriptionsPanel({className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [subscribedPipelines, setSubscribedPipelines] = useState([]);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
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
    if (isMounted?.current === true) {
      await getSubscribedPipelines(cancelSource);
    }
  };

  const getSubscribedPipelines = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineSubscriptionActions.getSubscribedPipelines(getAccessToken, cancelSource);
    const pipelineSubscriptions = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(pipelineSubscriptions)) {
      setSubscribedPipelines([...pipelineSubscriptions]);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading Pipeline Subscriptions</div>;
    }

    if (!Array.isArray(subscribedPipelines) || subscribedPipelines.length === 0) {
      return (
        <div className={"form-text text-muted ml-3"}>
          <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          You are not currently subscribed to any Pipelines</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={"mb-2"}>You are currently subscribed to <strong>{subscribedPipelines?.length}</strong> pipelines.</div>
        <Row>
          {subscribedPipelines.map((pipeline) => {
            return (
              <Col md={6} key={pipeline?._id}>
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
  };

  if (isLoading) {
    return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading Pipeline Subscriptions</div>;
  }

  if (!isLoading && (subscribedPipelines == null || subscribedPipelines.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          You are not currently subscribed to any Pipelines</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

PipelineSubscriptionsPanel.propTypes = {
  className: PropTypes.string
};

export default PipelineSubscriptionsPanel;
