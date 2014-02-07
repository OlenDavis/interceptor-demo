(function() {
  var root;

  root = window;

  root.defaultPrefix = 'my';

  root.defaultScheme = 'http://';

  root.apiDomain = 'localhost';

  root.staticFileDomain = 'localhost';

  root.staticFileDirectory = 'grunt_build/built';

  root.staticFileSuffix = '';

  root.googleApiKey = 'AIzaSyCutrVvQ_D7xVZpPOp7sWjCrhC-AFpFco4';

  root.staticFilePath = "" + root.defaultScheme + root.staticFileDomain + "/" + root.staticFileDirectory + "/";

  root.directiveTemplatePath = "" + root.staticFilePath + "template/directive/";

  root.viewTemplatePath = "" + root.staticFilePath + "template/view/";

  root.imgPath = "" + root.staticFilePath + "img/";

  root.authenticationService = "" + root.imgPath + "banner.png";

  root.authenticationFailureEvent = 'authenticationFailure';

}).call(this);
