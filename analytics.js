// ===== GOOGLE SHEET CONFIG =====
const SHEET_ID = "1kgB_PttvCEMDlsMXkiO2jdsCpoe_BjBnpe674HcbnhQ";
const PAGEVIEWS_API = `https://opensheet.elk.sh/${SHEET_ID}/PageViews`;
const SEARCHES_API = `https://opensheet.elk.sh/${SHEET_ID}/Searches`;

// ===== LOG PAGE VIEW =====
async function logPageView(pageName) {
  try {
    fetch(`${PAGEVIEWS_API}/add?Timestamp=${encodeURIComponent(new Date().toISOString())}&Page=${encodeURIComponent(pageName)}`);
  } catch (e) { console.error("PageView log failed:", e); }
}

// Automatically log current page
logPageView(window.location.pathname);

// ===== LOG SEARCH TERM =====
function logSearchTerm(term) {
  if (!term) return;
  try {
    fetch(`${SEARCHES_API}/add?Timestamp=${encodeURIComponent(new Date().toISOString())}&SearchTerm=${encodeURIComponent(term)}`);
  } catch (e) { console.error("Search log failed:", e); }
}

// ===== DETECT YOUR SEARCH INPUT =====
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search"); // Your exact search input ID

  if(input){
    input.addEventListener("keypress", function(evt){
      if(evt.key === "Enter"){ // detect Enter key
        evt.preventDefault();   // prevent default reload
        const q = input.value.trim();
        logSearchTerm(q);
      }
    });
  }
});