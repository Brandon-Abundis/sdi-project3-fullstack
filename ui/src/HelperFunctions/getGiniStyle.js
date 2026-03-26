export default function getGiniStyle(value) {
  // needed to move this out of a componet, to big and ugly
  const base = {
    padding: "4px 8px",borderRadius: "6px", fontWeight: "bold",display: "inline-block"
  };

  if (value > 50) {
    return {
      ...base, // how to use orignal css
      background: "black",color: "white" // style for gini inner container
    };
  }
  if (value >= 40) {
    return {
      ...base,
      background: "#2f2f2f",color: "#d9534f"
    };
  }
  if (value >= 30) {
    return {
      ...base,
      background: "#2f2f2f",color: "#f0ad4e"
    };
  }
  if (value >= 20) {
    return {
      ...base,
      background: "#2f2f2f",color: "#5cb85c"
    };
  }

  return { // if its over 50 points its black to show gini is close to end.
    ...base,
    background: "#5bc0de",color: "black"
  };
}
