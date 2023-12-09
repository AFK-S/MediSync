import { Builder, By, until } from "selenium-webdriver";
import cheerio from "cheerio";
import { validationResult } from "express-validator";

const htmlTableToJson = (html) => {
  const $ = cheerio.load(html);
  const headers = ["ID", "IP Address", "MAC Address", "Status", "Configure"];
  const rows = [];

  $("tbody tr").each((index, row) => {
    const rowData = {};
    $(row)
      .find("td")
      .each((i, cell) => {
        rowData[headers[i]] = $(cell).text().trim();
      });
    rows.push(rowData);
  });

  rows.shift();
  return rows;
};
const RouterLogin = async (req, res) => {
  const driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://192.168.0.1/");
  await driver.findElement(By.id("userName")).sendKeys("admin");
  await driver.findElement(By.id("pcPassword")).sendKeys("admin");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.wait(until.urlContains("/userRpm/Index.htm"), 2000);
  driver.switchTo().frame("bottomLeftFrame");
  await driver.wait(until.elementLocated(By.id("ol41")), 2000);
  await driver.findElement(By.id("ol41")).findElement(By.id("a41")).click();
  await driver.findElement(By.id("ol43")).findElement(By.id("a43")).click();
  await driver.switchTo().defaultContent();
  await driver.switchTo().frame("mainFrame");
  await driver.wait(until.elementLocated(By.id("autoWidth")), 2000);
  const data = await driver.findElement(By.id("autoWidth"));

  return data;
};

const DeviceDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const data = await RouterLogin();
    const tag = await data.findElement(By.xpath(`//tr[3]/td`));

    const htmlContent = await tag.getAttribute("innerHTML");
    const jsonData = htmlTableToJson(htmlContent);

    res.status(200).json(jsonData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

const CheckIP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const clientIP = req.socket.remoteAddress;
  try {
    const data = await RouterLogin();
    const tag = await data.findElement(By.xpath(`//tr[3]/td`)).getText();

    if (!tag.includes(clientIP)) {
      next();
      return res.status(400).end();
    }

    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export { DeviceDetails, CheckIP };
