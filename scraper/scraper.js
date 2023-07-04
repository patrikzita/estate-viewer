const puppeteer = require("puppeteer");
const { Pool } = require("pg");

const url = "https://www.sreality.cz/en/search/for-sale/apartments";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "estatedb",
  password: "password",
  port: 5432,
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const checkDatabaseConnection = async () => {
  while (true) {
    try {
      const client = await pool.connect();
      client.release();
      console.log("Successfully connected to the database.");
      break;
    } catch (err) {
      console.error(
        "Unable to connect to the database, retrying in 5 seconds...",
        err
      );
      await sleep(5000);
    }
  }
};

const checkIfEmpty = async () => {
  try {
    const res = await pool.query("SELECT * FROM apartments LIMIT 1");
    if (res.rows.length > 0) {
      console.log("Data already exists in the database. Exiting...");
      process.exit(0);
    }
  } catch (err) {
    console.log("Table 'apartments' doesn't exist or there was an error.");
  }
};

const saveToDatabase = async (data) => {
  try {
    for (const item of data) {
      await pool.query(
        "INSERT INTO apartments (title, imgSrc) VALUES ($1, $2)",
        [item.title, item.imgSrc]
      );
    }
    console.log("Data saved successfully to the database!");
  } catch (err) {
    console.error("There was an error while saving data to the database:", err);
  }
};

const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS apartments (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          imgSrc TEXT NOT NULL
        );
      `);
    console.log("Table created successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const main = async () => {
  await checkDatabaseConnection();
  await createTable();
  await checkIfEmpty();
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });
  const page = await browser.newPage();

  let apartmentsData = [];

  for (let i = 0; i < 25; i++) {
    await page.goto(url + "?page=" + (i + 1), { waitUntil: "networkidle2" });

    let data = await page.evaluate((url) => {
      const apartmentsPods = Array.from(
        document.querySelectorAll(".property.ng-scope")
      );
      const data = apartmentsPods.map((apartment) => ({
        title: apartment.querySelector(".name").innerText,
        imgSrc: apartment.querySelector("img").getAttribute("src"),
      }));

      return data;
    }, url);

    apartmentsData = apartmentsData.concat(data);
  }

  await saveToDatabase(apartmentsData);

  await browser.close();
};

main();
