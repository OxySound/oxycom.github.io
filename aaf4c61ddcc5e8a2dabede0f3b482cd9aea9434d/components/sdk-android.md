

# Getting Started - Android

## AAR
Copy the oxy.aar file to your app/libs directory. Add the following to the dependencies block of your Module build.gradle Gradle script.

To instruct Gradle where to find the local .aar file, add flatDir section to the repositories block. (You’ll need to add a repositories block if one does not already exist).

```
repositories {
  flatDir {
    dirs 'libs'
  }
}
```

## Permissions
Declare your app's audio permissions
Add the following to your AndroidManifest.xml, inside the bottom of the <manifest> element.

```
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

SDK requires at minimum of Android 5.0.x which is Android API level 26.

## Import the SDK

```
import com.oxy.AndroidOxyCore.OxyCore
import com.oxy.AndroidOxyCore.OxyCoreEvent

```
Instantiate the SDK

```
private lateinit var SDKOxyCore: OxyCore


class MainActivity : AppCompatActivity(), OxyCoreEvent {

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Provide Context for Callback
        SDKOxyCore = OxyCore(this)
    }
}

```


```
 //Callback
    override fun IdWith(Id: String) {

    }

```

Request microphone permissions and start the engine
```
    override fun onResume() {
        super.onResume()
        SDKOxyCore.Listen()
    }

```

## States

### Pause
```
    override fun onPause() {
        super.onPause()
        SDKOxyCore.Stop()
    }
```

### Destory the instance
Stop and close the SDK when activity is destroyed.

In order to make sure the SDK will be closed, we need to call the close method to empty the memory and to delete the instance when the activity is destroyed.

```
override fun onDestroy() {
        super.onDestroy()
        SDKOxyCore.Stop()
    }
```

You are now ready to start using OxySound in your own application.