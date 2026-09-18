// setTimeout(()=> console.log("hello"), 1000)
// console.log("hey");

import { now } from "mongoose";

//just this one function is enough to understand the asyncAwait

// async function check() {
//   console.log("yep");
//   await new Promise((res, rej) =>
//     setTimeout(() => {
//       console.log("it is how it is");
//       res();
//     }, 1000),
//   );
//   setTimeout(()=> console.log("hello"), 1000)
//   console.log("what");
// }
// check();

// async function getData() {
//     const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes/joke/random");
//     const json = await response.json();
//     console.log(json.data);
//     console.log(json.data.content);
// }
// getData();

const lastScene = new Date("2026-09-17T12:02:47.269Z");
const now = new Date();

const diffInMs = Math.round(lastScene - now);
const diffInSecs = Math.floor(diffInMs / 1000);
const diffInMins = Math.floor(diffInSecs / 60);
const diffInHours = Math.floor(diffInMins / 60);
const diffInDays = Math.floor(diffInHours / 24);
// Calculate hours difference
// const DateDiff = Math.round((lastScene - now))

// const hoursDiff = DateDiff/(1000*60*60)

// if(diffInDays<=1){

// }

// Format automatically (e.g., "in 5 hours" or "5 hours ago")
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
// console.log(rtf.format(diffInHours, "hour"));
// console.log(diffInHours);

// console.log(rtf.format(diffInMins, "minutes"));
// console.log(diffInMins);
// console.log(diffInSecs);
// // console.log(hoursDiff);
// console.log(Math.abs(diffInDays));

if (Math.abs(diffInSecs) >= 60) {
  if (Math.abs(diffInMins) >= 60) {
    if (Math.abs(diffInHours) >= 24) {
      console.log(rtf.format(diffInDays, "day"));
    } else {
      console.log(rtf.format(diffInHours, "hour"));
    }
  } else {
    console.log(rtf.format(diffInMins, "minute"));
  }
} else {
  console.log(rtf.format(diffInSecs, "second"));
}
