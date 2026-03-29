/**
 * Cybersphere Skill: github-crm
 * Reads and writes CRM data to GitHub repo via API.
 * Drop in: ~/.openclaw/skills/github-crm.js
 *
 * Requires in .env:
 *   GITHUB_TOKEN   — Personal Access Token with repo scope
 *   GITHUB_OWNER   — RadwanJama01
 *   GITHUB_REPO    — -cybersphere-outreach
 */

const GITHUB_API = "https://api.github.com";

// ── Core read/write ──

async function getData(token, owner, repo) {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/data.json`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } }
  );
  const file = await res.json();
  const content = Buffer.from(file.content, "base64").toString("utf8");
  return { data: JSON.parse(content), sha: file.sha };
}

async function saveData(data, sha, token, owner, repo) {
  data.meta.lastUpdated = new Date().toISOString();
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/data.json`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: `CRM update ${new Date().toISOString()}`, content, sha })
    }
  );
  return res.json();
}

// ── Actions ──

async function logPost(postData, token, owner, repo) {
  const { data, sha } = await getData(token, owner, repo);
  const post = {
    id: `post_${Date.now()}`,
    timestamp: new Date().toISOString(),
    group: postData.group,
    vertical: postData.vertical,
    postText: postData.text,
    status: postData.status || "posted",
    similarityScore: postData.similarityScore || 0,
    guardrailsPassed: postData.guardrails || []
  };
  data.postLog = data.postLog || [];
  data.postLog.unshift(post);
  data.meta.weeklyPosts = (data.meta.weeklyPosts || 0) + 1;
  await saveData(data, sha, token, owner, repo);
  console.log(`[GITHUB CRM] Post logged: ${post.group}`);
  return post.id;
}

async function createLead(leadData, token, owner, repo) {
  const { data, sha } = await getData(token, owner, repo);
  const lead = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: leadData.name || "Facebook User",
    biz: leadData.biz || "",
    vertical: leadData.vertical || "general",
    stage: "outreach",
    source: leadData.source || "",
    phone: leadData.phone || "",
    value: leadData.value || "",
    callStatus: "No call yet",
    escalate: false,
    notes: leadData.notes || "",
    timeline: [{
      color: "#1A3A6B",
      text: `Replied to post in ${leadData.source}`,
      time: new Date().toLocaleString()
    }]
  };
  data.leads = data.leads || [];
  data.leads.unshift(lead);
  data.meta.totalLeads = data.leads.length;
  data.meta.pipelineValue = calculatePipelineValue(data.leads);
  await saveData(data, sha, token, owner, repo);
  console.log(`[GITHUB CRM] Lead created: ${lead.name}`);
  return lead.id;
}

async function updateLead(leadId, updates, token, owner, repo) {
  const { data, sha } = await getData(token, owner, repo);
  const idx = data.leads.findIndex(l => l.id === leadId);
  if (idx === -1) throw new Error(`Lead ${leadId} not found`);
  data.leads[idx] = { ...data.leads[idx], ...updates };
  if (updates.timelineEntry) {
    data.leads[idx].timeline = data.leads[idx].timeline || [];
    data.leads[idx].timeline.push(updates.timelineEntry);
    delete data.leads[idx].timelineEntry;
  }
  data.meta.pipelineValue = calculatePipelineValue(data.leads);
  await saveData(data, sha, token, owner, repo);
  console.log(`[GITHUB CRM] Lead updated: ${leadId}`);
  return data.leads[idx];
}

async function flagEscalation(leadId, reason, token, owner, repo) {
  return updateLead(leadId, {
    escalate: true,
    stage: "followup",
    timelineEntry: {
      color: "#C0392B",
      text: `ESCALATE: ${reason}`,
      time: new Date().toLocaleString()
    }
  }, token, owner, repo);
}

async function moveStage(leadId, newStage, token, owner, repo) {
  const labels = {
    outreach: "Moved to Outreach",
    followup: "Moved to Follow-up",
    closing: "Moved to Closing",
    closed_won: "Closed Won",
    cold: "Marked Cold"
  };
  return updateLead(leadId, {
    stage: newStage,
    timelineEntry: {
      color: "#2D6A4F",
      text: labels[newStage] || `Stage: ${newStage}`,
      time: new Date().toLocaleString()
    }
  }, token, owner, repo);
}

async function logDM(leadId, direction, message, token, owner, repo) {
  return updateLead(leadId, {
    timelineEntry: {
      color: direction === "sent" ? "#2D6A4F" : "#B7791F",
      text: direction === "sent"
        ? `DM sent: ${message.substring(0, 60)}...`
        : `DM received: ${message.substring(0, 60)}...`,
      time: new Date().toLocaleString()
    }
  }, token, owner, repo);
}

async function logCall(leadId, token, owner, repo) {
  const { data, sha } = await getData(token, owner, repo);
  const idx = data.leads.findIndex(l => l.id === leadId);
  if (idx === -1) throw new Error(`Lead ${leadId} not found`);
  data.leads[idx].callStatus = "Called receptionist";
  data.leads[idx].timeline = data.leads[idx].timeline || [];
  data.leads[idx].timeline.push({
    color: "#B7791F",
    text: "Called AI receptionist +1 (325) 240-6238",
    time: new Date().toLocaleString()
  });
  data.meta.callsToReceptionist = (data.meta.callsToReceptionist || 0) + 1;
  await saveData(data, sha, token, owner, repo);
  console.log(`[GITHUB CRM] Call logged for lead: ${leadId}`);
  return data.leads[idx];
}

async function getWeeklyStats(token, owner, repo) {
  const { data } = await getData(token, owner, repo);
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentPosts = (data.postLog || []).filter(p =>
    new Date(p.timestamp).getTime() > oneWeekAgo
  );
  const leads = data.leads || [];
  return {
    postsThisWeek: recentPosts.length,
    totalLeads: leads.length,
    outreach: leads.filter(l => l.stage === "outreach").length,
    followup: leads.filter(l => l.stage === "followup").length,
    closing: leads.filter(l => l.stage === "closing").length,
    escalations: leads.filter(l => l.escalate).length,
    calledReceptionist: leads.filter(l => l.callStatus !== "No call yet").length,
    pipelineValue: data.meta.pipelineValue || 0
  };
}

function calculatePipelineValue(leads) {
  return leads
    .filter(l => l.stage === "followup" || l.stage === "closing")
    .reduce((sum, l) => {
      const val = parseInt((l.value || "0").replace(/[$,\/mo\s]/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
}

module.exports = {
  getData,
  logPost,
  createLead,
  updateLead,
  flagEscalation,
  moveStage,
  logDM,
  logCall,
  getWeeklyStats
};
