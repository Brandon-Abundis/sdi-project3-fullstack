
// this WILL break if entries is lower than 3.......................

export default function randCountries(countries) {
  if (!countries || countries.length === 0) return;

    let num1, num2, num3;
    // moved from parent componet, too big to look at
    // hard coded 3 counteries to be random lol
    do {
      num1 = Math.floor(Math.random() * countries.length);
      num2 = Math.floor(Math.random() * countries.length);
      num3 = Math.floor(Math.random() * countries.length);
    } while (num1 === num2 || num1 === num3 || num2 === num3);
    // this forces true random

    const entries = [
      countries[num1],
      countries[num2],
      countries[num3],
    ];

    return entries;
}