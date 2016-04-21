import React, {
    Platform,
    ActionSheetIOS,
    NativeModules
} from "react-native";

module.exports = {
    share: function (subject, message, url) {
        if (Platform.OS === "ios")
        {
            ActionSheetIOS.showShareActionSheetWithOptions
            (
                {
                    subject: subject,
                    message: message,
                    url: url,
                },
                (error) => console.log(error),
                (success, method) =>
                {
                    console.log("Success!");
                }
            );
        }
        else
        {
            NativeModules.Sharer.share({
                chooser_title: subject,
                subject: subject,
                message: message
            });
        }
    },
}