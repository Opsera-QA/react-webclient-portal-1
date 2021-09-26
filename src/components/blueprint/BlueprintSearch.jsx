import React, {useState, useContext, useEffect, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import { Button, Row, Col } from "react-bootstrap";
import BlueprintSearchResult from "components/blueprint/BlueprintSearchResult";
import NumberPickerInputBase from "components/common/inputs/number/base/NumberPickerInputBase";
import Model from "core/data_model/model";
import blueprintMetadata from "components/blueprint/blueprint-metadata";
import BlueprintSearchPipelineSelectInput from "components/blueprint/BlueprintSearchPipelineSelectInput";
import axios from "axios";
import PropTypes from "prop-types";
import blueprintsActions from "components/blueprint/blueprints-actions";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";

function BlueprintSearch({sideBySide, id, run}) {
  const {getAccessToken} = useContext(AuthContext);
  const [logData, setLogData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [blueprintSearchModel, setBlueprintSearchModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [currentBlueprintTab, setCurrentBlueprintTab] = useState(0);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    let newModel = new Model({...blueprintMetadata.newObjectFields}, blueprintMetadata, false);

    if (id != null && run != null) {
      newModel.setData("title", id);
      newModel.setData("pipelineId", id);
      newModel.setData("runNumber", run);

      getSearchResults(false, newModel, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    setBlueprintSearchModel({...newModel});

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const cancelSearchClicked = () => {
    setLogData([]);
    setBlueprintSearchModel(new Model({...blueprintMetadata.newObjectFields}, blueprintMetadata, false));
  };

  const getSearchResults = async (newTab, blueprintModel = blueprintSearchModel, cancelSource = cancelTokenSource) => {
    try {
      const newLogTab = newTab === true && !sideBySide && logData.length < 4 ? logData.length : currentBlueprintTab;
      let newLogTabData = logData;
      setCurrentBlueprintTab(newLogTab);

      let newLog = {
        data: [],
        xmlData: false,
        anchore: false,
        anchoreStats: false,
        twistlock: false,
        twistlockStats: false,
        title: blueprintModel.getData("title"),
        runNumber: blueprintModel.getData("runNumber"),
        pipelineId: blueprintModel.getData("pipelineId"),
      };

      newLogTabData[newLogTab] = newLog;
      setIsSearching(true);

      const response = await blueprintsActions.getBlueprintSearchResults(getAccessToken, cancelSource, blueprintModel);

      if (isMounted?.current === true && response?.data) {
        newLog.data = response?.data?.data ? response?.data?.data : [];
        newLog.xmlData = response?.data?.reports?.xml?.status === 200 ? response.data.reports.xml : false;
        newLog.anchore = response?.data?.reports?.anchore_report ? response.data.reports.anchore_report : false;
        newLog.anchoreStats = response?.data?.reports?.anchore_stats ? response.data.reports.anchore_stats : false;
        newLog.twistlock = response?.data?.reports?.twistlock_report ? response.data.reports.twistlock_report : false;
        newLog.twistlockStats = response?.data?.reports?.twistlock_stats ? response.data.reports.twistlock_stats : false;
        newLogTabData[newLogTab] = newLog;
        setLogData([...newLogTabData]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSearching(false);
      }
    }
  };

  const getNewTabButton = () => {
    if (!sideBySide) {
      return (
        <Button
          variant="primary"
          className="mx-2"
          type="submit"
          onClick={() => {getSearchResults(true);}}
          disabled={logData.length === 0 || logData.length === 4}
        >
          Open In New Tab
        </Button>
      );
    }
  };

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setCurrentBlueprintTab(activeTab);
  };

  const closeTab = (tabName) => {
    let newArray = logData;
    newArray.splice(tabName, 1);
    setCurrentBlueprintTab(tabName - 1);
    setLogData([...newArray]);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={currentBlueprintTab} tabText={"Results"} handleTabClick={handleTabClick} tabName={0} />
        <CustomTab activeTab={currentBlueprintTab} tabText={"Results #2"} handleTabClick={handleTabClick} tabName={1} visible={logData.length >= 2} closeTab={closeTab}/>
        <CustomTab activeTab={currentBlueprintTab} tabText={"Results #3"} handleTabClick={handleTabClick} tabName={2} visible={logData.length >= 3} closeTab={closeTab}/>
        <CustomTab activeTab={currentBlueprintTab} tabText={"Results #4"} handleTabClick={handleTabClick} tabName={3} visible={logData.length >= 4} closeTab={closeTab} />
      </CustomTabContainer>
    );
  };

  // TODO: Make its own component
  const getResults = () => {
    if (isSearching === true) {
      return (<LoadingDialog size="sm"/>);
    }

    if (logData.length > 0) {
      return (
        <BlueprintSearchResult logData={logData[currentBlueprintTab]} />
      );
    }
  };

  if (blueprintSearchModel == null) {
    return null;
  }

  // TODO: Cleanup further
  return (
    <div>
      <Row>
        <Col md={6}>
          <BlueprintSearchPipelineSelectInput
            setDataObject={setBlueprintSearchModel}
            dataObject={blueprintSearchModel}
            showLabel={false}
          />
        </Col>
        <Col md={6}>
          <NumberPickerInputBase
            dataObject={blueprintSearchModel}
            setDataObject={setBlueprintSearchModel}
            placeholderText="Run Number"
            fieldName={"runNumber"}
            showLabel={false}
          />
        </Col>
      </Row>
      <Row className={"w-100 mt-1"}>
        <div className={"ml-auto"}>
          <Button
            variant="primary"
            className="ml-auto mr-2"
            disabled={!blueprintSearchModel?.checkCurrentValidity()}
            onClick={() => getSearchResults()}
          >
            Lookup
          </Button>
          {getNewTabButton()}
          <Button variant="outline-secondary" className={"ml-2"} onClick={cancelSearchClicked}>
            Clear
          </Button>
        </div>
      </Row>
      <TabPanelContainer currentView={getResults()} tabContainer={getTabContainer()} />
    </div>
  );
}

BlueprintSearch.propTypes = {
  sideBySide: PropTypes.bool,
  id: PropTypes.string,
  run: PropTypes.string
};

export default BlueprintSearch;
