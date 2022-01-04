import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";

function InformaticaMapping({ toolData, loadData, isLoading, toolActions }) {
  const toastContext = useContext(DialogToastContext);
  const [toolMappings, setToolMappings] = useState([]);

  useEffect(() => {
    unpackMappings(toolActions);
  }, [toolActions]);

  const unpackMappings = (toolActions) => {
    const newMapList = [];

    if (Array.isArray(toolActions)) {
      toolActions.forEach((toolAction, index) => {
        let map = toolAction?.configuration;
        map = {...map, mapId: toolAction?._id};
        map = {...map, index: index};
        newMapList?.push(map);
      });
    }
    console.log(newMapList);
    setToolMappings(newMapList);
  };


  return (
    <>sdsdf</>
  );
}

InformaticaMapping.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolActions: PropTypes.array
};
export default InformaticaMapping;
