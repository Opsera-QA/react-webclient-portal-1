import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import SummaryActionBar from "../../../../../common/actions/SummaryActionBar";

function LdapDepartmentSummaryPanel({ ldapDepartmentData } ) {

  if (ldapDepartmentData == null) {
    return <></>;
  }

  return (
    <>
        <div className="scroll-y pt-2 px-3">
          {/*<SummaryActionBar backButtonPath={`/settings/${orgDomain}/users`} />*/}
          <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
            <Row>
              <Col lg={6}>
                <DtoTextField dataObject={ldapDepartmentData} fieldName={"name"} />
              </Col>
            </Row>
          </div>
        </div>
    </>
  );
}

LdapDepartmentSummaryPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
};


export default LdapDepartmentSummaryPanel;
