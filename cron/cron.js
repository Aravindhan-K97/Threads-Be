import cron from "cron";
import https from "https";

const URL = process.env.BASE_URL || "https://threadsclone-vqkg.onrender.com";

// Cron jobs are scheduled tasks that run periodically at fixed intervals or specific times

// Send 1 GET request for every 10 minutes
const job = new cron.CronJob("*/10 * * * *", function () {
  https
    .get(URL, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});


export default job;
