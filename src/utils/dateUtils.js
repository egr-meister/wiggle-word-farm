// Small, safe date helpers. Never crash on invalid / missing dates.

export function getNowIso() {
  try {
    return new Date().toISOString();
  } catch (e) {
    return "";
  }
}

export function formatDateTime(isoString) {
  try {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    const pad = (n) => (n < 10 ? "0" + n : "" + n);
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${y}-${m}-${day} ${hh}:${mm}`;
  } catch (e) {
    return "";
  }
}
