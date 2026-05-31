const path = require("path");

console.log('dir name:', path.dirname(__filename))
console.log('file name:', path.basename(__filename))
console.log('extension name:', path.extname(__filename))

const joinPath = path.join('/user', 'documets', 'node', 'projects')
console.log(" j " , joinPath)

const resolvePath = path.resolve('/user', 'documets', 'node', 'projects')
console.log("res ", resolvePath)

const normalizepath = path.normalize('/user/.documents/..node/project')
console.log("nor ", normalizepath)