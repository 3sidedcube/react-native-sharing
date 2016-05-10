# react-native-sharing

Cross-platform sharing functionality for React-Native.

## Ways to share

It provides two different ways to trigger the sharing functionality:

1. Calling the `share` function directly

2. Wrapping the views you want to trigger sharing on touch with `<ShareLink>`. This will automatically trigger the sharing functionality when any of it's child views are touched. 

## Parameters

Both ways of using this library have the same parameters:

* **Subject (required)** - Shown above the sharing options and use in emails as the subject.

* **Message (required)** - The message that will be shared.

* **URL (optional)** - A link that will be added to the end of the message and used to help display more relevant sharing options.

## Usage

### Calling the share function directly

1. Import the share function:

	```
	import { share } from 'react-native-sharing';
	```

2. Then call the share function and pass in the parameters:

	```
	share(subject, message, url)
	```

### Wrapping views with ShareLink

ShareLink will automatically


1. Import the ShareLink view component:
	
	```
	import { ShareLink } from 'react-native-sharing';
	```

2. Wrap the views you want to trigger sharing in a ShareLink and add the parameters:

	```
	<ShareLink subject="Do you know 3SC?" message="Check out 3SC" url="https://3sidedcube.com/">
		<Text>Tell your friends about 3 Sided Cube</Text>
	</ShareLink>
	```

## Why?

