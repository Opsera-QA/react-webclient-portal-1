import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThreeLineIconDataBlockBase from "../../common/metrics/icon/ThreeLineIconDataBlockBase";
import DataBlockBoxContainer from "../../common/metrics/data_blocks/DataBlockBoxContainer";
import { faDatabase, faCodeBranch, faBox, faStopwatch, faUsers, faListCheck, faCompressArrowsAlt, faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../../contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "../../common/status_notifications/loading";
import connectedAssetsActions from "./connectedAssets.actions";
import {parseError} from "../../common/helpers/error-helpers";
import ConnectedAssetsRepositoryTabContainer from "./tables/repositoryTable/ConnectedAssetsRepositoryTabContainer";
import ConnectedAssetsBranchesTabContainer from "./tables/branchesTable/ConnectedAssetsBranchesTabContainer";
import ConnectedAssetsPipelinesTabContainer from "./tables/pipelinesTable/ConnectedAssetsPipelinesTabContainer";

function ConnectedAssetsDetails({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [data, setData] = useState([]);
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [dynamicPanel, setDynamicPanel] = useState(undefined);
  const repositoriesDataBlock = "repositories_data_block";
  const branchesDataBlock = "branches_data_block";
  const collaboratorsDataBlock = "collaborators_data_block";
  const pipelinesDataBlock = "pipelines_data_block";
  const tasksDataBlock = "tasks_data_block";
  const jobsDataBlock = "jobs_data_block";
  const webhooksDataBlock = "webhooks_data_block";
  const packagesDataBlock = "packages_data_block";

  useEffect(() => {
    resetData();
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dateRange = dashboardData?.getData("date");
      let response = await connectedAssetsActions.getConnectedAssetsData(
        getAccessToken,
        cancelSource,
        "connectedAssets",
        dateRange?.startDate ? dateRange?.startDate : null,
        dateRange?.endDate? dateRange?.endDate : null
      );
      let responseData = response?.data?.data[0]?.connectedAssets?.data;
      if (isMounted?.current === true && responseData) {
        setData(responseData);
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

  const resetData = () => {
    setSelectedDataBlock("");
    setDynamicPanel(undefined);
  };

  const onDataBlockSelect = (selectedDataBlock) => {
    switch(selectedDataBlock) {
      case repositoriesDataBlock:
        toggleDynamicPanel(repositoriesDataBlock, () => {
          return (<ConnectedAssetsRepositoryTabContainer dashboardData={dashboardData}/>);
        });
        break;
      case branchesDataBlock:
        toggleDynamicPanel(branchesDataBlock, () => {
          return (<ConnectedAssetsBranchesTabContainer dashboardData={dashboardData}/>);
        });
        break;
      case collaboratorsDataBlock:
        toggleDynamicPanel(collaboratorsDataBlock, () => {
          return null;
        });
        break;
      case pipelinesDataBlock:
        toggleDynamicPanel(pipelinesDataBlock, () => {
          return (<ConnectedAssetsPipelinesTabContainer dashboardData={dashboardData}/>);
        });
        break;
      case tasksDataBlock:
        toggleDynamicPanel(tasksDataBlock,() => {
          return null;
        });
        break;
      case jobsDataBlock:
        toggleDynamicPanel(jobsDataBlock, () => {
          return null;
        });
        break;
      case webhooksDataBlock:
        toggleDynamicPanel(webhooksDataBlock, () => {
          return null;
        });
        break;
      case packagesDataBlock:
        toggleDynamicPanel(packagesDataBlock, () => {
          return null;
        });
        break;
    }
  };

  const toggleDynamicPanel = (name, dynamicPanel) => {
    if (selectedDataBlock === name) {
      resetData();
    } else {
      setSelectedDataBlock(name);
      setDynamicPanel(dynamicPanel);
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    if(!data || data.length === 0) {
      return <div className={"p-2"}>No data found.</div>;
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
        <div className={"mx-2"}>
          <Row className={"mx-0 p-2 justify-content-between"}>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === repositoriesDataBlock ? "selected-data-block" : undefined}
                onClickFunction={() => onDataBlockSelect(repositoriesDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faDatabase}
                  className={"p-2"}
                  middleText={"Repository"}
                  bottomText={data?.repositories}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === branchesDataBlock ? "selected-data-block" : undefined}
                onClickFunction={() => onDataBlockSelect(branchesDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faCodeBranch}
                  className={"p-2"}
                  middleText={"Branches"}
                  bottomText={data?.branches}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === collaboratorsDataBlock ? "selected-data-block" : undefined}
                onClickFunction={() => onDataBlockSelect(collaboratorsDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faUsers}
                  className={"p-2"}
                  middleText={"Collaborators"}
                  bottomText={data?.collaborators}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === pipelinesDataBlock ? "selected-data-block" : undefined}
                onClickFunction={() => onDataBlockSelect(pipelinesDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faDiagramSuccessor}
                  className={"p-2"}
                  middleText={"Pipelines"}
                  bottomText={data?.pipelines}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === tasksDataBlock ? "selected-data-block" : undefined}
                onClickFunction={() => onDataBlockSelect(tasksDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faListCheck}
                  className={"p-2"}
                  middleText={"Tasks"}
                  bottomText={data?.tasks}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === jobsDataBlock ? "selected-data-block" : undefined}
                //onClickFunction={() => onDataBlockSelect(jobsDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faStopwatch}
                  className={"p-2"}
                  middleText={"Jobs"}
                  bottomText={data?.jobs}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === webhooksDataBlock ? "selected-data-block" : undefined}
                //onClickFunction={() => onDataBlockSelect(webhooksDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faCompressArrowsAlt}
                  className={"p-2"}
                  middleText={"Webhooks"}
                  bottomText={data?.webhooks}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer
                showBorder={true}
                className={selectedDataBlock === packagesDataBlock ? "selected-data-block" : undefined}
                //onClickFunction={() => onDataBlockSelect(packagesDataBlock)}
              >
                <ThreeLineIconDataBlockBase
                  icon={faBox}
                  className={"p-2"}
                  middleText={"Packages"}
                  bottomText={data?.packages}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
        {dynamicPanel}
      </div>
    );
  };

  return getBody();
}

ConnectedAssetsDetails.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsDetails;
