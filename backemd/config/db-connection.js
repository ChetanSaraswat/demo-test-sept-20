const { Sequelize } = require("sequelize");
const event_emitter = require("events");
const db_event_emitter = new event_emitter();

if (!process.env.NODE_ENV) {
  console.log("NODE_ENV is not defined.");
  process.exit(128);
}

const config = require("./config")[process.env.NODE_ENV];

const sequelize = new Sequelize(config);

const make_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    db_event_emitter.emit("connection");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  make_connection,
};
