import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import TextField from "components/common/form_fields/text-field";
import DateField from "components/common/form_fields/date-field";
import NameValueTable from "components/common/table/nameValueTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { axiosApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import KpiActions from "../kpi-editor-actions";
import Modal from "components/common/modal/modal";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function KpiSummaryPanel({ kpiData, fields, setKpiData } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  const parseNameValueArray = (nameValueArray) => {
    let parsedValues = [];

    if (nameValueArray != null)
    {
      for (const key of Object.keys(nameValueArray)) {
        if (key != null) {
          parsedValues.push( { name: key, value: nameValueArray[key] });
        }
      }
    }

    console.log("Parsed Values: " + JSON.stringify(parsedValues));

    return parsedValues;
  };

  // TODO: Move to helper
  function renderTooltip(props) {
    const { message } = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  const deleteKpi = async (kpiData) => {
    kpiData["active"] = false
      try {
        const response = await KpiActions.update(kpiData._id, kpiData, getAccessToken);
        setKpiData({ ...response.data });
        history.push("/admin/kpis/");
      }
      catch (err) {
        console.log(err.message);
      }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      {showDeleteModal ? <Modal header="Confirm Tag Delete"
        message="Warning! Data cannot be recovered once this tag is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteKpi(kpiData)} /> : null}
      { Object.keys(kpiData).length > 0  && <>
        <div className="scroll-y pt-3 px-3">

          <div className="mb-3 flat-top-content-block p-3">
            {/*<div className="mb-2 text-muted">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete this KPI" })} >
                <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" onClick={() => {handleDeleteClick(kpiData);}}/></OverlayTrigger>
            </div>

            <div className="pt-1"><hr/></div>
*/}
            <Row>
              <Col md={4}>
                <TextField label="Name" value={kpiData.name} />
              </Col>
              <Col md={4}>
                <TextField label="KPI ID" value={kpiData._id} />
              </Col>
              <Col md={4}>
                <DateField label="Created" value={kpiData.createdAt} />
              </Col>
              <Col md={4}>
                <TextField label="Tool Identifier" value={kpiData.tool_identifier.map((data) => { return <Button className="mr-2" variant="primary" size="sm">{capitalizeFirstLetter(data)}</Button> })} />
              </Col>
              <Col md={4}>
                <TextField label="State" value={kpiData.active ? "Active" : "Disabled"} />
              </Col>
              <Col md={12}>
                <TextField label="Description" value={kpiData.description} />
              </Col>
            </Row>
          </div>
        </div>
      </>}
    </>
  );
}

KpiSummaryPanel.propTypes = {
  kpiData: PropTypes.object,
  fields: PropTypes.object,
  setKpiData: PropTypes.func
};


export default KpiSummaryPanel;
