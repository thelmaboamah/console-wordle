import { checkGuess } from "./checkGuess.js";

console.log(
  `tasty = WGWGW and result is ${checkGuess("tasty", "earth")}`,
  checkGuess("tasty", "earth") == "WGWGW" ? "✅" : "❌"
);
console.log(
  `crane = WYYWY and result is ${checkGuess("crane", "earth")}`,
  checkGuess("crane", "earth") == "WYYWY" ? "✅" : "❌"
);
console.log(
  `eerie = GWGWW and result is ${checkGuess("eerie", "earth")}`,
  checkGuess("eerie", "earth") == "GWGWW" ? "✅" : "❌"
);
console.log(
  `onion = WWWWW and result is ${checkGuess("onion", "earth")}`,
  checkGuess("onion", "earth") == "WWWWW" ? "✅" : "❌"
);
console.log(
  `water = WGYYY and result is ${checkGuess("water", "earth")}`,
  checkGuess("water", "earth") == "WGYYY" ? "✅" : "❌"
);
console.log(
  `earth = GGGGG and result is ${checkGuess("earth", "earth")}`,
  checkGuess("earth", "earth") == "GGGGG" ? "✅" : "❌"
);

console.log(
  `sasss = GGGGW and result is ${checkGuess("sasss", "sassy")}`,
  checkGuess("sasss", "sassy") == "GGGGW" ? "✅" : "❌"
);
