import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import {faClipboard, faTag, faUsers} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import AddDashboardTemplateButton from "components/common/buttons/dashboards/AddDashboardButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import dashboardTemplateMetadata from "components/insights/marketplace/dashboards/dashboard-template-metadata";
import Model from "core/data_model/model";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";

export default function DashboardTemplateCard({ dashboardTemplate, catalog, loadData }) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    getRoles();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setCanDelete(dashboardTemplate?.creator === user?._id || userRoleAccess?.OpseraAdministrator);
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

  const getOwnerNameField = () => {
    if (dashboardTemplate?.owner_name) {
      return (
        <Card.Text>
          <span className="text-muted">
            {dashboardTemplate.owner_name}
          </span>
        </Card.Text>
      );
    }
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

  const getTagsField = () => {
    if (Array.isArray(dashboardTemplate?.tags) && dashboardTemplate.tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {dashboardTemplate.tags.map((tag, i) => {
            return (
              <CustomBadge
                key={i}
                className={"mr-2 mb-1"}
                icon={faTag}
                badgeText={`${capitalizeFirstLetter(tag?.type)}: ${tag.value}`}
              />
            );
         })}
        </CustomBadgeContainer>
      );
    }
  };

  const deleteTemplate = async () => {
    await dashboardTemplatesActions.deleteTemplate(getAccessToken, cancelTokenSource, dashboardTemplate._id, catalog);
    loadData();
  };

  return (
    <Card>
      {getImage()}
      <Card.Body>
      <Card.Title>{dashboardTemplate.name}</Card.Title>
        {getDescriptionField()}
        {getOwnerNameField()}
        <CustomBadgeContainer>
          <CustomBadge icon={faUsers} className="mr-1 upper-case-first" badgeText={dashboardTemplate.attributes?.persona} />
          <CustomBadge icon={faClipboard} className={"upper-case-first"} badgeText={dashboardTemplate.type} />
        </CustomBadgeContainer>
        {getTagsField()}
        <div className={"d-flex justify-content-between mt-3"}>
          <AddDashboardTemplateButton catalog={catalog} dashboardTemplate={dashboardTemplate} />
          <ActionBarDeleteButton2
            className={"mt-auto"}
            dataObject={new Model({...dashboardTemplate}, dashboardTemplateMetadata, false)}
            handleDelete={deleteTemplate}
            visible={canDelete}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

DashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  catalog: PropTypes.string,
  loadData: PropTypes.func
};
