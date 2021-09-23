module.exports = {
    apps: [{
        name: "scoreboard",
        script: "npm",
        args: "start -p 8000",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}
