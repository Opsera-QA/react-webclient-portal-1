import React, {useEffect, useState, useContext, useRef} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import axios from "axios";
import OrganizationLeaderLdapUserSelectInput
  from "components/common/list_of_values_input/settings/organizations/OrganizationLeaderLdapUserSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function OrganizationEditorPanel({organizationData, handleClose }) {
  const [organizationModel, setOrganizationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const {
    isSaasUser,
    userData,
  } = useComponentStateReference();

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

    if (isSaasUser === true) {
      const leader = {
        name: `${userData?.firstName} ${userData?.lastName}`,
        email: userData?.email,
        _id: userData?._id,
      };
      organizationData.setData("leader", leader);
    }

    setOrganizationModel(organizationData);
    setIsLoading(false);
  };

  const createOrganization = async () => {
    return await organizationModel.createModel();
  };

  const updateOrganization = async () => {
    return await organizationModel.saveModel();
  };

  const getDynamicField = () => {
    if (isSaasUser === false) {
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


