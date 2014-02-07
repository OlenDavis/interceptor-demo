(function() {
  var root, test, userAgentTests, _i, _j, _len, _len1;

  root = window;

  userAgentTests = [
    {
      name: "Android",
      regex: /Android/i,
      "class": "android"
    }, {
      name: "iOS",
      regex: /iPhone|iPad|iPod/i,
      "class": "ios"
    }, {
      name: "iPad",
      regex: /iPad/i,
      "class": "ipad"
    }, {
      name: "iPhone",
      regex: /iPhone|iPod/i,
      "class": "iphone"
    }, {
      name: "Mobile",
      regex: /Android|IEMobile|iPhone|iPad|iPod/i,
      "class": "mobile"
    }, {
      name: "Webkit",
      regex: /Webkit/i,
      "class": "webkit"
    }, {
      name: "Firefox",
      regex: /Firefox/i,
      "class": "ff"
    }, {
      name: "IE",
      regex: /MSIE/i,
      "class": "ie"
    }, {
      name: "IE10",
      regex: /MSIE 10/i,
      "class": "ie-10"
    }, {
      name: "Windows",
      regex: /Windows/i,
      "class": "windows"
    }, {
      name: "Retina",
      "class": "retina",
      test: function() {
        return (window.devicePixelRatio != null) && window.devicePixelRatio > 1;
      }
    }
  ];

  root.isBrowser = {};

  for (_i = 0, _len = userAgentTests.length; _i < _len; _i++) {
    test = userAgentTests[_i];
    if (test.regex != null) {
      root.isBrowser[test.name] = navigator.userAgent.match(test.regex);
    } else if (test.test != null) {
      root.isBrowser[test.name] = test.test.call();
    }
  }

  root.$window = angular.element(window);

  root.$document = angular.element(document);

  root.$html = angular.element(document.documentElement);

  for (_j = 0, _len1 = userAgentTests.length; _j < _len1; _j++) {
    test = userAgentTests[_j];
    root.$html.addClass(root.isBrowser[test.name] ? test["class"] : "not-" + test["class"]);
  }

}).call(this);
