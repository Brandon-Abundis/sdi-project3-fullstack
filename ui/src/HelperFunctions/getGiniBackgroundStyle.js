
// moved from parent component and coppied the gini style
export default function getGiniBackgroundStyle(value) {
  // 20, 30, 40, 50, dead
  // just returning a style for the css of gini container
  if (value > 50) {
    return {
      background: "#000000",color: "white",padding: "8px 12px",borderRadius: "6px"
    };
  }
  if (value >= 40) {
    return {
      background: "#8b0000",color: "white",padding: "8px 12px",borderRadius: "6px"
    };
  }
  if (value >= 30) {
    return {
      background: "#b8860b",color: "black",padding: "8px 12px",borderRadius: "6px"
    };
  }
  if (value >= 20) {
    return {
      background: "#006400",color: "white",padding: "8px 12px",borderRadius: "6px"
    };
  }
  return {
    background: "#5bc0de",color: "black",padding: "8px 12px",borderRadius: "6px"
  };
}
