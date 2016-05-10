# react-native-sharing

Cross-platform sharing functionality for React-Native.

This results in a **single interface for sharing** across the supported platforms:

* Android, with sharing functionality provided via a native module.
* iOS, with sharing functionality provided by [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html) (part of react-native).

## Why?

* There is **no official support** for **cross platform sharing**
* There is **no official support** for **Android sharing**
* iOS has official support in the form of [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html)
* Other GitHub librares make you conform to different interfaces for different platforms, or reinvent functionality already given to you by [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html)

## Ways to share

It provides two different ways to trigger sharing functionality:

1. Calling the `share` function directly

2. Wrapping the views you want to trigger sharing on touch with `<ShareLink>`. This will automatically trigger the sharing functionality when any of it's child views are touched. 

## Parameters

Both ways of using this library have the same parameters:

* **Subject (required)** - Shown above the sharing options and used in emails as the subject.

* **Message (required)** - The message that will be shared.

* **URL (optional)** - A link that will be added to the end of the message and used to help display more relevant sharing options.

## Usage

### Calling the share function directly

1. Import the `share` function:

	```
	import { share } from 'react-native-sharing';
	```

2. Then call the `share` function and pass in the parameters:

	```
	share(subject, message, url)
	```

### Wrapping views with ShareLink

1. Import the `ShareLink` view component:
	
	```
	import { ShareLink } from 'react-native-sharing';
	```

2. Wrap the views you want to trigger sharing in a `ShareLink` and add the parameters:

	```
	<ShareLink subject="Do you know 3SC?" message="Check out 3SC" url="https://3sidedcube.com/">
		<Text>Tell your friends about 3 Sided Cube</Text>
	</ShareLink>
	```

## Setup

### Android

1. Ensure your launch activity extends from `ReactActivity` like so:

	```
	public class MainActivity extends ReactActivity {
	```

2. Import `SharerPackage` in your launch activity.

	```
	import com.reactnativesharing.SharerPackage;
	```
	
3. Implement `getPackages()` in your launch activity so that `SharerPackage` is returned in your list of packages:

	```
	@Override
	protected List<ReactPackage> getPackages() {
	    return Arrays.<ReactPackage>asList(
	        new MainReactPackage(),
	        new SharerPackage()
	    );
	}
	```

4. Include `react-native-sharing` in your `android/settings.gradle` file:

	```
	include ':react-native-sharing'
	```
	
5. Reference the `react-native-sharing` project in your `android/settings.gradle` file:

	```
	project(':react-native-sharing').projectDir = new File(rootProject.projectDir, '../	node_modules/react-native-sharing/android/app')
	```
	
6. Tell gradle to compile `react-native-sharing` in `android/app/build.gradle`

	```
	compile project(":react-native-sharing")
	```

### iOS

1. No setup needed, it just works (because we're using [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html)).