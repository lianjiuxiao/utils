export function isIOS () {
  return (/iphone/i).test(navigator.userAgent.toLowerCase());
}

export function isChrome () {
  return (/chrome/i).test(navigator.userAgent.toLowerCase());
}

export function getScreenOrientation () {
  // portrait竖屏，landscape横屏
  if (window.orientation === 180 || window.orientation === 0) {
    return isIOS() ? 'portrait' : 'landscape';
  } else if (window.orientation === 90 || window.orientation === -90) {
    return isIOS() ? 'landscape' : 'portrait';
  }
}

export function BROWSER() {
    var Browser_Name = navigator.appName;
    var Browser_Version = parseFloat(navigator.appVersion);
    var Browser_Agent = navigator.userAgent;
    var Actual_Version, Actual_Name;
    var is_IE = (Browser_Name == "Microsoft Internet Explorer"); //判读是否为ie浏览器
    var is_NN = (Browser_Name == "Netscape"); //判断是否为netscape浏览器
    var is_op = (Browser_Name == "Opera"); //判断是否为Opera浏览器
    if(is_NN) {
        //upper 5.0 need to be process,lower 5.0 return directly
        if(Browser_Version >= 5.0) {
            if(Browser_Agent.indexOf("Netscape") != -1) {
                var Split_Sign = Browser_Agent.lastIndexOf("/");
                var Version = Browser_Agent.lastIndexOf(" ");
                var Bname = Browser_Agent.substring(0, Split_Sign);
                var Split_sign2 = Bname.lastIndexOf(" ");
                Actual_Version = Browser_Agent.substring(Split_Sign + 1, Browser_Agent.length);
                Actual_Name = Bname.substring(Split_sign2 + 1, Bname.length);
            }
            if(Browser_Agent.indexOf("Firefox") != -1) {
                var Version = Browser_Agent.lastIndexOf("Firefox");
                Actual_Version = Browser_Agent.substring(Version + 8, Browser_Agent.length);
                Actual_Name = Browser_Agent.substring(Version, Version + 7);
            }
            if(Browser_Agent.indexOf("Safari") != -1) {
                if(Browser_Agent.indexOf("Chrome") != -1) {
                    var Split_Sign = Browser_Agent.lastIndexOf(" ");
                    var Version = Browser_Agent.substring(0, Split_Sign);;
                    var Split_Sign2 = Version.lastIndexOf("/");
                    var Bname = Version.lastIndexOf(" ");
                    Actual_Version = Version.substring(Split_Sign2 + 1, Version.length);
                    Actual_Name = Version.substring(Bname + 1, Split_Sign2);
                } else {
                    var Split_Sign = Browser_Agent.lastIndexOf("/");
                    var Version = Browser_Agent.substring(0, Split_Sign);;
                    var Split_Sign2 = Version.lastIndexOf("/");
                    var Bname = Browser_Agent.lastIndexOf(" ");
                    Actual_Version = Browser_Agent.substring(Split_Sign2 + 1, Bname);
                    Actual_Name = Browser_Agent.substring(Bname + 1, Split_Sign);
                }
            }
            if(Browser_Agent.indexOf("Trident") != -1) {
                Actual_Version = Browser_Version;
                Actual_Name = Browser_Name;
            }
        } else {

            Actual_Version = Browser_Version;
            Actual_Name = Browser_Name;
        }
    } else if(is_IE) {
        var Version_Start = Browser_Agent.indexOf("MSIE");
        var Version_End = Browser_Agent.indexOf(";", Version_Start);
        Actual_Version = Browser_Agent.substring(Version_Start + 5, Version_End)
        Actual_Name = Browser_Name;

        if(Browser_Agent.indexOf("Maxthon") != -1 || Browser_Agent.indexOf("MAXTHON") != -1) {
            var mv = Browser_Agent.lastIndexOf(" ");
            var mv1 = Browser_Agent.substring(mv, Browser_Agent.length - 1);
            mv1 = "遨游版本:" + mv1;
            Actual_Name += "(Maxthon)";
            Actual_Version += mv1;
        }
    } else if(Browser_Agent.indexOf("Opera") != -1) {
        Actual_Name = "Opera";
        var tempstart = Browser_Agent.indexOf("Opera");
        var tempend = Browser_Agent.length;
        Actual_Version = Browser_Version;
    } else {
        Actual_Name = "Unknown Navigator"
        Actual_Version = "Unknown Version"
    }
    /*------------------------------------------------------------------------------
     --Your Can Create new properties of navigator(Acutal_Name and Actual_Version) --
     --Userage:                                                                     --
     --1,Call This Function.                                                        --
     --2,use the property Like This:navigator.Actual_Name/navigator.Actual_Version;--
     ------------------------------------------------------------------------------*/
    navigator.Actual_Name = Actual_Name;
    navigator.Actual_Version = Actual_Version;

    /*---------------------------------------------------------------------------
     --Or Made this a Class.                                                     --
     --Userage:                                                                  --
     --1,Create a instance of this object like this:var browser=new browserinfo;--
     --2,user this instance:browser.Version/browser.Name;                        --
     ---------------------------------------------------------------------------*/
    this.Name = Actual_Name;
    this.Version = Actual_Version;
    this.isFirefox = function() {
        if(Actual_Name.indexOf("Firefox") == -1)
            return false;
        else
            return true;
    }
    this.isSafari = function() {
        if(Actual_Name.indexOf("Safari") == -1)
            return false;
        else
            return true;
    }
    this.isChrome = function() {
        if(Actual_Name.indexOf("Chrome") == -1)
            return false;
        else
            return true;
    }
    //判读是否为ie浏览器
    this.isIE = function() {
        if(Browser_Name == "Microsoft Internet Explorer")
            return false;
        else
            return true;
    }
    //判读是否为ie6浏览器
    this.isCurrIE6 = function() {
        if(Browser_Agent.toLowerCase().indexOf("msie 6.0") != -1)
            return false;
        else
            return true;
    }
    //判读是否为ie7浏览器
    this.isCurrIE6 = function() {
        if(Browser_Agent.toLowerCase().indexOf("msie 7.0") != -1)
            return false;
        else
            return true;
    }
    //判读是否为ie8浏览器
    this.isCurrIE9 = function() {
        if(Browser_Agent.toLowerCase().indexOf("msie 8.0") != -1)
            return false;
        else
            return true;
    }
    //判读是否为ie9浏览器
    this.isCurrIE10 = function() {
        if(Browser_Agent.toLowerCase().indexOf("msie 9.0") != -1)
            return false;
        else
            return true;
    }
    //判读是否为ie11浏览器
    this.isCurrIE11 = function() {
        if((Browser_Name == "Netscape") && (parseFloat(Browser_Version) >= 5.0) && (Browser_Agent.indexOf("Trident") != -1))
            return false;
        else
            return true;
    }
}