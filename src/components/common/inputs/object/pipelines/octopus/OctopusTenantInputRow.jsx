import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import OctopusTenantStandaloneSelectInput
  from "components/common/list_of_values_input/tools/octopus/tenants/OctopusTenantStandaloneSelectInput";

function OctopusTenantInputRow(
  {
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
          <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
        </Button>
      );
    }
  };

  return (
    <div className="d-flex py-2">
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col sm={6} className={"pl-0 pr-1"}>
            <DropdownList
              data={environmentList}
              valueField={"id"}
              textField={"name"}
              value={environmentId}
              disabled={disabled || !Array.isArray(environmentList) || environmentList.length === 0}
              filter={"contains"}
              placeholder={"Select an Environment"}
              onChange={(newValue) => updateEnvironment(newValue?.id)}
            />
          </Col>
          <Col sm={6} className={"pl-1 pr-0"}>
            <OctopusTenantStandaloneSelectInput
              setDataFunction={updateTenant}
              octopusToolId={model?.getData("octopusToolId")}
              environmentId={model?.getData("environmentId")}
              spaceId={model?.getData("spaceId")}
              projectId={model?.getData("projectId")}
              disabled={disabled}
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
};

export default OctopusTenantInputRow;