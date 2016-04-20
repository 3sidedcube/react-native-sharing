var Sharer = require('react-native').NativeModules.Sharer;

module.exports = {
    share: function () {
        return Sharer.share();
    },
}