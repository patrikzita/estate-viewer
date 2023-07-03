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

const saveToDatabase = async (data) => {
  for (const item of data) {
    await pool.query("INSERT INTO apartments (title, imgSrc) VALUES ($1, $2)", [
      item.title,
      item.imgSrc,
    ]);
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

  await createTable();

  let apartmentsData = [];

  for (let i = 0; i < 2; i++) {
    await page.goto(url + "?strana=" + (i + 1), { waitUntil: "networkidle2" });

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
