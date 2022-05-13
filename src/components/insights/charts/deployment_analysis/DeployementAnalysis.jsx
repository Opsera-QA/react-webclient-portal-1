import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

import {
  getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import deploymentAnalysisMetadata from "./development-analysis-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ModalLogs from "components/common/modal/modalLogs";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

function DeploymentAnalysis({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = deploymentAnalysisMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [metadataName, setMetadataName] = useState([]);
  const [metadataInfo,setMetadataInfo] = useState([]);

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getLimitedTableTextColumn(getField(fields,"destination"),30),
      getTableTextColumn(getField(fields,"namespace")),
      getTableTextColumn(getField(fields,"pipelineId")),
      getTableTextColumn(getField(fields,"runCount")),
      getTableTextColumn(getField(fields,"status")),
      getTableTextColumn(getField(fields,"metadataName")),
      getLimitedTableTextColumn(getField(fields,"artifactoryName"), 20),
      getTableTextColumn(getField(fields,"pipelineName")),
      getTableTextColumn(getField(fields,"version")),
    ],
    []
  );

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
  }, [JSON.stringify(dashboardData)]);

  // const loadMetadataInfo = async(cancelSource = cancelTokenSource, filterDto = tableFilterDto) =>{
    
  //   const response = await chartsActions.getMetadataInfo(
  //           kpiConfiguration,
  //           getAccessToken,
  //           cancelSource,
  //         );
  //   setMetadataInfo(response);
  // };


// const loadData =  async(cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
//   try {
//     setIsLoading(true);
//     await loadMetadataInfo(cancelSource, filterDto);
//   } catch (error) {
//     if (isMounted?.current === true) {
//         console.error(error);
//         setError(error);
//       }
//   } finally {
//       if (isMounted?.current === true) {
//         setIsLoading(false);
//       }
//   }
  
// // };
// const getTable = (test) => {
//   return "ABC";
// };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.getDeploymentAnalysis(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        "test" // this is going to be the metadataname
        // dashboardTags,
        // dashboardOrgs,
      );
      let dataObject = response?.data[0]?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data[0]?.count[0].count);
        setTableFilterDto({ ...newFilterDto });
      }
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
  const onRowSelect = (rowData) => {
    setModalData(rowData.original);
    setShowModal(true);
  };

  const getChartTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };
  // const getVerticalTabContainer = () => {

  //   if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
  //       return null;
  //     }
  //     const tabs = [];
  //     if (Array.isArray(actionInsightsTraceabilityTable) && actionInsightsTraceabilityTable.length > 0) {
  //       for(let i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
  //         tabs.push(
  //           <VanitySetVerticalTab
  //             tabText={actionInsightsTraceabilityTable[i]?.applicationName}
  //             tabName={actionInsightsTraceabilityTable[i]?.applicationName}
  //           />
  //         );
  //       }
  //     }
  //     return (
  //       <div className={"h-100"}>
  //         <div style={{backgroundColor:"#F3F3F1",border:"1px solid #e4e4e4"}} className={"py-2 w-100 px-2"}>
  //           <div>Application Name</div>
  //         </div>
  //         <VanitySetVerticalTabContainer className={"h-100"}>
  //           {tabs}
  //         </VanitySetVerticalTabContainer>
  //       </div>
  //     );

  //   // return(<VanitySetTabAndViewContainer
  //   //   className={"mb-3"}
  //   //   title={`List of Successful Workflow Steps by Application`}
  //   //   defaultActiveKey={metadataInfo[0]?.metadataName}
  //   //   verticalTabContainer={getVerticalTabContainer()}
  //   //   currentView={getTable()}
  //   // />
  //   // );
  // };

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartTable()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
      />
      <ModalLogs
        header="Deployemnt Analysis"
        size="lg"
        jsonMessage={modalData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

DeploymentAnalysis.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default DeploymentAnalysis;
