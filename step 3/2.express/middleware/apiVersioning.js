

const urlVerisoning = (version) => (req, res, next) => {
    if(req.path.startsWith(`/api/${version}`)){
        next();
    }else{
        res.status(400).json({
            success: false,
            error: "API verison is not supported"
        })
    }
}

const headerVerison = (v) => (req, res, next) => {
    if(req.get('Accept-Version') === v){
        next()
    }else{
        res.status(404).json({
            success: false,
            error: "Api version not supported"
        })
    }
}

const contentTypeVersioning = (v) => (req, res, next) => {
    const contentType = req.get('Content-Type');
    if(contentType && contentType.includes(`application/vnd.api.${v}+json`)){
        next();
    }else{
         res.status(404).json({
            success: false,
            error: "Api version not supported"
        })
    }
}

module.exports = { urlVerisoning, headerVerison, contentTypeVersioning };