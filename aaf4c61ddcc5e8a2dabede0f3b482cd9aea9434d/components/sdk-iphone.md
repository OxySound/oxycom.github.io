

# Getting Started - iOS

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


## Advanced usage


Preselected frequencies and tone seperations

```
    func custom(freq: Float, sep: Int) {
        oxyManager!.setCustomBaseFreq(freq, withSeparation: Int32(sep))
        oxyManager!.configure(oxyManager, with: CUSTOM)
        self.oxyManager!.listen()
    }
```

To limit user interaction with broadcasts a set distance can be set and when below this distance the SDK will respond.
```

if(self.oxyManager!.distanceVol() < self.amax ) {

}
```


Send audio from the SDK. Type options are 0/1 or 2 this relates to should the broadcast be mixed with an external media file or not

Broadcast tone with SDK configuration
```
func sendAudio(){
        checkDeviceVolumeLevel()
        oxyManager!.play("829450000", withType: 0)
    }
```

Audible R2D2 tone

```
func sendAudio(){
        checkDeviceVolumeLevel()
        oxyManager!.play("829450000", withType: 1)
    }
```



External media
```
let soundURLg = Bundle.main.url(forResource: "storm", withExtension: "wav")

...
  oxyManager!.play("929450000", withType: 2)
        SPAlert.present(title: "On device audio mixed with message", message: "929450000", image: UIImage(imageLiteralResourceName: "stormz"))

```

## Download

xcode sample:

[Basic v1.31](/assets/downloads/iOS.zip)
