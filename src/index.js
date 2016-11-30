const application =  ($ES.CONTEXT == 'BROWSER') ? require('./client').default : require('./server').default

export default application

application()
