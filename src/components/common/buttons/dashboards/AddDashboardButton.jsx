import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faSync, faCheckCircle, faExclamationTriangle, faPlus} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";

function AddDashboardTemplateButton({ disable, dashboardTemplate, catalog, className }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [successfulAdd, setSuccessfulAdd] = useState(false);
  const [failedToAdd, setFailedToAdd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setSuccessfulAdd(false);
      setFailedToAdd(false);
      await dashboardTemplatesActions.addTemplateToDashboards(getAccessToken, cancelSource, dashboardTemplate._id, catalog);
      setSuccessfulAdd(true);
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        setFailedToAdd(true);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  const getVariant = () => {
    if (successfulAdd) {
      return "success";
    }

    if (failedToAdd) {
      return "danger";
    }

    return ("primary");
  };

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Adding Dashboard</span>);
    }

    if (successfulAdd) {
      return (<span><FontAwesomeIcon icon={faCheckCircle} className="mr-2" fixedWidth/>Added To Dashboards!</span>);
    }

    if (failedToAdd) {
      return (<span><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth/>Failed To Add To Dashboards!</span>);
    }

    return (<span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-2"/>Add To My Dashboards</span>);
  };

  return (
    <div className={className}>
      <Button
        variant={getVariant()}
        disabled={isSaving || disable}
        onClick={() => addTemplateToDashboards()}>
        {getLabel()}
      </Button>
    </div>
  );
}

AddDashboardTemplateButton.propTypes = {
  disable: PropTypes.bool,
  dashboardTemplate: PropTypes.object,
  catalog: PropTypes.string,
  className: PropTypes.string
};

export default AddDashboardTemplateButton;