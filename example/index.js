import { start, routes } from "diamond"

let test = new String("123");
console.log(test.toString()); // logs 123
console.log(test.substring(0)); // logs 123
String.prototype.substring = function(){ return "hahanope"; }
console.log(test.substring(0)); // logs hahanope

routes({ managerFile: 'example/routes' })
start({ port: 3030 })