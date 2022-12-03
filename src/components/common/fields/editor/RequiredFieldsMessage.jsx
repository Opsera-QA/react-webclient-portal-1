import React from "react";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

function RequiredFieldsMessage() {
  return (
    <ButtonContainerBase className={"mt-4"}>
      <div className={"text-muted d-flex"}>
        <div className={"danger-red mr-2"}>*</div>
        <div>Required Fields</div>
      </div>
    </ButtonContainerBase>
  );
}

export default React.memo(RequiredFieldsMessage);