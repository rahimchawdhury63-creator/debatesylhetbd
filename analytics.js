<div style="font-size:14px;color:#555;margin:10px 0;">
  👁️ Total Views: <span id="views">Loading...</span>
</div>

<script>
const SUPABASE_URL = "https://defnfoffergmmdxqqxuo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZm5mb2ZmZXJnbW1keHFxeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0Mzk2NTgsImV4cCI6MjA4NTAxNTY1OH0.E9g23aPuvRQ4j_luwRMqqQFixqncLxrNxDBish4Qv_s";

// Get current count
fetch(`${SUPABASE_URL}/rest/v1/views?id=eq.1`, {
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`
  }
})
.then(res => res.json())
.then(data => {
  if (!data || data.length === 0) {
    document.getElementById("views").innerText = "0";
    return;
  }

  const current = data[0].count || 0;
  document.getElementById("views").innerText = current + 1;

  // Update count (+1)
  fetch(`${SUPABASE_URL}/rest/v1/views?id=eq.1`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ count: current + 1 })
  });
});
</script>
