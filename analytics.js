// ======== GOOGLE SHEET + OPENSHEET SETUP ========
const SHEET_ID = "1kgB_PttvCEMDlsMXkiO2jdsCpoe_BjBnpe674HcbnhQ";
const PAGEVIEWS_API = `https://opensheet.elk.sh/1kgB_PttvCEMDlsMXkiO2jdsCpoe_BjBnpe674HcbnhQ/PageViews`;
const SEARCHES_API = `https://opensheet.elk.sh/1kgB_PttvCEMDlsMXkiO2jdsCpoe_BjBnpe674HcbnhQ/Searches`;

// ======== LOG PAGE VIEW ========
async function logPageView() {
  try {
    const timestamp = new Date().toISOString();
    const page = window.location.pathname || "unknown";
    const url = `${PAGEVIEWS_API}/add?Timestamp=${encodeURIComponent(timestamp)}&Page=${encodeURIComponent(page)}`;
    fetch(url).catch(err => console.error("PageView log failed:", err));
  } catch (err) {
    console.error("PageView logging error:", err);
  }
}
logPageView(); // Log page view automatically

// ======== LOG SEARCH TERM ========
function logSearchTerm(term) {
  if (!term) return;
  try {
    const timestamp = new Date().toISOString();
    const url = `${SEARCHES_API}/add?Timestamp=${encodeURIComponent(timestamp)}&SearchTerm=${encodeURIComponent(term)}`;
    fetch(url).catch(err => console.error("Search log failed:", err));
  } catch (err) {
    console.error("Search log error:", err);
  }
}

// ======== AUTOMATIC SEARCH LOGGING (NO ENTER BUTTON NEEDED) ========
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  if(!input) return;

  let timeout;
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    const query = input.value.trim();
    if(!query) return;

    // Log search 1 second after user stops typing
    timeout = setTimeout(() => {
      logSearchTerm(query);
    }, 1000);
  });
});

