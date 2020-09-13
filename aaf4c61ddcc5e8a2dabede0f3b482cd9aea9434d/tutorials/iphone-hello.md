# iPhone App


```
import Oxy
import UIKit
import AVFoundation

/**
- Note: OxySound Framework Example

 This class contains common delegate, methods and constants that are used in all application controllers

The constructor`OxyManager` contains all the controls of the OxySound SDK

**Basic Example SDK configuration:**

```
let OxyManager = Oxy.instance()
oxyManager?.delegate=self
oxyManager!.listen()

- Note: The method `OxyManager.delegate = self()` sets the callback for `OK`decodes

- The mehtod `OxyManager.instance()` initialize the SDK.
- The method `OxyManager.listen()` starts the SDK into listening mode the default
- The method `OxyManager.stop()` starts the SDK into listening mode the default
```

 */
 
class ViewController: UIViewController, oxyDelegate  {
   
    @IBOutlet weak var wipbtn: UIButton!
    //Instance
    let oxyManager = Oxy.instance()
    let amax:Float = -110  //door
    
   
    
    //MARK: Flow control of payload
    var tog:Bool = false
    var payload:String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //Assign delegate
       oxyManager?.delegate=self

        //Start engine
       oxyManager!.listen()

    }
    //MARK: Still processing audio push to new thread
    func oxyId(with oxy_id: String!) {
        if(self.payload != oxy_id){
            self.payload = oxy_id
            self.tog = true
        }
        DispatchQueue.main.async {
            switch self.payload {
            case "91876":
                 self.view.backgroundColor = self.random()
                if(self.tog == true) {
                             /* Future use
                           self.tog = false
                            */
                             self.addimage()
                         }
            case "88888":
                self.toggleTorch(on: true)
                self.toggleTorch(on: true)
                self.toggleTorch(on: false)
            case "12345":
                //self.view.backgroundColor = self.UIColorFromHex(rgbValue: 0xD61E1E,alpha: 1)
                //self.view.backgroundColor = self.random()
                //self.showToast(oxy_id)
                if(self.oxyManager!.distanceVol() < self.amax ) {
                    print(self.oxyManager!.distanceVol())
                    self.showToast("Move device closer")
                    self.view.backgroundColor =
                        // Red
                        self.UIColorFromHex(rgbValue: 0xD61E1E,alpha: 1)
                }else{
                    self.showToast("Device within range")
                    // Green
                    self.view.backgroundColor = self.UIColorFromHex(rgbValue: 0x228B22,alpha: 1)
                }
            default:
                self.view.backgroundColor = self.random()
                self.showToast(oxy_id)
                //print(oxy_id as Any)
            }
        }
}
    func random() -> UIColor {
        return UIColor(red: .random(in: 0...1),
                       green: .random(in: 0...1),
                       blue: .random(in: 0...1),
                       alpha: 1.0)
    }

   
    
    func addimage(){
        var number = Int.random(in: 0 ..< 900)
        var number2 = Int.random(in: 0 ..< 900)
        //Create image view simply like this.
        let imgView = UIImageView()
        
        imgView.frame = CGRect(x: number, y: number2, width: 200, height: 200)
        imgView.image = UIImage(named: "uv")//Assign image to ImageView
        imgView.imgViewCorners()
        view.addSubview(imgView)//Add image to our view
    }
    
    func UIColorFromHex(rgbValue:UInt32, alpha:Double=1.0)->UIColor {
        let red = CGFloat((rgbValue & 0xFF0000) >> 16)/256.0
        let green = CGFloat((rgbValue & 0xFF00) >> 8)/256.0
        let blue = CGFloat(rgbValue & 0xFF)/256.0

        return UIColor(red:red, green:green, blue:blue, alpha:CGFloat(alpha))
    }
    func toggleTorch(on: Bool) {
        guard
            let device = AVCaptureDevice.default(for: AVMediaType.video),
            device.hasTorch
        else { return }

        do {
            try device.lockForConfiguration()
            device.torchMode = on ? .on : .off
            device.unlockForConfiguration()
        } catch {
            print("Torch could not be used")
        }
    }
}

extension UIImageView {
    //If you want only round corners
    func imgViewCorners() {
        layer.cornerRadius = 10
        layer.borderWidth = 1.0
        layer.masksToBounds = true
    }
}


```
