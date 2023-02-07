import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import OrganizationLeaderLdapUserSelectInput
  from "components/common/list_of_values_input/settings/organizations/OrganizationLeaderLdapUserSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";

function OrganizationEditorPanel({organizationData, handleClose }) {
  const [organizationModel, setOrganizationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isSaasUser,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      console.error(error);
    });
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
    <VanityEditorPanelContainer
      setModel={setOrganizationModel}
      model={organizationModel}
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
    </VanityEditorPanelContainer>
  );
}

OrganizationEditorPanel.propTypes = {
  organizationData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default OrganizationEditorPanel;


