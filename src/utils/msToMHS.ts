export function msToHMS(seconds: number) {
  return seconds > 3600
    ? [
        parseInt(String(seconds / 60 / 60)),
        parseInt(String((seconds / 60) % 60)),
        parseInt(String(seconds % 60)),
      ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1")
    : [parseInt(String((seconds / 60) % 60)), parseInt(String(seconds % 60))]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
}
