import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Implement when refactoring pipeline overview page
function PipelineEditorPanel({ pipelineData, setPipelineData, handleClose }) {
  const [pipelineDataDto, setPipelineDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setPipelineDataDto(pipelineData);
    setIsLoading(false);
  };

  // const createPipeline = async () => {
  // };
  //
  // const updatePipeline = async () => {
  // };

  // const deletePipeline = async () => {
  //   setShowDeleteModal(false);
  //   try {
  //     setLoading(true);
  //     const accessToken = await getAccessToken();
  //     let apiUrl = "/registry/" + toolId;
  //     await axiosApiService(accessToken).delete(apiUrl, {});
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //     setErrors(err.message);
  //   }
  // };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Data"} />);
  }

  return (
    <div className="scroll-y hide-x-overflow full-height p-2">
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          {/*<DtoItemInput setDataObject={setPipelineDataDto} dataObject={pipelineDataDto} fieldName={"tags"} />*/}
        </Col>
      </Row>
      <Row>
        {/*<div className="ml-auto px-3">*/}
        {/*  {pipelineDataDto.isNew() ?*/}
        {/*    <Button size="sm" variant="primary" disabled={false} onClick={() => createPipeline()}>Create Tool</Button>*/}
        {/*    : <Button size="sm" variant="primary" disabled={pipelineDataDto.dataState === DataState.LOADED}*/}
        {/*              onClick={() => updatePipeline()}>Save changes</Button>}*/}
        {/*</div>*/}
      </Row>
    </div>
  );
}

PipelineEditorPanel.propTypes = {
  pipelineData: PropTypes.object,
  setPipelineData: PropTypes.func,
  handleClose: PropTypes.func
};

export default PipelineEditorPanel;


