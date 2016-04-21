import React, {
    Platform,
    ActionSheetIOS,
    NativeModules
} from "react-native";

module.exports = {
    share: function (subject, message, url, successCallback, failureCallback) {
        if (typeof subject === 'undefined') {
            throw new Error('You must provide a subject to share!');
        }

        if (typeof message === 'undefined') {
            throw new Error('You must provide a message to share!');
        }

        if (typeof url === 'undefined') {
            throw new Error('You must provide a url to share!');
        }

        if (typeof successCallback !== 'function') {
            throw new Error('You must provide a success callback function to share!')
        }

        if (typeof failureCallback !== 'function') {
            throw new Error('You must provide a failure callback function to share!');
        }

        if (Platform.OS === "ios") {
            ActionSheetIOS.showShareActionSheetWithOptions
            (
                {
                    subject: subject,
                    message: message,
                    url: url,
                },
                (error) => failureCallback(),
                (success) => successCallback()
            );
        } else if (Platform.OS === "android") {
            NativeModules.Sharer.share({
                chooser_title: subject,
                subject: subject,
                message: message
            });
        } else {
            console.log("Trying to use react-native-sharing to share to an unsupported platform: ", Platform.OS);
        }
    },
}