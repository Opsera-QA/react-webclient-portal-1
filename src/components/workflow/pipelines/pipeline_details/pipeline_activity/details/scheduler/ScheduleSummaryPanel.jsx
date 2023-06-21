import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import taskScheduleMetadata from "components/workflow/pipelines/scheduler/schedule/task-schedule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingDialog from "components/common/status_notifications/loading";

function ScheduleSummaryPanel({scheduleData}) {
  const [scheduleModel, setScheduleModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {isMounted} = useComponentStateReference();

  useEffect(() => {
    initialize().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [scheduleData]);

  const frequency = {
    NONE: "Scheduled for single run.",
    DAY: "Daily", 
    WEEK: "Weekly",
    MONTH: "Monthly"
  };

  const initialize = async () => {
    setIsLoading(true);
    setScheduleModel(new Model({...scheduleData?.data?.api_response?.scheduled_task}, taskScheduleMetadata, false));
    setIsLoading(false);
  };
console.log(scheduleModel);
  if (isLoading || scheduleModel === null) {
    return (<LoadingDialog size="sm"/>);
  }
console.log(scheduleData);
  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <DateTimeField
            fieldName={"executionDate"}
            dataObject={scheduleModel}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            fieldName={"recurring"}
            dataObject={scheduleModel}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ScheduleSummaryPanel.propTypes = {
  scheduleData: PropTypes.object
};

export default ScheduleSummaryPanel;