import React, {
    Platform,
    ActionSheetIOS,
    NativeModules,
    TouchableHighlight,
    View
} from "react-native";

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
const share = function (subject, message, url) {
    return new Promise((resolve, reject) => {
        if (!subject) {
            return reject({
                _error: "You must provide a subject to share!"
            });
        }

        if (!message) {
            return reject({
                _error: "You must provide a message to share!"
            });
        }

        if (!url) {
            return reject({
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
                    return reject({
                        _error: error
                    });
                },
                (success, activityType) => {
                    if (success && activityType) {
                        return resolve({
                            application: activityType
                        });
                    } else {
                        return reject({
                            _error: "User did not share"
                        });
                    }
                }
            );
        } else if (Platform.OS === "android") {
            NativeModules.Sharer.share({
                chooser_title: subject,
                subject: subject,
                message: message
            });

            return resolve({
                application: null
            });
        } else {
            return reject({
                _error: "You are trying to use an unsupported platform"
            });
        }
    });
};

/**
 * Provides a ShareLink view component which will trigger sharing when any child elements are touched.
 * This means that you can use ShareLink just like Link, by wrapping it around views which you want to trigger sharing.
 *
 * @param subject which will be used as email subjects
 * @param message which you'd like to share
 * @param url of any external/internal link you'd like to share
 * @returns A view which triggers sharing when any child elements are touched.
 */
const ShareLink = React.createClass({
    propTypes: {
        subject: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
    },

    _share() {
        share(
            this.props.subject,
            this.props.message,
            this.props.url
        ).then(application => {
            console.log("Attempted sharing. Application (if available):", application);
        }).catch(error => {
                console.log("Error sharing:", error);
        });
    },

    render() {
        return (
            <TouchableHighlight style={{flex:1}} onPress={this._share}>
                <View style={{flex:1}}>
                    {this.props.children}
                </View>
            </TouchableHighlight>
        );
    }
});

module.exports.share = share;
module.exports.ShareLink = ShareLink;