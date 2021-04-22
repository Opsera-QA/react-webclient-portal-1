import React, {useEffect, useState, useContext, useRef} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import organizationActions from "components/settings/organizations/organization-actions";
import axios from "axios";
import OrganizationLeaderLdapUserSelectInput
  from "components/common/list_of_values_input/settings/organizations/OrganizationLeaderLdapUserSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";

function OrganizationEditorPanel({organizationData, handleClose }) {
  const {getAccessToken, isSassUser, getUserRecord} = useContext(AuthContext);
  const [organizationModel, setOrganizationModel] = useState(undefined);
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

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const loadData = async () => {
    setIsLoading(true);
    setOrganizationModel(organizationData);

    if (isSassUser()) {
      const user = await getUserRecord();
      let leader = {};
      leader["name"] = user?.firstName + " " + user?.lastName;
      leader["email"] = user?.email;
      leader["_id"] = user?._id;
      organizationData.setData("leader", leader);
    }

    setIsLoading(false);
  };

  const createOrganization = async () => {
    return await organizationActions.createOrganizationV2(getAccessToken, cancelTokenSource, organizationModel);
  };

  const updateOrganization = async () => {
    return await organizationActions.updateOrganizationV2(getAccessToken, cancelTokenSource, organizationModel);
  };

  const getDynamicField = () => {
    if (!isSassUser()) {
      return (
        <Col lg={6}>
          <OrganizationLeaderLdapUserSelectInput dataObject={organizationModel} setDataObject={setOrganizationModel} />
        </Col>
      );
    }
  };

  if (isLoading || organizationModel == null) {
    return (<LoadingDialog />);
  }

  return (
    <EditorPanelContainer
      createRecord={createOrganization}
      updateRecord={updateOrganization}
      setRecordDto={setOrganizationModel}
      recordDto={organizationModel}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase fieldName={"name"} dataObject={organizationModel} setDataObject={setOrganizationModel}/>
        </Col>
        {getDynamicField()}
        <Col lg={6}>
          <TagMultiSelectInput dataObject={organizationModel} setDataObject={setOrganizationModel} />
        </Col>
        <Col lg={6}>
          <ActivityToggleInput dataObject={organizationModel} setDataObject={setOrganizationModel} fieldName={"active"} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

OrganizationEditorPanel.propTypes = {
  organizationData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default OrganizationEditorPanel;


