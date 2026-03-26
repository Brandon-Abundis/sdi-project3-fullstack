export default function formatNumber(num) {
  if (num == null || isNaN(num)) return "";
  // needed to move this out of the parent component started getting to big.
  const abs = Math.abs(num); // force number to be positive
  const sign = num < 0 ? "-" : ""; // force a minus back in

  const str = String(Math.floor(abs));
  const len = str.length;

  // hard coded way to shorten this bs, 1_0 is how you can match it
  if (len >= 13) return sign + (abs / 1_000_000_000_000).toFixed(1) + " trillion";
  if (len >= 10) return sign + (abs / 1_000_000_000).toFixed(1) + " billion";
  if (len >= 7)  return sign + (abs / 1_000_000).toFixed(1) + " million";

  return sign + abs.toLocaleString("en-US"); // en-US is not required i guess...
}
