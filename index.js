import React, {
    ActionSheetIOS,
    Platform,
    NativeModules
} from "react-native";

module.exports = {
    share: function () {
        if (Platform.OS === "ios")
        {
            ActionSheetIOS.showShareActionSheetWithOptions
            (
                {
                    message: "Donate to my page by texting SMS code to 70070",
                    excludedActivityTypes: [
                        'com.apple.UIKit.activity.Message',
                        'com.apple.UIKit.activity.PostToTwitter',
                        'com.apple.UIKit.activity.Mail',
                        'com.apple.UIKit.activity.CopyToPasteboard',
                        'com.apple.UIKit.activity.AssignToContact',
                        'com.apple.UIKit.activity.Print',
                        'com.apple.UIKit.activity.SaveToCameraRoll',
                        'com.apple.UIKit.activity.PostToFacebook'
                    ]
                }
            );
        }
        else
        {
            NativeModules.Sharer.share({
                title: "Share Donation Page",
                text: "Please donate to my fundraiser via SMS",
                share_text: "Share Donation SMS number",
                share_URL: "Please donate to my fundraiser by texting SMS CODE to 70070"
            });
        }
    },
}