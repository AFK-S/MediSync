import { Builder, By, until } from "selenium-webdriver";
import cheerio from "cheerio";
import DoctorSchema from "../models/DoctorSchema.js";

let driver;

const htmlTableToJson = (html, headers) => {
  const $ = cheerio.load(html);
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

const RouterLogin = async (btn1, a1, btn2, a2) => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://192.168.0.1/");
  await driver.findElement(By.id("userName")).sendKeys("admin");
  await driver.findElement(By.id("pcPassword")).sendKeys("admin");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.wait(until.urlContains("/userRpm/Index.htm"), 2000);
  await driver.switchTo().frame("bottomLeftFrame");
  await driver.wait(until.elementLocated(By.id(btn1)), 2000);
  await driver.findElement(By.id(btn1)).findElement(By.id(a1)).click();
  await driver.findElement(By.id(btn2)).findElement(By.id(a2)).click();
  await driver.switchTo().defaultContent();
  await driver.switchTo().frame("mainFrame");
  await driver.wait(until.elementLocated(By.id("autoWidth")), 2000);
};

const DeviceDetails = async () => {
  await RouterLogin("ol41", "a41", "ol43", "a43");
  const data = await driver.findElement(By.id("autoWidth"));
  const tag = await data.findElement(By.xpath(`//tr[3]/td`));
  const htmlContent = await tag.getAttribute("innerHTML");
  const headers = ["id", "mac_address", "ip_address", "status", "configure"];
  const jsonData = htmlTableToJson(htmlContent, headers);
  await driver.quit();
  return jsonData;
};

const ConnectedDevices = async () => {
  await RouterLogin("ol7", "a7", "ol12", "a12");
  const data1 = await driver.findElement(By.id("autoWidth"));
  const headers = [
    "id",
    "mac_address",
    "current_status",
    "received_packets",
    "sent_packets",
    "configure",
  ];
  const page1 = await data1.findElement(By.xpath(`//tr[5]/td`));
  const htmlContent1 = await page1.getAttribute("innerHTML");
  const jsonData = htmlTableToJson(htmlContent1, headers);
  const NextBtn = await data1
    .findElement(By.className("mbtn"))
    .findElement(By.css('[value="Next"]'));
  if (
    (await NextBtn.getAttribute("value")) === "Next" &&
    (await NextBtn.getAttribute("disabled")) === null
  ) {
    await NextBtn.click();
    const data2 = await driver.findElement(By.id("autoWidth"));
    const page2 = await data2.findElement(By.xpath(`//tr[5]/td`));
    const htmlContent2 = await page2.getAttribute("innerHTML");
    const jsonData2 = htmlTableToJson(htmlContent2, headers);
    jsonData.push(...jsonData2);
  }
  await driver.quit();
  return jsonData;
};

const CheckMacAddress = async (req, res) => {
  try {
    const { username, password } = req.body;
    const clientIP = req.socket.remoteAddress.split(":")[3];
    const data = await DeviceDetails();
    for (let i = 0; i < data.length; i++) {
      if (data[i].ip_address === clientIP) {
        await DoctorSchema.findOneAndUpdate(
          {
            username,
            password,
          },
          { mac_address: data[i].mac_address }
        );
        return res.status(200).json({
          _id: req._id,
          mac_address: data[i].mac_address,
        });
      }
    }
    res.status(400).send("First time login should be from hospital network");
  } catch (err) {
    console.error(err);
  }
};

const VerifyConnectedDevices = async (result) => {
  try {
    const mac_address_list = [];
    const data = await ConnectedDevices();
    for (let i = 0; i < data.length; i++) {
      mac_address_list.push(data[i].mac_address);
    }
    const remove_list = result.filter(
      (value) => !mac_address_list.includes(value)
    );
    const new_list = mac_address_list.filter(
      (value) => !result.includes(value)
    );
    console.log("past list", result);
    console.log("present list", mac_address_list);
    if (remove_list.length > 0) {
      console.log("Removed Mac Address list", remove_list);
    }
    if (new_list.length > 0) {
      console.log("Added Mac Address list", new_list);
    }
    return {
      mac_address_list,
      remove_list,
    };
  } catch (err) {
    console.error(err);
    return [];
  }
};

export {
  DeviceDetails,
  ConnectedDevices,
  CheckMacAddress,
  VerifyConnectedDevices,
};
