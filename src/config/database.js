const { mysqlConfig } = require('./vars');
module.exports = {
    development: {
        username: mysqlConfig.dBUserName,
        password: mysqlConfig.dbPassword,
        database: mysqlConfig.dbName,
        host: mysqlConfig.dbHost,
        dialect: 'mysql',
        define: {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        define: {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    production: {
        username: mysqlConfig.dBUserName,
        password: mysqlConfig.dbPassword,
        database: mysqlConfig.dbName,
        host: mysqlConfig.dbHost,
        dialect: 'mysql',
        define: {
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
};
