import React, {
    Platform,
    ActionSheetIOS,
    NativeModules
} from "react-native";

module.exports = {
    /**
     * Share some content with other apps.
     * @param subject which will be used as email subjects
     * @param message which you'd like to share
     * @param url of any external/internal link you'd like to share
     * @returns A Promise that will be resolved or rejected.
     *
     * Rejected promises will contain an _error object with a description of the error.
     * Resolved promises will contain an application object. This represents what application has been called.
     *
     * ON SOME PLATFORMS IT WILL NOT BE POSSIBLE TO FIND OUT WHAT APPLICATION IT HAS BEEN SHARED TO.
     * FOR THESE PLATFORMS THE APPLICATION WILL BE NULL
     */
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
                        url: url
                    },
                    (error) => {
                        reject({
                            _error: error
                        });
                    },
                    (success, activityType) => {
                        if (success && activityType) {
                            resolve({
                                application: activityType
                            });
                        }
                        reject({
                            _error: "User did not share"
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
                    application: null
                });
            } else {
                reject({
                    _error: "You are trying to use an unsupported platform"
                });
            }
        });
    }
}