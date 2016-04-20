import { NativeModules } from 'react-native';
module.exports = NativeModules.Sharer;

console.log(NativeModules.Sharer);

// var Sharer = require('react-native').NativeModules.Sharer;
// module.exports = {
//     share: function () {
//         return Sharer.share();
//     },
// }