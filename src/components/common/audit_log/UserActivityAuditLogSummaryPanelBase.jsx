import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import DateTimeField from "components/common/fields/date/DateTimeField";
import MonacoCodeDiffInput from "components/common/inputs/code/monaco/MonacoCodeDiffInput";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import IdRevisionField from "components/common/fields/text/id/IdRevisionField";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

export default function UserActivityAuditLogSummaryPanelBase(
  {
    auditLogModel,
    className,
  }) {

  const getDiffView = () => {
    const originalData = DataParsingHelper.parseObject(auditLogModel?.getData("originalData"));
    const newData = DataParsingHelper.parseObject(auditLogModel?.getData("newData"));

    if (originalData && newData) {
      const sortedOriginalData = ObjectHelper.sortObjectDeeply(originalData);
      const sortedNewData = ObjectHelper.sortObjectDeeply(newData);

      return (
        <MonacoCodeDiffInput
          originalContent={JSON.stringify(sortedOriginalData, null, 2)}
          modifiedContent={JSON.stringify(sortedNewData, null, 2)}
          disabled={true}
          height={`max(calc(${screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT} - 215px), 350px)`}
          model={auditLogModel}
          fieldName={"changeLog"}
          hideClipboardButton={true}
        />
      );
    }

    if (originalData) {
      const sortedOriginalData = ObjectHelper.sortObjectDeeply(originalData);

      return (
        <StandaloneJsonField
          className={"my-2"}
          json={sortedOriginalData}
          titleText={"Object Reference"}
        />
      );
    }

    if (newData) {
      const sortedNewData = ObjectHelper.sortObjectDeeply(newData);

      return (
        <StandaloneJsonField
          className={"my-2"}
          json={sortedNewData}
          titleText={"Object Reference"}
        />
      );
    }
  };

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
          <IdRevisionField
            model={auditLogModel}
          />
        </Col>
        <Col xs={6}>
          <SsoUserField
            fieldName={"user_id"}
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
        <Col xs={12}>
          {getDiffView()}
        </Col>
      </Row>
    </div>
  );
}

UserActivityAuditLogSummaryPanelBase.propTypes = {
  auditLogModel: PropTypes.object,
  className: PropTypes.string,
};