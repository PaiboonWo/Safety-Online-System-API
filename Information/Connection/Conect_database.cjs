const { Client } = require("pg");
const oracledb = require("oracledb");
require("dotenv").config();
oracledb.initOracleClient({
  tnsAdmin: process.env.TNS_ADMIN,
});

const ConnectPG_DB = async () => {
  const Pg_FETLPSQL_DC_CUSR_Service = {
    user: process.env.USER_PG_CUSR,
    host: process.env.HOST_PG_CUSR,
    database: process.env.DATABASE_PG_CUSR,
    password: process.env.PASSWORD_PG_CUSR,
    port: process.env.PORT_PG_CUSR,
    statement_timeout: 10000,
  };
  const Pg_FETLPSQL_DC_GC_Service = {
    user: process.env.USER_PG_GC,
    host: process.env.HOST_PG_GC,
    database: process.env.DATABASE_PG_GC,
    password: process.env.PASSWORD_PG_GC,
    port: process.env.PORT_PG_GC,
    statement_timeout: 10000,
  };
  const client = new Client(
    Pg_FETLPSQL_DC_CUSR_Service,
    Pg_FETLPSQL_DC_GC_Service
  );
  await client.connect();
  await client.query("SET timezone = 'Asia/Bangkok'");

  return client;
};

const DisconnectPG_DB = async (client) => {
  await client.end();
};

const ConnectOracleDB = async (ConnType) => {
  const oracledb = require("oracledb");
  if (ConnType === "FPC") {
    const FPC = {
      user: process.env.FPC_USER,
      password: process.env.FPC_PASSWORD,
      connectString: process.env.FPC_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(FPC);
    return connection;
  } else if (ConnType === "SMT") {
    const SMT = {
      user: process.env.SMT_USER,
      password: process.env.SMT_PASSWORD,
      connectString: process.env.SMT_CONNECTION_STRING,
    };
    console.log(
      process.env.SMT_USER,
      process.env.SMT_PASSWORD,
      process.env.SMT_CONNECTION_STRING
    );
    const connection = await oracledb.getConnection(SMT);
    return connection;
  } else if (ConnType === "PCTTTEST") {
    const PCTTTEST = {
      user: process.env.PCTTTEST_USER,
      password: process.env.PCTTTEST_PASSWORD,
      connectString: process.env.PCTTTEST_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(PCTTTEST);
    return connection;
  } else if (ConnType === "QAD") {
    const QAD = {
      user: process.env.QAD_USER,
      password: process.env.QAD_PASSWORD,
      connectString: process.env.QAD_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(QAD);
    return connection;
  }
};

const DisconnectOracleDB = async (connection) => {
  await connection.close();
};

module.exports = {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
};
