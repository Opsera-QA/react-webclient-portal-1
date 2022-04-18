import React, {useEffect, useState, useRef, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import FailedExecutionsActionableInsightsMetaData from "./FailedExecutionsActionableInsightsMetaData";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import Model from "../../../../../../../core/data_model/model";
import LoadingIcon from "../../../../../../common/icons/LoadingIcon";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import CustomTable from "../../../../../../common/table/CustomTable";
import {getTableTextColumn, getTableDateTimeColumn} from "../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";
import TwoLineDataBlockBase from "../../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import FullScreenCenterOverlayContainer
  from "../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import chartsActions from "../../../../charts-actions";

function FailedExecutionsDetailedActionableInsights({ repositoryName, actionName, headCommitSha, kpiConfiguration, dashboardData}) {
  const toastContext = useContext(DialogToastContext);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...FailedExecutionsActionableInsightsMetaData.newObjectFields }, FailedExecutionsActionableInsightsMetaData, false));
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [repositoryName, actionName]);

  const noDataMessage = "Failed Executions Detailed report is currently unavailable at this time";

  const fields = FailedExecutionsActionableInsightsMetaData.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "authorName")),
      getTableTextColumn(getField(fields, "branch")),
      getTableTextColumn(getField(fields, "checkoutSha")),
      getTableTextColumn(getField(fields, "commitTitle")),
      getTableDateTimeColumn(getField(fields, "commitTimeStamp"))
    ],
    []
  );

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "actionTriggeredByCommit",
        kpiConfiguration,
        dashboardTags,
        filterDto[0],
        null,
        dashboardOrgs,
        null,
        null,
        null,
        null,
        null,
        null,
        headCommitSha
      );
      const data = response?.data?.data[0]?.actionTriggeredByCommit?.data?.[0]?.docs;
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", data ? data.length : 0);
      setTableFilterDto(newFilterDto);
      setResponseData(data);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };


  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    return (
      <>
        {getFailedDetailedBlocks()}
        {getTable()}
      </>
    );
  };
  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={responseData}
        noDataMessage={noDataMessage}
        loadData={loadData}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
      />
    );
  };

  const getFailedDetailedBlocks = () => {
    return (
      <Row className="pb-3 px-2">
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineDataBlockBase
              className="p-2"
              title={repositoryName}
              subtitle={"Repository Name"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineDataBlockBase
              className="p-2"
              title={actionName}
              subtitle={"Action Name"}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Failure Executions Detail`}
      showToasts={true}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

FailedExecutionsDetailedActionableInsights.propTypes = {
  repositoryName: PropTypes.string,
  actionName: PropTypes.string,
  headCommitSha: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default FailedExecutionsDetailedActionableInsights;