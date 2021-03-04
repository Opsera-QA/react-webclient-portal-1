import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import {AuthContext} from "contexts/AuthContext";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

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

  // TODO: add images
  const getImage = () => {
    return null;
    // {/*<Card.Img variant="top"*/}
    // {/*  className="pt-2 pl-2 pr-2"*/}
    // {/*  src={kpi.thumbnailPath}*/}
    // {/*/>*/}
  };

  const getDescriptionField = () => {
    if (dashboardTemplate?.description) {
      return (
        <Card.Text>
          <span className="overflow-text">
            {dashboardTemplate.description}
          </span>
        </Card.Text>
      );
    }
  };

  const getPersonaField = () => {
    if (dashboardTemplate.attributes?.persona) {
      return (

        <div className="tags">
          <span className="tag">{dashboardTemplate.attributes?.persona}</span>
        </div>
      );
    }
  };

  const getTagsField = () => {
    if (Array.isArray(dashboardTemplate?.tags) && dashboardTemplate.tags.length > 0) {
      return (
        <div className="item-field">
          {dashboardTemplate.tags.map((tag, i) => {
            return (
              <span key={i} className="mx-1 mb-1 badge badge-light tag-badge">
              <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag.value}`}
              </span>
            );
         })}
        </div>
      );
    }
  };

  // TODO: Make separate button component
  const getAddTemplateButton = () => {
    return (
      <Button
        disabled={isSaving}
        onClick={() => addTemplateToDashboards()}>
        {isSaving && (<FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>)}
        Add to My Dashboards
      </Button>
    );
  };

  return (
    <Card className="marketplace-card">
      {getImage()}
      <Card.Body>
      <Card.Title>{dashboardTemplate.name}</Card.Title>
        {getDescriptionField()}
        {getPersonaField()}
        {getTagsField()}
        {getAddTemplateButton()}
      </Card.Body>
    </Card>
  )
}

DashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  catalog: PropTypes.string
};
