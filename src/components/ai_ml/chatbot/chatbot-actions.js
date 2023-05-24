import baseActions from "utils/actionsBase";

const chatbotActions = {};

chatbotActions.checkConnection = async (getAccessToken, cancelTokenSource) => {
    const apiUrl = "/ai/chatbot/connection";
    // return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
    return {
        status: 200,
        data: {
            connectionStatus: true
        }
    }
};


chatbotActions.sendMessage = async (getAccessToken, cancelTokenSource, messageData) => {
    const apiUrl = "/ai/chatbot/message";
    let postBody = {
        message: messageData
    };

    return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default chatbotActions;