import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import DataBlockBoxContainer from "../../common/metrics/data_blocks/DataBlockBoxContainer";
import {AuthContext} from "../../../contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "../../common/status_notifications/loading";
import {parseError} from "../../common/helpers/error-helpers";
import GitCustodianTopSecretsChart from "./charts/bar_chart/git_custodian_top_secrets_chart/gitCustodianTopSecretsChart";
import GitCustodianTopRepositoriesChart from "./charts/pie_chart/git_custodian_top_repositories_chart/gitCustodianTopRepositoriesChart";
import GitCustodianTable from "./table/gitCustodianTable";
import GitCustodianTopAuthorsChart
  from "./charts/bar_chart/git_custodian_top_authors_chart/gitCustodianTopAuthorsChart";
import GitCustodianTopCleanRepositoriesChart
  from "./charts/pie_chart/git_custodian_top_clean_repositories_chart/gitCustodianTopCleanRepositoriesChart";
import GitCustodianTimelineChart from "./charts/line_chart/git_custodian_timeline_chart/gitCustodianTimelineChart";
import {faDownload, faShieldKeyhole} from "@fortawesome/pro-light-svg-icons";
import dashboardMetadata from "../dashboards/dashboard-metadata";
import FilterContainer from "../../common/table/FilterContainer";
import Button from "react-bootstrap/Button";
import IconBase from "../../common/icons/IconBase";
import TooltipWrapper from "../../common/tooltip/TooltipWrapper";
import NewDashboardModal from "../dashboards/NewDashboardModal";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import InlineGitCustodianAuthorsSelectInput
  from "../../common/filters/insights/gitCustodian/authors/InlineGitCustodianAuthorsSelectInput";
import InlineGitCustodianServiceSelectInput
  from "../../common/filters/insights/gitCustodian/gitService/InlineGitCustodianServiceSelectInput";
import InlineGitCustodianRepositoriesSelectInput
  from "../../common/filters/insights/gitCustodian/repositories/InlineGitCustodianRepositoriesSelectInput";
import InlineGitCustodianStatusSelectInput
  from "../../common/filters/insights/gitCustodian/status/InlineGitCustodianStatusSelectInput";
import GitCustodianNewJiraTicketModal from "./modal/GitCustodianNewJiraTicketModal";


function GitCustodianDetails({ gitCustodianData, gitCustodianFilterModel, setGitCustodianFilterModel }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [data, setData] = useState([]);
  const authors = [
    {
      "value": "1",
      "text": "support@opsera.io"
    },
    {
      "value": "1",
      "text": "Mahantha"
    },
    {
      "value": "1",
      "text": "Harsha Pullabhatlapogada"
    }
  ];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(gitCustodianData)]);

  const getInlineFilters = () => {
    return (
      <div className="d-flex">
        <InlineGitCustodianAuthorsSelectInput filterModel={gitCustodianFilterModel} options={authors} setFilterModel={setGitCustodianFilterModel} loadData={loadData} className={"mr-2"} />
        <InlineGitCustodianServiceSelectInput filterModel={gitCustodianFilterModel} setFilterModel={setGitCustodianFilterModel} loadData={loadData} className={"mr-2"} />
        <InlineGitCustodianRepositoriesSelectInput filterModel={gitCustodianFilterModel} setFilterModel={setGitCustodianFilterModel} loadData={loadData} className={"mr-2"} />
        <InlineGitCustodianStatusSelectInput filterModel={gitCustodianFilterModel} setFilterModel={setGitCustodianFilterModel} loadData={loadData} className={"mr-2"} />
      </div>
    );
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCharts = () => {
    return (
      <div style={{overflow: 'scroll'}} className={"p-2"}>
        <div style={{display: 'flex', width: '100%'}}>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TOP SECRETS</div>
              <GitCustodianTopSecretsChart dashboardData={gitCustodianData}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TIMELINE</div>
              <GitCustodianTimelineChart dashboardData={gitCustodianData}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TOP REPOSITORIES</div>
              <GitCustodianTopRepositoriesChart dashboardData={gitCustodianData}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TOP USERS</div>
              <GitCustodianTopAuthorsChart dashboardData={gitCustodianData}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TOP CLEAN REPOSITORIES</div>
              <GitCustodianTopCleanRepositoriesChart dashboardData={gitCustodianData}/>
            </DataBlockBoxContainer>
          </Col>
        </div>
      </div>
    );
  };

  const getTable = () => {
    return (
      <GitCustodianTable dashboardData={gitCustodianData} />
    );
  };

  const createNewJiraTicket = () => {
    toastContext.showOverlayPanel(
      <GitCustodianNewJiraTicketModal
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading the data: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        {getCharts()}
        {getTable()}
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={'Git Custodian Report'}
      addRecordFunction={createNewJiraTicket}
      type={'Jira Ticket'}
      body={getBody()}
      inlineFilters={getInlineFilters()}
      titleIcon={faShieldKeyhole}
      metadata={dashboardMetadata}
      supportSearch={false}
      filterDto={gitCustodianFilterModel}
      setFilterDto={setGitCustodianFilterModel}
      className={"px-2 pb-2"}
      exportButton={
        <TooltipWrapper innerText={"Export CSV"}>
          <div className={"mx-2"}>
            <Button
              variant={"outline-primary"}
              size={"sm"}
              disabled={isLoading}>
              <span><IconBase icon={faDownload}/></span>
            </Button>
          </div>
        </TooltipWrapper>
    }
    />
  );
}

GitCustodianDetails.propTypes = {
  gitCustodianData: PropTypes.object,
  setGitCustodianData: PropTypes.func,
  gitCustodianFilterModel: PropTypes.object,
  setGitCustodianFilterModel: PropTypes.func
};

export default GitCustodianDetails;
