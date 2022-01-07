import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";

function SfdcPipelineWizardFileSelectionDateTimeRange({ pipelineWizardModel, setPipelineWizardModel, disabled, className }) {
  const [showLargeDataSetWarning, setShowLargeDataSetWarming] = useState(false);

  const checkFromToDateLimit = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const differenceInMonths =
      toDate.getMonth() - fromDate.getMonth() +
     (12 * (toDate.getFullYear() - fromDate.getFullYear()));

    setShowLargeDataSetWarming(differenceInMonths >= 6);
  };

  const getLargeDataSetWarning = () => {
    if (showLargeDataSetWarning) {
      return (
        <div className="warning-text p-0">
          <FontAwesomeIcon icon={faInfoCircle} fixedWidth className="mr-1" style={{cursor: "help"}}/>
          You have selected a large date range and as such this may take some time to complete.
        </div>
      );
    }
  };

  const setFromDateFunction = (fieldName, value) => {
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("fromDate", value);
    checkFromToDateLimit(value, newDataObject.getData("toDate"));
    setPipelineWizardModel({...newDataObject});
    return newDataObject;
  };

  const setToDateFunction = (fieldName, value) => {
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("toDate", value);
    checkFromToDateLimit(newDataObject.getData("fromDate"), value);
    setPipelineWizardModel({...newDataObject});
    return newDataObject;
  };

  if (pipelineWizardModel.getData("isProfiles") === true) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex justify-content-between"}>
        <div className={"text-muted"}>File Selection Filter Range</div>
        {getLargeDataSetWarning()}
        <div />
      </div>
      <Row>
        <Col sm={12} lg={6}>
          <DateTimeInput
            fieldName={"fromDate"}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            setDataFunction={setFromDateFunction}
            minDate={new Date().setFullYear(new Date().getFullYear() - 1)}
            maxDate={new Date(pipelineWizardModel.getData("toDate"))}
            disabled={disabled}
            dropUp={true}
          />
        </Col>
        <Col sm={12} lg={6}>
          <DateTimeInput
            fieldName={"toDate"}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            setDataFunction={setToDateFunction}
            minDate={new Date(pipelineWizardModel.getData("fromDate"))}
            maxDate={new Date()}
            disabled={disabled}
            dropUp={true}
          />
        </Col>
      </Row>
    </div>
  );
}

SfdcPipelineWizardFileSelectionDateTimeRange.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
};

export default SfdcPipelineWizardFileSelectionDateTimeRange;
