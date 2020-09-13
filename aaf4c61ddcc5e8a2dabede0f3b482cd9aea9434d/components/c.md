
# Getting Started - C++


## Create Object and Destory

```
  void *OXY_Create();
  void OXY_Destroy(void *oxyingObject);
```

## Configure Profile

Configure function, call this function to configure parameters of the Oxy Core Library mode

```
  Parameters:
     mode (2 for audible, 3 for non-audible)
     samplingRate: sampling rate in Hz
     nChannels: number of channels of the input audio
     Object: OXY object instance, created in OXY_Create()
     Returns: 0=ok, <0=fail
    
  Configure(int mode, float samplingRate, int32_t bufferSize, void *oxyingObject);
```
## Custom Audio Output
 
 Create custom audio, call this function to set a personalized audio that will be played
 simultaneously during oxying playback on top of non-audible, audible or compression modes

```
 Parameters:
       samplesSize: number of samples in samples buffer (maximum size is 2 seconds= 44100*2)
       samples: array with samples (44Khz, 16bits, mono)
       oxyingObject: OXY object instance, created in OXY_Create()
       Returns: 0=ok, <0=fail
   
   SetAudioSignature(int32_t samplesSize, const float *samplesBuffer, void *oxyingObject);
```


## Encode Data
  
```
 
  Parameters:
  
      stringToEncode: string containing the characters to encode
      size: number of characters in string characters to encode
      type: 0 for encoding only tones, 1 for encoding tones + R2D2 sounds, 2 for encoding melody
      melodyString: string containing characters to synthesize melody over the tones (null if type parameter is 0 or 1)
      melodySize: size of melody in number of notes (0 if type parameter is 0 or 1)
      oxyingObject: OXY object instance, created in OXY_Create()
      Returns: number of samples in encoded audio buffer
    
EncodeDataToAudioBuffer(const char *stringToEncode, int32_t size, int32_t type, const char *melodyString, int32_t melodySize, void *oxyingObject);
```

## Encoded Audio Buffer
 
```
   GetEncodedAudioBuffer function
   
  Parameters:
      audioBuffer: float array of bufferSize size to fill with encoded audio data
      oxyingObject: OXY object instance, created in OXY_Create()
      
  GetEncodedAudioBuffer(float *audioBuffer, void *oxyingObject);
```

## Read Audio Buffer
  CreateAudioBufferFromData function, resets the read index on the internal buffer that has the encoded string
  
``` 
   Parameters:
      oxyingObject: OXY object instance, created in OXY_Create()  
      Returns: 0=ok, <0=fail
      
   ResetEncodedAudioBuffer(void *oxyingObject);
```

## Decode Audio

  DecodeAudioBuffer function, receives an audiobuffer of specified size and outputs if encoded data is found
  
```
  Parameters:
      audioBuffer: float array of bufferSize size with audio data to be decoded
      size: size of audioBuffer
      oxyingObject: OXY object instance, created in OXY_Create()  
      Returns: -1 if no decoded data is found, -2 if start token is found, -3 if complete word has been decoded, positive number if character is decoded (number is the token idx)

  DecodeAudioBuffer(float *audioBuffer, int size, void *oxyingObject);
```

## Get Decoded Data
 
 GetDecodedData function, retrieves the last decoded data found
  
```
  Parameters:
    stringDecoded: string containing decoded characters
    oxyingObject: OXY object instance, created in OXY_Create()
    Returns: 0 if no decoded data is available, >0 if data is available and it's ok, <0 if data is available but it's wrong, for the last two cases the return     value magnitude contains number of characters in string decoded
    
  GetDecodedData(char *stringDecoded, void *oxyingObject);
```

## Get Confidence
   
Confidence function, outputs Reception Quality Measure to give confidence about the received audio. 
  A Reception Quality value of 1.0 will mean that the reception conditions are ideal, a lower value will mean that 
  listener is in a noisy environment, the listener should be closer to the transmitter, etc.
  
```
  Parameters:
  oxyingObject: OXY object instance, created in OXY_Create()
  Returns: confidence value from 0.0 o 1.0
  
  GetConfidence(void *oxyingObject); //Get global confidence (combination of the other confidence values)
  GetConfidenceError(void *oxyingObject); //Get confidence due to tokens corrected by correction algorithm
  GetConfidenceNoise(void *oxyingObject); //Get confidence due to signal to noise ratio in received audio
```

## Get Received

Get average received volume of last audio transmission in DB

```
  GetReceivedOxysVolume(void *oxyingObject); 
```
 
## Get Decode Mode

  GetDecodedMode function, outputs an integer representation of the decoded mode found from all 
  available decoding modes, it only makes sense when decoder is configured with the ALL mode, for other modes
  decoded mode will be always the same as the decoding mode.
  
 
```
  Parameters:
 
  Returns: decoded mode found ( AUDIBLE = 0, NONAUDIBLE = 1, COMPRESSION = 2 )
  
  GetDecodedMode(void *oxyingObject);
  
```

## Base Frequency
 
 Function to set custom base freq

```
  SetCustomBaseFreq(float baseFreq, int oxysSeparation, void *oxyingObject);
```
 
## Frequency Range
 
 Functions to get decoding frequency range (begin range frequency and end range frequency)
  
```
  GetDecodingBeginFreq(void *oxyingObject);
  GetDecodingEndFreq(void *oxyingObject);
  
```
