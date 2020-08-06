import React, {useState} from "react";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
}

export const Model = ( data, metaData, newModel ) => {
  const [ state, setState ] = useState(DataState.LOADED);
  const [ changeMap, setChangeMap] = useState({});
  const [ model, setModel] = useState(data);

  function Model(data, metaData, newModel) {}

  const loadData = async () => {
    if (newModel) {
      setState(DataState.NEW);
    }

    if (metaData != null) {
      for (const field of metaData["fields"]) {
        let id = field.id;
        defineProperty(id);
      }
    }
  }

  const defineProperty = (id) => {
    Object.defineProperty(this, id, {
      get: () => {
        return data[id];
      },
      set: (newValue) => {
        if (data[id] !== newValue) {
          propertyChange(id, newValue, data[id]);
          data[id] = newValue;
        }
      }
    })
  }

  const propertyChange = (id, newValue, oldValue) => {
    if (!changeMap.has(id)) {
      console.log("Field added to change map: " + id);
      console.log("oldValue: " + oldValue);
      console.log("newValue: " + newValue);
      changeMap.set(id, newValue);

      if (state !== DataState.NEW) {
        setState(DataState.CHANGED);
      }
    }
    else if (changeMap.get(id) === newValue
         || (changeMap.get(id) === null && newValue === null)) {
      console.log("Fieldname removed from change map: " + id);
      changeMap.delete(id);

      if (changeMap.size === 0 && state === DataState.CHANGED) {
        setState(DataState.LOADED);
      }
    }
  };

  const isNew = () => {
    return newModel;
  };

  const isChanged = (field) => {
    if (field) {
      return changeMap.has(field);
    }

    return state !== DataState.LOADED;
  };

  const isDeleted = () => {
    return state === DataState.DELETED;
  };

  const getLabel = (field) => {
    return metaData[field].label;
  };

  const getMaxLength = (field) => {
    return metaData[field].maxLength;
  };

  const getMinLength = (field) => {
    return metaData[field].minLength;
  };

  const getId = (field) => {
    return metaData[field].id;
  };

  const getFields = () => {
    return metaData.fields;
  };

  const getFieldById = (id) => {
    return metaData.fields.find(field => {
      return field.id === id });
  };

  return (<></>);
}

export default Model;


