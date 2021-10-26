import React, {useEffect, useState} from 'react';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from 'prop-types';

function EbsSolutionStackVersionInput({dataObject, setDataObject, stackList, disabled}) {
    
    const [stackVersionList, setStackVersionList] = useState([]);
    useEffect(() => {
        setStackVersionList(stackList[dataObject.getData("platform")]);
      }, [stackList, dataObject.getData("platform")]);

    return (
        <SelectInputBase
            setDataObject={setDataObject}
            dataObject={dataObject}
            filter={"contains"}
            selectOptions={stackVersionList}
            fieldName={"solutionStackName"}
            disabled={disabled}
        />     
    );
}

EbsSolutionStackVersionInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    stackList: PropTypes.object
};

export default EbsSolutionStackVersionInput;

