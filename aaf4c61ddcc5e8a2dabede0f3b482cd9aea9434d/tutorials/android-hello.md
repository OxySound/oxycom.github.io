# iPhone App


```
package com.example.oxysound

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.oxy.AndroidOxyCore.OxyCore
import com.oxy.AndroidOxyCore.OxyCoreEvent
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*

private lateinit var SDKOxyCore: OxyCore

private const val REQUEST_RECORD_AUDIO = 1
private var t = 1

class MainActivity : AppCompatActivity(), OxyCoreEvent {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Provide Context for Callback
        SDKOxyCore = OxyCore(this)
    }

    override fun onPause() {
        super.onPause()
        //Pause SDK
        SDKOxyCore.Stop()
    }

    override fun onDestroy() {
        super.onDestroy()c
    }

    private fun distance() {
        SDKOxyCore.distancevol().toString()
    }

    //Callback
    override fun IdWith(Id: String) {
        when (Id) {
            "qa034" -> {
                val rnd = Random()
                val color = Color.argb(255, rnd.nextInt(256), rnd.nextInt(256), rnd.nextInt(256))

                mainlayout.setBackgroundColor(color)
            }
            else -> {
                distance()
                val rnd = Random()
                Toast.makeText(this@MainActivity, Id, Toast.LENGTH_SHORT).show()
                val color = Color.argb(255, rnd.nextInt(256), rnd.nextInt(256), rnd.nextInt(256))
                mainlayout.setBackgroundColor(color)
            }
        }

    }

    // Request microphone permissions
    override fun onResume() {
        super.onResume()
        SDKOxyCore.Listen()
    }
}



```