import {LIVE_MESSAGE_TOPICS, LIVE_MESSAGE_TYPES} from "core/websocket/constants/liveMessage.constants";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

// TODO: Should we handle RBAC for adding in here?
export class ListModelBase {
  constructor(authContext, setStateFunction) {
    // this.metadata = _.cloneDeep({...metadata});
    this.dataArray = [];
    this.authContext = authContext;
    this.isLoading = false;
    this.addAllowed = false;
    this.setStateFunction = setStateFunction;
    this.roleDefinitions = {};
    this.topicName = LIVE_MESSAGE_TOPICS.TAGS;
  }

  getRoleDefinitions = () => {
    return this.roleDefinitions;
  };

  setMetadata = (metadata) => {
    this.metadata = metadata;
  };

  getLabel = (fieldName) => {
    let fields = this.metadata.fields;
    let field = fields.find(field => { return field.id === fieldName;});
    return field ? field.label : "No label found in metadata";
  };

  getMetadata = () => {
    return this.metadata;
  };

  getId = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.id;
  };

  getFields = () => {
    return this.metadata?.fields;
  };

  getType = () => {
    return this.metadata?.type;
  }

  getActiveField = () => {
    return this.metadata?.activeField;
  }

  getIsLoading = () => {
    return this.isLoading === true;
  };

  setIsLoading = (isLoading = true) => {
    this.isLoading = isLoading;
  };

  getFieldById = (id) => {
    const fields = this.getFields();
    return fields?.find(field => {return field.id === id; });
  };

  canAddNewRecord = () => {
    return this.addAllowed === true;
  };

  canPerformAction = () => {
    return false;
  };

  getDataArray = () => {
    return this.dataArray;
  };
  
  setDataArray = (newList) => {
    this.dataArray = [...newList];
    this.updateExternalState();
  };

  setSetStateFunction = (setStateFunction) => {
    this.setStateFunction = setStateFunction;
  };

  handleLiveMessage = (liveMessage) => {
    // TODO: Add Data Parsing Helper, ensure the format is correct
    const type = liveMessage.type;

    switch (type) {
      case LIVE_MESSAGE_TYPES.NEW_RECORD:
        this.handleNewRecordLiveMessage(liveMessage);
        break;
      case LIVE_MESSAGE_TYPES.UPDATED_RECORD:
        this.handleUpdateRecordLiveMessage(liveMessage);
        break;
      case LIVE_MESSAGE_TYPES.DELETED_RECORD:
        this.handleDeleteRecordLiveMessage(liveMessage);
        break;
      default:
        console.error("Live message sent invalid for this topic: " + type);
    }
  };

  handleNewRecordLiveMessage = (liveMessage) => {
    const newData = [...this.dataArray];
    const newRecord = liveMessage.message.data;

    // TODO: Check if record meets expectations
    newData.push(newRecord);

    this.setDataArray(newData);
  };

  handleUpdateRecordLiveMessage = (liveMessage) => {
    const newData = [...this.dataArray];
    const updatedRecord = liveMessage.message.data;
    // TODO: Check if record meets expectations

    const recordId = updatedRecord._id;
    const index = newData.findIndex((item) => item._id === recordId);

    if (index !== -1) {
      newData[index] = updatedRecord;
    }
    else {
      newData.push(updatedRecord);
    }

    this.setDataArray(newData);
  };

  handleDeleteRecordLiveMessage = (liveMessage) => {
    const newData = [...this.dataArray];
    const deletedRecordId = liveMessage.message.data;

    console.log("newDataLength: " + JSON.stringify(newData.length));
    if (isMongoDbId(deletedRecordId) === true) {
      const index = newData.findIndex((item) => item._id === deletedRecordId);

      if (index !== -1) {
        newData.splice(index, 1);
      }
    }

    console.log("newDataLength: " + JSON.stringify(newData.length));
    this.setDataArray(newData);
  };

  subscribe = () => {
    this.authContext.subscribeToTopic(this.topicName, this);
  };

  unsubscribe = () => {
    this.authContext.unsubscribeFromTopic(this.topicName);
  };

  updateExternalState = () => {
    if (this.setStateFunction) {
      this.setStateFunction({...this});
    }
  };
}

export default ListModelBase;


