import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";
import JsonField from "components/common/fields/json/JsonField";

export default function UserActivityAuditLogObjectView(
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
      </Row>
    </div>
  );
}

UserActivityAuditLogObjectView.propTypes = {
  auditLogModel: PropTypes.object,
  className: PropTypes.string,
};