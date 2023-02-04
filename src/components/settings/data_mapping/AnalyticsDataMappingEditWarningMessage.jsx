import React from "react";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";

export default function AnalyticsDataMappingEditWarningMessage() {
  return (
    <WarningMessageFieldBase
      className={"my-2"}
      message={"Editing an active Analytics Data Mapping will result in loss of filtering functionality from data previously mapped with this information"}
    />
  );
}
