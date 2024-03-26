export function generateRandomColor(transparency = 1) {
  // Generate random values for red, green, and blue channels
  const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

  // Ensure transparency value is within range [0, 1]
  transparency = Math.min(1, Math.max(0, transparency));

  // Construct the color string in RGBA format with the provided transparency
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${transparency})`;

  return rgbaColor;
}
