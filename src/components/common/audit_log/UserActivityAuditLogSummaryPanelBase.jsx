import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import JsonField from "components/common/fields/json/JsonField";
import DateTimeField from "components/common/fields/date/DateTimeField";

export default function UserActivityAuditLogSummaryPanelBase(
  {
    auditLogModel,
    className,
  }) {

  if (auditLogModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <Row>
        <Col xs={6}>
          <SmartIdField
            model={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <DateTimeField
            fieldName={"createdAt"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <SsoUserField
            fieldName={"user_id"}
            model={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <EmailAddressField
            fieldName={"user_email"}
            model={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            fieldName={"type"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            fieldName={"action"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <SmartIdField
            fieldName={"target_id"}
            model={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            fieldName={"target_name"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <JsonField
            fieldName={"attributes"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <JsonField
            fieldName={"attributes2"}
            dataObject={auditLogModel}
          />
        </Col>
        {/*<Col xs={12}>*/}
        {/*  <JsonField*/}
        {/*    fieldName={"changeLog"}*/}
        {/*    dataObject={auditLogModel}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col xs={12} md={6}>
          <JsonField
            fieldName={"originalData"}
            dataObject={auditLogModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <JsonField
            fieldName={"newData"}
            dataObject={auditLogModel}
          />
        </Col>
      </Row>
    </div>
  );
}

UserActivityAuditLogSummaryPanelBase.propTypes = {
  auditLogModel: PropTypes.object,
  className: PropTypes.string,
};