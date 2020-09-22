//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2014, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 10.2.0.324
//
/// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = true;
///
Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: 593, Height: 600 }]; // Width:270, Height:350
///
Dynamsoft.WebTwainEnv.ProductKey = '0CFB5F12D3DCA3F65F9E5749CB142062022734EC9884768909CF9786B3B0535B5C76FC5060F540B6C29007A14CBD464420000000';
///
Dynamsoft.WebTwainEnv.Trial = false;
///
Dynamsoft.WebTwainEnv.Debug = false; // only for debugger output

//EnumDWT_CapSupportedSizes.TWSS_A4(1);

//EnumDWT_CapSupportedSizes.TWSS_A3(11)


///
// Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';

/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.

// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });

