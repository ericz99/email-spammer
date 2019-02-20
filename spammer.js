const mailer = require("./lib/mailer");
const readline = require("readline");
const config = require("./config.json");

// readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function Spammer(counter) {
  try {
    const html = `<h1>SCAMMER SCAMMER SCAMMER!</h1>`;

    const info = await mailer.sendEmail(
      config.fake_email,
      config.target_email,
      "SCAMMER ALERT!",
      html
    );

    console.log(`[THREAD ${counter}] - Message sent: %s`, info.messageId);
  } catch (error) {
    if (error) throw new Error("err", error);
  }
}

let i = 0;

function _init() {
  rl.question("How many time you want to spam? ", answer => {
    let entries = parseInt(answer);

    var thread = setInterval(function() {
      // spam this kid
      Spammer(i++);

      // clear interval == i
      if (i == entries + 1) {
        clearInterval(thread);
        process.exit(1);
      }
    }, 1500);
  });
}

// RUN _INIT()

_init();
