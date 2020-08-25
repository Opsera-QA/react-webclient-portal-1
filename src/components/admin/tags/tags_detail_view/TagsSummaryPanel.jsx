import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import NameValueTable from "../../../common/table/nameValueTable";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import Model from "../../../../core/data_model/model";
import paths from "../../../common/navigation/paths";
import adminTagsActions from "../admin-tags-actions";

function TagsSummaryPanel({ tagData, setTagData }) {
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();

  const parseNameValueArray = (nameValueArray) => {
    let parsedValues = [];

    if (nameValueArray != null) {
      for (const key of Object.keys(nameValueArray)) {
        if (key != null) {
          parsedValues.push({ name: key, value: nameValueArray[key] });
        }
      }
    }

    return parsedValues;
  };

  const handleActiveToggle = async () => {
    if(tagData.isModelValid()) {
      try {
        let newTagData = {...tagData};
        newTagData.setData("active", !newTagData.getData("active"));
        let response = await adminTagsActions.update({...newTagData}, getAccessToken);
        let updatedDto = new Model(response.data, tagData.metaData, false);
        setTagData(updatedDto);
        console.log("Response: " + JSON.stringify(response))
        // let toast = getPersistResultDialog(true, "update", "User", undefined, setShowToast);
        // setToast(toast);
        // setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };


  const handleBackButton = () => {
    history.push("/" + paths.tagManagement);
  }

  return (
    <>
      {tagData &&
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar handleBackButton={handleBackButton} handleActiveToggle={handleActiveToggle}
                          status={tagData.getData("active")}/>
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">

          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={tagData} fieldName={"_id"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={tagData} fieldName={"account"}/>
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={tagData} fieldName={"createdAt"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={tagData} fieldName={"type"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={tagData} fieldName={"value"}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField dataObject={tagData} fieldName={"active"}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-3">
                <NameValueTable tableStyleName="custom-table-2" label="Configuration"
                                data={parseNameValueArray(tagData.configuration)}
                                noDataMessage="No configurations are assigned to this tag."/>
              </div>
            </Col>
          </Row>
        </div>
      </div>}
    </>
  );
}

TagsSummaryPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
};


export default TagsSummaryPanel;
