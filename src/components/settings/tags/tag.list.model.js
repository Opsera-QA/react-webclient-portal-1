import ListModelBase from "core/data_model/list.model.base";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";

// TODO: Should we handle RBAC for adding in here?
export class TagListModel extends ListModelBase{
  constructor(authContext, setStateFunction) {
    super(authContext, setStateFunction);
    this.topicName = LiveMessageConstants.LIVE_MESSAGE_TOPICS.TAGS;
  }
}