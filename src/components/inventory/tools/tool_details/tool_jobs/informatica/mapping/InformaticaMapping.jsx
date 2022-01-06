import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import informaticaTypeMappingMetadata from "./informatica-mappping-metadata";
import InformaticaMappingInput from "./inputs/InformaticaMappingInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";

function InformaticaMapping({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [toolMappingsDto, setToolMappingsDto] = useState(undefined);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    unpackMappings(toolActions);
  }, [toolActions]);

  const unpackMappings = (toolActions) => {
    setIsMapLoading(true);
    const newMapList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let map = toolAction?.configuration;
        map = {...map, mapId: toolAction?._id};
        map = {...map, index: index};
        newMapList?.push(map);
      });
    }
    const parsedModel = modelHelpers.parseObjectIntoModel(newMapList, informaticaTypeMappingMetadata);
    // console.log({...parsedModel});
    setToolMappingsDto({...parsedModel});
    setIsMapLoading(false);
  };

  const createJob = async () => {
    console.log("create mapping");
    console.log(toolMappingsDto.getPersistData());
  };

  return (
    <EditorPanelContainer
      recordDto={toolMappingsDto}
      createRecord={createJob}
      // updateRecord={updateJob}
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
