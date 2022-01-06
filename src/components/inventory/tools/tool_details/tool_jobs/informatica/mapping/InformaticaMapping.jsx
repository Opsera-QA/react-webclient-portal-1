import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import informaticaTypeMappingMetadata from "./informatica-mappping-metadata";
import InformaticaMappingInput from "./inputs/InformaticaMappingInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
function InformaticaMapping({ toolData, loadData, isLoading, toolActions }) {
  const { getAccessToken } = useContext(AuthContext); 
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [toolMappingsDto, setToolMappingsDto] = useState(undefined); 

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    unpackMappings().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const unpackMappings = async () => {
    setIsMapLoading(true);
    const newMapList = {};
    newMapList.mapping = toolActions;
    const parsedModel = modelHelpers.parseObjectIntoModel(newMapList, informaticaTypeMappingMetadata);
    setToolMappingsDto({...parsedModel});
    setIsMapLoading(false);
  };

  const createJob = async () => {
    let newMappings = toolMappingsDto.getData("mapping");
    const item = {actions: newMappings};
    return await toolsActions.saveToolActions(toolData, item, getAccessToken);
  };

  return (
    <EditorPanelContainer
      recordDto={toolMappingsDto}
      createRecord={createJob}
      updateRecord={createJob}
      addAnotherOption={false}
      showRequiredFieldsMessage={false}
      lenient={true}
      disable={toolMappingsDto?.checkCurrentValidity() !== true|| !toolMappingsDto?.getData("mapping").length > 0}
      setRecordDto={setToolMappingsDto}
    >
      <InformaticaMappingInput
        model={toolMappingsDto}
        setModel={setToolMappingsDto}
        visible={!isMapLoading}
      />
    </EditorPanelContainer>
  );
}

InformaticaMapping.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default InformaticaMapping;
