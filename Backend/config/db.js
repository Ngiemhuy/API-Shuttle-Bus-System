module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "keochanny$1",
    DB: "2023_shuttle_bus_system",
    dialect: "postgres",
    pool: {
      max: 6,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };