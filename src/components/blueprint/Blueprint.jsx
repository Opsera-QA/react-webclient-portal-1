import React, {useState, useContext, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import BlueprintSearchResult from "components/blueprint/BlueprintSearchResult";
import simpleNumberLocalizer from "react-widgets-simple-number";
import { useHistory } from "react-router-dom";
import NumberInputBase from "components/common/inputs/text/NumberInputBase";
import Model from "core/data_model/model";
import blueprintMetadata from "components/blueprint/blueprint-metadata";
import BlueprintSearchPipelineSelectInput from "components/blueprint/BlueprintSearchPipelineSelectInput";
import axios from "axios";
import blueprintsActions from "components/blueprint/blueprints-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function Blueprint() {
  const {id, run} = useParams();
  const {getAccessToken} = useContext(AuthContext);
  const [logData, setLogData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [blueprintSearchModel, setBlueprintSearchModel] = useState(undefined);
  const history = useHistory();
  const [xmlData, setXMLData] = useState(false);
  const [anchoreResponse, setAnchoreResponse] = useState(false);
  const [anchoreStats, setAnchoreStats] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  simpleNumberLocalizer();

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    let newModel = new Model({...blueprintMetadata.newObjectFields}, blueprintMetadata, false);

    if (id != null && run != null) {
      newModel.setData("pipelineId", id);
      newModel.setData("runNumber", run);
      // TODO: Find way to pull name
      // getSearchResults(newModel);
    }

    setBlueprintSearchModel({...newModel});

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const cancelSearchClicked = () => {
    setXMLData(false);
    setLogData([]);
    setAnchoreResponse(false);
    setAnchoreStats(false);
    setBlueprintSearchModel(new Model({...blueprintMetadata.newObjectFields}, blueprintMetadata, false));
  };

  const getSearchResults = async (blueprintModel = blueprintSearchModel) => {

    try {
      setIsSearching(true);
      setLogData([]);
      setXMLData(false);
      setAnchoreResponse(false);
      setAnchoreStats(false);

      const response = await blueprintsActions.getBlueprintSearchResults(getAccessToken, cancelTokenSource, blueprintModel);

      let searchResults = [];
      let xmlFile = false;
      let anchoreResponse = false;
      let anchoreStats = false;

      if (isMounted?.current === true && response?.data) {
        searchResults = response?.data?.data ? response?.data?.data : [];
        xmlFile = response?.data?.reports?.xml?.status === 200 ? response.data.reports.xml : false;
        anchoreResponse = response?.data?.reports?.anchore_report ? response.data.reports.anchore_report : false;
        anchoreStats = response?.data?.reports?.anchore_stats ? response.data.reports.anchore_stats : false;


        if (searchResults) {
          setLogData(searchResults);
        }

        if (xmlFile) {
          setXMLData(xmlFile);
        }

        if (anchoreResponse) {
          setAnchoreResponse(anchoreResponse);
        }

        if (anchoreStats) {
          setAnchoreStats(anchoreStats);
        }
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

  const goToPipeline = () => {
    history.push(`/workflow/details/${blueprintSearchModel?.getData("pipelineId")}/summary`);
  };

  // TODO: Make its own component
  const getResults = () => {
    if (logData?.length > 0) {
      return (
        <>
          <div className="mt-3 bordered-content-block p-3 max-content-width">
            <Row>
              <Col>
                <strong>
                  <div className="blueprint-title">
                    {blueprintSearchModel.getData("title")}
                  </div>
                </strong>
              </Col>
              <Button
                variant="outline-dark mr-3"
                size="sm"
                onClick={() => {
                  goToPipeline();
                }}
              >
                <FontAwesomeIcon icon={faDraftingCompass} fixedWidth/>
                View Pipeline
              </Button>
            </Row>
            <hr/>
            <Row className="mt-1">
              <Col lg className="py-1">
                <span className="text-muted mr-1">ID:</span>
                {blueprintSearchModel?.getData("pipelineId")}
              </Col>
              <Col lg className="py-1">
                <span className="text-muted mr-1">Pipeline Run Count:</span>
                {blueprintSearchModel.getData("runNumber")}
              </Col>
              <Col lg className="py-1">
                <span className="text-muted mr-1">Number of Steps:</span> {logData ? logData.length : "N/A"}
              </Col>
            </Row>
          </div>
          <BlueprintSearchResult
            searchResults={{
              data: logData,
              xmlData: xmlData,
              anchore: anchoreResponse,
              stats: anchoreStats
            }}
            blueprintName={blueprintSearchModel.getData("title")}
            numberOfSteps={logData ? logData?.length : "N/A"}/>
        </>
      );
    }
  };

  // TODO: Cleanup further
  return (
    <ScreenContainer
      breadcrumbDestination={"blueprint"}
      isLoading={blueprintSearchModel == null}
      pageDescription={`
          The Pipeline Blueprint offers an end to end picture of the pipeline run combining logs from all stages under a single pane of glass for clear visibility and effortless debugging.
      `}
    >
      <div className={"mx-3"}>
        <Row>
          <Col md={5}>
            <BlueprintSearchPipelineSelectInput
              setDataObject={setBlueprintSearchModel}
              dataObject={blueprintSearchModel}
              showLabel={false}
            />
          </Col>
          <Col md={4}>
            <NumberInputBase
              dataObject={blueprintSearchModel}
              setDataObject={setBlueprintSearchModel}
              placeholderText="Run Number"
              fieldName={"runNumber"}
              showLabel={false}
            />
          </Col>
          <Col md={3} className={"mt-1"}>
            <Button variant="primary" className="mx-2 mt-1" type="submit"
                    disabled={!blueprintSearchModel?.checkCurrentValidity()}
            onClick={() => getSearchResults()}
            >
              Lookup
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              className={"mt-1"}
              onClick={cancelSearchClicked}
            >
              Clear
            </Button>
          </Col>
        </Row>

        {isSearching === true && <LoadingDialog size="sm"/>}
        {getResults()}
      </div>
    </ScreenContainer>
  );
}

export default Blueprint;
