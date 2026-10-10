import { generate } from "otplib";

generate({ secret: "PASTE_MANUAL_KEY_HERE" }).then(console.log);