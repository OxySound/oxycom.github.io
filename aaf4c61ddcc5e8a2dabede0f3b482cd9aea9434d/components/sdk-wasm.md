
# Getting Started - WebAssembly

The OxySound WebAssembly SDK brings our technology to the web, allowing you to send and receive data over sound in the browser, using a simple JavaScript interface. With the WebAssembly SDK you can integrate OxySound into web pages and apps, and the exact same code can be executed on many different devices, both desktop and mobile.

The SDK never sends audio data to the cloud, running all of the audio processing locally on your device.



## Known Issues

1). Android and iOS devices do not detect frequencies above 8kHz and 11kHz respectively in the browser. However ultrasonic protocols are an option for desktop only applications.

2). The SDK will not work on iOS Chrome, as getUserMedia is not supported in a WKWebView. See the open radar bug report.



## Download
[WASM / Javascript ](/assets/js.zip)

