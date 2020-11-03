import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";
import SummaryActionBarContainer from "../../../../../common/actions/SummaryActionBarContainer";
import ActionBarBackButton from "../../../../../common/actions/buttons/ActionBarBackButton";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import departmentActions from "../department-functions";
import ActionBarDestructiveDeleteButton from "../../../../../common/actions/buttons/ActionBarDestructiveDeleteButton";

function LdapDepartmentSummaryPanel({ ldapDepartmentData, orgDomain }) {
  const { getAccessToken } = useContext(AuthContext);

  if (ldapDepartmentData == null) {
    return <></>;
  }

  const deleteDepartment = () => {
    return departmentActions.deleteDepartment(orgDomain, ldapDepartmentData, getAccessToken);
  };

  const getSummaryActionBar = () => {
    return (
      <SummaryActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/departments"} />
        </div>
        <div>
          <ActionBarDestructiveDeleteButton
            relocationPath={"/admin/departments"}
            dataObject={ldapDepartmentData}
            handleDelete={deleteDepartment}
            deleteTopic={`Department [${ldapDepartmentData.getData("name")}]`}
          />
        </div>
      </SummaryActionBarContainer>
    );
  };

  return (
    <SummaryPanelContainer
      summaryActionBar={getSummaryActionBar()}
    >
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"ownerEmail"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapDepartmentData} fieldName={"departmentGroupName"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapDepartmentSummaryPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  orgDomain: PropTypes.string
};


export default LdapDepartmentSummaryPanel;
