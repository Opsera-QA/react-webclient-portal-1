import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import {AuthContext} from "contexts/AuthContext";

export default function DashboardTemplateCard({ dashboardTemplate, catalog }) {
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const addTemplateToDashboards = async (cancelSource = cancelTokenSource) => {
    try {
      setIsSaving(true);
      await dashboardTemplatesActions.addTemplateToDashboards(getAccessToken, cancelSource, dashboardTemplate._id, catalog);
      toastContext.showFormSuccessToast("Added Template to Dashboards");
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        toastContext.showServiceUnavailableDialog();
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  return (
    <Card className="marketplace-card">
      {/*<Card.Img variant="top"*/}
      {/*  className="pt-2 pl-2 pr-2"*/}
      {/*  src={kpi.thumbnailPath}*/}
      {/*/>*/}
      <Card.Body>
      <Card.Title>{dashboardTemplate.name}</Card.Title>
        <Card.Text>
          <span className="overflow-text">
            {dashboardTemplate.description}
          </span>
        </Card.Text>
          <ul className="tags">
            {/*{kpi.tools.map((tool,idx)=>{*/}
            {/*  return (idx < 8) ? <li key={idx}><span className="tag">{tool}</span></li> : null*/}
            {/*})}*/}
          </ul>
        <Card.Text>
          {/*<small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(kpi.updatedAt))} ago.</small>*/}
        </Card.Text>
        <Button
          disabled={isSaving}
          onClick={() => addTemplateToDashboards()}>
          {isSaving && (<FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>)}
          Add to dashboard
        </Button>
      </Card.Body>
    </Card>
  )
}

DashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  catalog: PropTypes.string
};
