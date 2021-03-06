root = window

root.defaultPrefix = '/* @echo prefix */'

root.defaultScheme       = '/* @echo applicationConfig_defaultScheme */'
root.apiDomain           = '/* @echo applicationConfig_apiDomain */'
root.staticFileDomain    = '/* @echo applicationConfig_staticFileDomain */'
root.staticFileDirectory = '/* @echo applicationConfig_staticFileDirectory */'
root.staticFileSuffix    = '/* @echo applicationConfig_staticFileSuffix */'
root.googleApiKey        = '/* @echo applicationConfig_googleApiKey */'

root.staticFilePath = "#{ root.defaultScheme }#{ root.staticFileDomain }/#{ root.staticFileDirectory }/"

root.directiveTemplatePath = "#{ root.staticFilePath }template/directive/" # This allows us to set where the templates for directives are coming from so we can host them not necessarily from the same domain
root.viewTemplatePath      = "#{ root.staticFilePath }template/view/" # This allows us to set where the templates for the views corresponding to different states are coming from so we can host them not necessarily from the same domain or just change them all in one place
root.imgPath               = "#{ root.staticFilePath }img/" # this is a hack for now to guarantee that image resources can be loaded from any particular build folder

root.authenticationService = "#{ root.imgPath }banner.png" # this can be arbitrary; even if it's a 404 (which it will be in this case) it'll still expose to the frontend the query parameters, including the ticket given to us by accounts.zefr.com, which we'll then send to the API to login

root.authenticationFailureEvent = 'authenticationFailure'