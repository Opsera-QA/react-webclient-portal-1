import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OctopusTenantStandaloneSelectInput
  from "components/common/list_of_values_input/tools/octopus/tenants/OctopusTenantStandaloneSelectInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

function OctopusTenantInputRow(
  {
    rows,
    model,
    disabled,
    updateEnvironment,
    updateTenant,
    deleteRow,
    tenantId,
    environmentId,
    environmentList,
  }) {

  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteRow()}>
          <span><IconBase className={"danger-red"} icon={faTimes}/></span>
        </Button>
      );
    }
  };

  const getDisabledTenants = () => {
    const disabledTenants = [];

    if (Array.isArray(rows) && rows.length > 0) {
      rows.forEach((row) => {
        if (row?.environmentId === environmentId) {
          disabledTenants.push(row.id);
        }
      });
    }

    return disabledTenants;
  };

  return (
    <div className="d-flex py-2">
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col sm={6} className={"pl-0 pr-1"}>
            <StandaloneSelectInput
              selectOptions={environmentList}
              valueField={"id"}
              textField={"name"}
              value={environmentId}
              disabled={disabled}
              placeholderText={"Select an Environment"}
              setDataFunction={(newValue) => updateEnvironment(newValue?.id)}
            />
          </Col>
          <Col sm={6} className={"pl-1 pr-0"}>
            <OctopusTenantStandaloneSelectInput
              setDataFunction={(newValue) => updateTenant(newValue)}
              octopusToolId={model?.getData("octopusToolId")}
              environmentId={environmentId}
              spaceId={model?.getData("spaceId")}
              projectId={model?.getData("projectId")}
              disabled={disabled || getDisabledTenants()}
              value={tenantId}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 ml-auto mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
    </div>
  );
}

OctopusTenantInputRow.propTypes = {
  index: PropTypes.number,
  updateEnvironment: PropTypes.func,
  updateTenant: PropTypes.func,
  deleteRow: PropTypes.func,
  disabled: PropTypes.bool,
  environmentId: PropTypes.string,
  tenantId: PropTypes.string,
  environmentList: PropTypes.array,
  model: PropTypes.object,
  rows: PropTypes.array,
};

export default OctopusTenantInputRow;