import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import informaticaTypeMappingMetadata from "./informatica-mappping-metadata";
import InformaticaMappingInput from "./inputs/InformaticaMappingInput";
import Model from "core/data_model/model";

function InformaticaMapping({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [toolMappingsDto, setToolMappingsDto] = useState(undefined);
  const [isaLoading, setIsaLoading] = useState(true);

  useEffect(() => {
    unpackMappings(toolActions);
  }, [toolActions]);

  const unpackMappings = (toolActions) => {
    setIsaLoading(true);
    const newMapList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let map = toolAction?.configuration;
        map = {...map, mapId: toolAction?._id};
        map = {...map, index: index};
        newMapList?.push(map);
      });
    }
    
    console.log(new Model(newMapList, informaticaTypeMappingMetadata, false));
    setToolMappingsDto(new Model(newMapList, informaticaTypeMappingMetadata, true));
    setIsaLoading(false);
  };


  return (
    <InformaticaMappingInput
      model={toolMappingsDto}
      setModel={setToolMappingsDto}
      visible={!isaLoading}
    />
  );
}

InformaticaMapping.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default InformaticaMapping;
