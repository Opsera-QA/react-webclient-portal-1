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


function ConnectedAssetsDetails({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [data, setData] = useState([]);

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dateRange = dashboardData?.data?.filters[
        dashboardData?.data?.filters.findIndex(
          (obj) => obj.type === "date"
        )
        ]?.value;
      let response = await connectedAssetsActions.getConnectedAssetsData(
        getAccessToken,
        cancelSource,
        "connectedAssets",
        dateRange?.startDate ? dateRange?.startDate : null,
        dateRange?.endDate? dateRange?.endDate : null
      );
      let responseData = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(responseData)) {
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
        <div className={"mx-2"}>
          <Row className={"mx-0 p-2 justify-content-between"}>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faDatabase}
                  className={"p-2"}
                  middleText={"Repository"}
                  bottomText={data?.[0]?.repositories}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faCodeBranch}
                  className={"p-2"}
                  middleText={"Branches"}
                  bottomText={data?.[0]?.branches}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faUsers}
                  className={"p-2"}
                  middleText={"Collaborators"}
                  bottomText={data?.[0]?.collaborators}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faDiagramSuccessor}
                  className={"p-2"}
                  middleText={"Pipelines"}
                  bottomText={data?.[0]?.pipelines}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faListCheck}
                  className={"p-2"}
                  middleText={"Tasks"}
                  bottomText={data?.[0]?.tasks}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faStopwatch}
                  className={"p-2"}
                  middleText={"Jobs"}
                  bottomText={data?.[0]?.jobs}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faCompressArrowsAlt}
                  className={"p-2"}
                  middleText={"Webhooks"}
                  bottomText={data?.[0]?.webhooks}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <ThreeLineIconDataBlockBase
                  icon={faBox}
                  className={"p-2"}
                  middleText={"Packages"}
                  bottomText={data?.[0]?.packages}
                ></ThreeLineIconDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return getBody();
}

ConnectedAssetsDetails.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsDetails;
