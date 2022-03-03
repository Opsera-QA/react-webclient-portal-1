import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faCheckCircle, faExclamationTriangle, faPlus} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";

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
    };
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

    return ("secondary");
  };

  const getLabel = () => {
    if (isSaving) {
      return (<span><IconBase isLoading={true} className={"mr-2"}/>Adding Dashboard</span>);
    }

    if (successfulAdd) {
      return (<span><IconBase icon={faCheckCircle} className={"mr-2"}/>Added To Dashboards!</span>);
    }

    if (failedToAdd) {
      return (<span><IconBase icon={faExclamationTriangle} className={"mr-2"}/>Failed To Add To Dashboards!</span>);
    }

    return (<span><IconBase icon={faPlus} className={"mr-2"}/>Add To My Dashboards</span>);
  };

  return (
    <div className={className}>
      <Button
        variant={getVariant()}
        size={"sm"}
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

export default React.memo(AddDashboardTemplateButton);