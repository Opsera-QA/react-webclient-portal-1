import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeactivateUserButton from "components/admin/registered_users/actions/deactivate_user/DeactivateUserButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import ShowUserDetailsButton from "components/admin/registered_users/actions/show_details/ShowUserDetailsButton";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import InsightsCardContainerBase from "components/common/card_containers/InsightsCardContainerBase";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import DeployElkButton from "components/admin/registered_users/actions/deploy_elk/DeployElkButton";
import UserToolsTable from "components/admin/registered_users/actions/users_tools/UserToolsTable";
import SonarVulnerabilitiesMetricScorecardMetaData from "components/insights/charts/sonar/table/vulnerabilities-scorecard/SonarVulnerabilitiesMetricScorecardMetaData";
import SonarBugsMetricScorecardMetaData from "components/insights/charts/sonar/table/bugs-scorecard/SonarBugsMetricScorecardMetaData";
import SonarCodeSmellsMetricScorecardMetaData from "components/insights/charts/sonar/table/codesmells-scorecard/SonarCodeSmellsMetricScorecardMetaData";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import SuccessMetricIcon from "components/common/icons/metric/success/SuccessMetricIcon";
import DangerMetricIcon from "components/common/icons/metric/danger/DangerMetricIcon";
import NoTrendMetricIcon from "components/common/icons/metric/trend/NoTrendMetricIcon";
import InsightHighlightFieldWithTrendIcon from "components/common/fields/text/InsightHighlightFieldWithTrendIcon";

function SonarSummaryCard({ sonarData, loadData, type }) {
  let history = useHistory();
  const [sonarMetricScorecardDto, setSonarMetricScorecardDto] = useState(undefined);

  useEffect(() => {
    initializeDto();
  }, [sonarData]);

  const initializeDto = async () => {    
    switch (type) {
        case "bugs":         
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarBugsMetricScorecardMetaData, false));
            return;
        case "vulnerabilities":            
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarVulnerabilitiesMetricScorecardMetaData, false));
            return;
        case "code-smells":
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarCodeSmellsMetricScorecardMetaData, false));
            return;
        default:
            return;
    }    
  };

  const getTitleBar = () => {
    console.log({type});
      console.log({sonarMetricScorecardDto});
    return (
      <div className="d-flex justify-content-between w-100">
        <div><FontAwesomeIcon icon={faFileCode} fixedWidth className="mr-1"/>{sonarMetricScorecardDto.getData("projectName")}</div>        
      </div>
    );
  };

  if (sonarMetricScorecardDto == null) {
    return <></>;
  }

  const getIcon = (status) => {
    switch (status) {
        case "red":
          return (<DangerMetricIcon />);
        case "neutral":
          return null;
        case "green":
        return (<SuccessMetricIcon />);
        case "-":
          return (<NoTrendMetricIcon />);
        default:
          return status;
      }
  };

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2"}>
        <small>
          <Row className="d-flex align-items-center">
            {/* <Col sm={12} md={6} lg={4}>
                <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"sonarLatestMeasureValue"} className="insight-hl my-2" />
                <div className="d-flex align-items-center">
                  <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"sonarLatestMeasureValue"} className="insight-hl my-2" />
                  <span className="pl-2 my-2">{getIcon(sonarMetricScorecardDto.getData("status").toLowerCase())}</span>
                </div>              
            </Col> */}
            {/* <Col sm={12} md={6} lg={4}>
              <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"status"} className="insight-hl my-2" />
              <div className="d-flex align-items-center my-2">
                <label className="mb-0 mr-2 text-muted"><span>Trend:</span></label>
                <span>{getIcon(sonarMetricScorecardDto.getData("status").toLowerCase())}</span>
              </div>              
            </Col> */}
            <Col sm={12} md={5} lg={3}>
                {/* <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"sonarLatestMeasureValue"} className="insight-hl my-2" /> */}
                {/* <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <span className="insight-hll">{sonarMetricScorecardDto.getData("sonarLatestMeasureValue")}</span>
                    <span className="d-flex">Vulnerabilities<span className="pl-1">{getIcon(sonarMetricScorecardDto.getData("status").toLowerCase())}</span></span>
                </div> */}
                <InsightHighlightFieldWithTrendIcon 
                    dataObject={sonarMetricScorecardDto} 
                    fieldName="sonarLatestMeasureValue"
                    trendFieldName="status"
                />                
            </Col>
            <Col sm={12} md={7} lg={9}>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"sonarPrimaryLanguage"} className="mw-50 my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"run_count"} className="mw-50 my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"pipelineName"} className="mw-50 my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <DateTimeField dataObject={sonarMetricScorecardDto} fieldName={"timestamp"} className="mw-50 my-2" />
                    </Col>
                </Row>
            </Col>            
          </Row>          
        </small>
      </div>
    </InsightsCardContainerBase>
  );
}

SonarSummaryCard.propTypes = {
  sonarData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export default SonarSummaryCard;
