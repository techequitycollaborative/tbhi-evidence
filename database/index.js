require("dotenv").config();
const fs = require("fs");
const crypto = require("crypto");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

const server_url = process.env.SERVER_URL;
// make sure personal env port variables are updated to match these property names
const server_port = process.env.SERVER_PORT;
const db_port = process.env.DB_PORT;

const port = process.env.PORT;
const { Pool } = require("pg");
const p = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  // @ts-ignore
  port: process.env.DB_PORT,
  dialect: "postgres",
  ssl: { rejectUnauthorized: false },
});

p.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  const createTable = fs.readFileSync("./create-tables.sql").toString();
  client.query(createTable, (err, result) => {
    release();
    if (err) {
      return console.error("Error executing DB setup", err.stack);
    }
    console.log("Connected to DB!");
  });
});

app.get("/people", (req, res, next) => {
  p.query("select * from form.person").then((data) => {
    res.send(data.rows);
  });
});

app.get("/application", (req, res, next) => {
  p.query("select * from form.application").then((data) => {
    res.send(data.rows);
  });
});

app.post("/saveRecord", bodyParser.json(), async (req, res, next) => {
  const data = req.body;
  const uuid = crypto.randomUUID();
  console.log(`data insertion attempt (ID ${uuid}):\n${JSON.stringify(data)}`);

  const client = await p.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO form.person (organization, email, race, ethnicity, age, income, credit_score, rental_debt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING person_id`,
      [data.organization, data.email, data.race, data.ethnicity, data.age, data.yearlyIncome, data.creditScore, data.rentalDebt]
    );
    const personId = result.rows[0]["person_id"];
    await client.query(
      `INSERT INTO form.application
      (person_id, application_date, street, unit, city, state, zipcode, rent, property_manager, screening_company, fee, fee_type, application_method, assessment_outcome, assessment_details, denial_reason, denial_details, additional_details)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [
        personId,
        data.applicationDate,
        data.street,
        data.unit,
        data.city,
        data.state,
        data.zipcode,
        data.monthlyRent,
        data.landlordName,
        data.screeningCompanyName,
        data.screeningFee,
        data.portableScreeningFee,
        data.applicationMethod,
        data.assessmentOutcome,
        data.assessmentOutcomeDetails,
        data.denialReason,
        data.otherDenialReason,
        data.additionalContextNotes,
      ]
    );
    await Promise.all(
      data.evictionHistory.map(async (eviction) => {
        await client.query(
          `INSERT INTO form.eviction (person_id, eviction_date, reason)
          VALUES ($1, $2, $3)`,
          [personId, eviction.evictionDate, eviction.evictionReason]
        );
      })
    );
    await Promise.all(
      data.criminalHistory.map(async (conviction) => {
        await client.query(
          `INSERT INTO form.criminal_history (person_id, type, conviction_date, offense)
          VALUES ($1, $2, $3, $4)`,
          [
            personId,
            conviction.criminalHistoryType,
            conviction.convictionDate,
            conviction.offenseName,
          ]
        );
      })
    );
    await client.query("COMMIT");
    console.log(`data insertion (ID ${uuid}) successful`);
    res.status(200).send();
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(`data insertion (ID ${uuid}) failure: ${e}}`);
    res.status(500).send("Error writing to database: " + e.message);
  } finally {
    client.release();
  }
});

app.listen(server_port, () => {
  console.log(`Database server is running on port ${db_port}.`);
});
