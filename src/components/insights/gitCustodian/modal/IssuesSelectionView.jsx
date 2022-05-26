import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { faShieldKeyhole} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";

const IssuesSelectionView = ({
                             dataObject,
                             setDataObject,
                             service,
                             gitToolId,
                             fieldName,
                             workspace,
                             textField,
                             valueField,
                             disabled
                           }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setErrorMessage] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [gitToolId, service, disabled, workspace]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error("Error getting API Data: ", error);

      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchFunction = (item, searchTerm) => {
    return item?.repository?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  };

  const getSelectedOptions = () => {
    let selectedArray = [];
    let selectedOptions = dataObject.getData("repositories");
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      selectedOptions.forEach((selectedOptionName) => {
        let componentType = repositories.find(
          (type) => type.repository === selectedOptionName,
        );

        if (componentType != null) {
          selectedArray.push(componentType);
        }
      });
    }

    return selectedArray;
  };

  const handleRemoveFromSelected = (fieldName, valueArray) => {
    let newModel = dataObject;
    dataObject.setData(fieldName, valueArray);
    setDataObject({ ...newModel });
    setRepositories([...repositories]);
    callbackFunction();
  };

  const callbackFunction = () => {
    let newModel = dataObject;
    let setDataArray = [];
    let reposToScan = dataObject?.getData("repositories");
    for (let item in reposToScan) {
      setDataArray.push(repositories.find(repo => repo?.repository === reposToScan[item]));
    }
    if (reposToScan?.length === setDataArray?.length) {
      newModel.setData("reposToScan", setDataArray);
      setDataObject({ ...newModel });
    }
    setRepositories([...repositories]);
  };

  if (dataObject == null) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Data"}
      />
    );
  }

  return (
    <Row>
      <Col lg={12}>
        <ListInputBase
          height={"40vh"}
          customTitle={"Available Issues"}
          fieldName={"tool"}
          selectOptions={repositories}
          dataObject={dataObject}
          setDataObject={setDataObject}
          showSelectAllButton={true}
          valueField={valueField}
          textField={textField}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faShieldKeyhole}
          disabled={disabled}
          noDataMessage={"No Issues Found"}
          callbackFunction={callbackFunction}
        />
      </Col>
    </Row>
  );
};

IssuesSelectionView.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  workspace: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  disabled: PropTypes.bool
};

IssuesSelectionView.defaultProps = {
  valueField: "repository",
  textField: "repository",
  disabled: false
};

export default IssuesSelectionView;
