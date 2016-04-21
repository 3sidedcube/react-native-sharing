import React, {
    Platform,
    ActionSheetIOS,
    NativeModules
} from "react-native";

module.exports = {

    share: function (subject, message, url) {

        return new Promise((resolve, reject) => {

            if (typeof subject === 'undefined') {
                reject({
                    _error: "You must provide a subject to share!"
                });
            }

            if (typeof message === 'undefined') {
                reject({
                    _error: "You must provide a message to share!"
                });
            }

            if (typeof url === 'undefined') {
                reject({
                    _error: "You must provide a url to share!"
                });
            }

            if (Platform.OS === "ios") {
                ActionSheetIOS.showShareActionSheetWithOptions
                (
                    {
                        subject: subject,
                        message: message,
                        url: url,
                    },
                    (error) => {
                        reject({
                            _error: error
                        });
                    },
                    (success) => {
                        resolve({
                            status: "Fulfilled"
                        });
                    }
                );
            } else if (Platform.OS === "android") {
                NativeModules.Sharer.share({
                    chooser_title: subject,
                    subject: subject,
                    message: message
                });

                resolve({
                    status: "Promised"
                });

            } else {
                reject({
                    _error: "You are trying to use an unsupported platform"
                });
            }

        });

    }

}