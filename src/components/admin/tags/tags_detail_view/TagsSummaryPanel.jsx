import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import TextField from "../../../common/form_fields/text-field";
import DateField from "../../../common/form_fields/date-field";
import NameValueTable from "../../../common/table/nameValueTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { axiosApiService } from "../../../../api/apiService";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import adminTagsActions from "../admin-tags-actions";
import Modal from "../../../common/modal";

function TagsSummaryPanel({ tagData, fields, setTagData } ) {
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

  const deleteTag = async (tagData) => {
    try {
      console.log("Deleting tag: " + JSON.stringify(tagData._id));
      let response = await adminTagsActions.delete(tagData._id, getAccessToken);

      console.log("Delete response: " + JSON.stringify(response));
      setShowDeleteModal(false);
      history.push("/admin/tags/");
    }
    catch (err) {
      console.log(err.message);
    }
  };

  // TODO: Implement if necessary
  // const duplicateTag = async (tagData) => {
  //   try {
  //     console.log("Duplicating tag: " + JSON.stringify(tagData._id));
  //     let response = await adminTagsActions.duplicate(tagData._id, getAccessToken);
  //
  //     console.log("Duplicate response: " + JSON.stringify(response));
  //     // setShowDeleteModal(false);
  //     history.push("/admin/tags/" + response.data._id);
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      {showDeleteModal ? <Modal header="Confirm Tag Delete"
        message="Warning! Data cannot be recovered once this tag is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteTag(tagData)} /> : null}
      { Object.keys(tagData).length > 0  && <>
        <div className="scroll-y pt-3 px-3">

          <div className="mb-3 flat-top-content-block p-3">
            <div className="mb-2 text-muted">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete this tag" })} >
                <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" onClick={() => {handleDeleteClick(tagData);}}/></OverlayTrigger>
              {/*TODO: Implement and add confirmation Modal?*/}
              {/*<OverlayTrigger*/}
              {/*  placement="top"*/}
              {/*  delay={{ show: 250, hide: 400 }}*/}
              {/*  overlay={renderTooltip({ message: "Duplicate this tag configuration" })} >*/}
              {/*  <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {duplicateTag(tagData);}}/></OverlayTrigger>*/}
            </div>

            <div className="pt-1"><hr/></div>

            <Row>
              <Col>
                <TextField label="Tag ID" value={tagData._id} />
              </Col>
              <Col>
                <TextField label="Account" value={tagData.account} />
              </Col>
              <Col>
                <DateField label="Created" value={tagData.createdAt} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField label="Value" value={tagData.value} />
              </Col>
              <Col>
                <TextField label="Owner" value={tagData.owner_name} />
              </Col>
              <Col>
                <TextField label="State" value={tagData.active ? "Active" : "Disabled"} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mt-3">
                  <NameValueTable tableStyleName="custom-table-2" label="Configuration" data={parseNameValueArray(tagData.configuration)} noDataMessage="No configurations are assigned to this tag."/>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>}
    </>
  );
}

TagsSummaryPanel.propTypes = {
  tagData: PropTypes.object,
  fields: PropTypes.object,
  setTagData: PropTypes.func
};


export default TagsSummaryPanel;
