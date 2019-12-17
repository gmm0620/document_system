// @2019/08/06
* Product: Dynamsoft Web TWAIN SDK v15.x
* Summary: this Readme.txt is to help you understand the files under the Resources folder

====== Dynamsoft JavaScript Libraries ======

- dynamsoft.webtwain.config.js
This file is used to make basic configuration of Dynamic Web TWAIN. It's where you enter the product key for the product and to change the initial viewer size, etc.

- dynamsoft.webtwain.initiate.js
This file is the core of the Dynamic Web TWAIN JavaScript Library. You're not supposed to change it without consulting the Dynamsoft Support Team.

- dynamsoft.webtwain.install.js
This file is used to configure the dialogs which are shown when Dynamic Web TWAIN is not installed or needs to be upgraded. This file is already referenced inside the dynamsoft.webtwain.initiate.js

- dynamsoft.webtwain.css
This file contains the style definitions for all the elements of built-in image viewer, progress bar, dialogs, etc.

- addon/dynamsoft.webtwain.addon.pdf.js
This file contains the functionalities of the PDF Rasterizer addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.upload.js
This file contains the functionalities of the Dynamsoft Upload Module. You're not supposed to change it without consulting the Dynamsoft Support Team.

====== End-user Distribution files ======

In v15.0+, for better user experience Dynamic Web TWAIN related files are also installed with Dynamsoft Service including the core scanning library and PDF rasterizer, etc.. On Windows, the ActiveX is also included.

Under dist/

* for end users who use IE , Edge, Chrome or Firefox on Windows (Windows 7/8/2008/2012/2016 and 10; 32-bit and 64-bit)

- DynamsoftServiceSetupTrial.msi / DynamsoftServiceSetup.msi

This Dynamsoft Service needs to be manually installed on end-user machine. For controlled environment, you can also use the MSI to silently deploy the service to all end-user machines, refer to: https://developer.dynamsoft.com/dwt/kb/2866

Although both 32bit and 64bit installers are provided, only the 64bit installer is used by default.

* for end users who use Safari, Chrome or Firefox on mac OS (OS X 10.7+)

- DynamsoftServiceSetup.pkg / DynamsoftServiceSetupTrial.pkg

This Dynamsoft Service needs to be manually installed on end-user machine plus Dynamic Web TWAIN related files.

* for end users who use Chrome or Firefox on Linux (Ubuntu 12.0.4+, Debian 8+, Fedora 24+, mint 18.3; 64-bit)

- DynamsoftServiceSetup.rpm or DynamsoftServiceSetupTrial.rpm
- DynamsoftServiceSetup.deb or DynamsoftServiceSetupTrial.deb

This Dynamsoft Service needs to be manually installed on Debian/Ubuntu/mint or Fedora end-user machine plus Dynamic Web TWAIN related files.

- LICENSE

License information.