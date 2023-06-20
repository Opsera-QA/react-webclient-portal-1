import React from "react";
import {Divider} from "temp-library-components/divider/Divider";

export function FieldDivider() {
  return (
    <div className={"d-flex my-1 mx-3 w-100"}>
      <Divider className={"w-100"} />
    </div>
  );
}

FieldDivider.propTypes = {};