// setTimeout(()=> console.log("hello"), 1000)
// console.log("hey");

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

async function getData() {
    const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes/joke/random");
    const json = await response.json();
    console.log(json.data);          
    console.log(json.data.content);  
}
getData();