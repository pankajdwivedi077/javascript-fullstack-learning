export default { // only check .js files in server directory
    files: ['**/*.js'],
    rules: {
        semi: "error", // force semicolons
        "no-unsted-vars": "warm" // warn if variables are unused
    }
}