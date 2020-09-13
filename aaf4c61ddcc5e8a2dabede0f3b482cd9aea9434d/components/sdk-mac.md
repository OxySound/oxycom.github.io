# Getting Started - MacOS

## Framework
Import the SDK into your project by dragging and dropping the .framework file into your Xcode project. Set ‘Copy items if needed’ if the framework is not already within your project folder.

Add the framework to Linked Frameworks and Libraries
Go to the Project Settings, under the General tab, and add Oxy.framework to "Linked Frameworks and Libraries".

## Add a microphone privacy statement
This text is displayed when your app first launches and asks the user for microphone permission, and should describe why you are requesting access to the microphone. The request message should be short and specific and include an example of how the microphone data will be used, for example

We need access to the microphone to receive messages from nearby devices using sound.

Under the Info tab in the Project Settings, add a Custom iOS Target Property called "Privacy - Microphone Usage Description".

## Disable Bitcode for the SDK
Under the Build Settings tab in the Project Settings, under Build Options, set "Enable Bitcode" to No.

Add a bridging header to the framework
[Swift Only] Add a new Objective-C file to your Swift project. Xcode will prompt if you want to configure your project with a bridging header. Press yes. Once the bridging header is added to your project, you can delete the Objective-C file if you want to.

Inside the bridging header, import the Oxy framework. This will make it available throughout your project’s Swift files.


## Now for the code...
Include the SDK and its associated configuration header:

```
import Oxy
```

And instantiate the SDK 

(A key will required in the future)

```
let OxyManager = Oxy.instance()

oxyManager?.delegate=self
```
#
To receive this data on a second device, simply implement the delegate.

```
class ViewController: UIViewController, oxyDelegate  {
}


func oxyId(with oxy_id: String!) {

DispatchQueue.main.async {

        //Do some magic

    }
}
```

Start

```
oxyManager!.listen()
```

You are now ready to start using OxySound in your own application.