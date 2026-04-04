// config.js — Cybersphere Shared Configuration
// All dashboards import this. API keys stored in localStorage.

const CYBERSPHERE_CONFIG = {
  // Read from localStorage with fallbacks
  get(key) {
    return localStorage.getItem(`cybersphere_${key}`) || '';
  },
  set(key, value) {
    localStorage.setItem(`cybersphere_${key}`, value);
  },
  remove(key) {
    localStorage.removeItem(`cybersphere_${key}`);
  },

  // Convenience getters
  get githubToken() { return this.get('github_token'); },
  get githubOwner() { return this.get('github_owner') || 'RadwanJama01'; },
  get githubRepo() { return this.get('github_repo') || '-cybersphere-outreach'; },
  get claudeApiKey() { return this.get('claude_api_key'); },
  get perplexityApiKey() { return this.get('perplexity_api_key'); },
  get notionToken() { return this.get('notion_token'); },
  get notionDbId() { return this.get('notion_db_id'); },
  get slackWebhook() { return this.get('slack_webhook'); },
  get imgflipUser() { return this.get('imgflip_user'); },
  get imgflipPass() { return this.get('imgflip_pass'); },
  get bufferToken() { return this.get('buffer_token'); },
  get metaAdToken() { return this.get('meta_ad_token'); },
  get metaAdAccountId() { return this.get('meta_ad_account_id'); },
  get openaiApiKey() { return this.get('openai_api_key'); },
  get aiReceptionistNumber() { return this.get('ai_receptionist') || '+1 (325) 240-6238'; },

  // Check what's connected
  get isGithubConnected() { return !!this.githubToken; },
  get isClaudeConnected() { return !!this.claudeApiKey; },
  get isPerplexityConnected() { return !!this.perplexityApiKey; },
  get isNotionConnected() { return !!this.notionToken && !!this.notionDbId; },
  get isSlackConnected() { return !!this.slackWebhook; },
  get isImgflipConnected() { return !!this.imgflipUser && !!this.imgflipPass; },
  get isBufferConnected() { return !!this.bufferToken; },
  get isMetaConnected() { return !!this.metaAdToken && !!this.metaAdAccountId; },
  get isOpenAIConnected() { return !!this.openaiApiKey; },

  // GitHub API helpers
  async githubRead(path) {
    if (!this.isGithubConnected) throw new Error('GitHub not connected');
    const res = await fetch(
      `https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/contents/${path}`,
      { headers: { 'Authorization': `Bearer ${this.githubToken}`, 'Accept': 'application/vnd.github+json' } }
    );
    const file = await res.json();
    if (file.message) throw new Error(file.message);
    return { data: JSON.parse(atob(file.content)), sha: file.sha };
  },

  async githubWrite(path, data, sha, message) {
    if (!this.isGithubConnected) throw new Error('GitHub not connected');
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
    const res = await fetch(
      `https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.githubToken}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message || `Update ${path}`, content, sha })
      }
    );
    return res.json();
  },

  // Claude API helper
  async claudeGenerate(prompt, system) {
    if (!this.isClaudeConnected) throw new Error('Claude API not connected');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.claudeApiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: system || 'You are a content generation assistant for Cybersphere, an AI agency.',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || '';
  },

  // Perplexity API helper
  async perplexitySearch(query) {
    if (!this.isPerplexityConnected) throw new Error('Perplexity API not connected');
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.perplexityApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [{ role: 'user', content: query }]
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  },

  // Slack webhook helper
  async slackSend(text) {
    if (!this.isSlackConnected) throw new Error('Slack not connected');
    await fetch(this.slackWebhook, {
      method: 'POST',
      body: JSON.stringify({ text })
    });
  },

  // imgflip meme helper
  async generateMeme(templateId, text0, text1) {
    if (!this.isImgflipConnected) throw new Error('imgflip not connected');
    const params = new URLSearchParams({
      template_id: templateId,
      username: this.imgflipUser,
      password: this.imgflipPass,
      text0, text1
    });
    const res = await fetch('https://api.imgflip.com/caption_image', { method: 'POST', body: params });
    const data = await res.json();
    return data.data?.url || '';
  },

  // Connection status summary
  getStatusSummary() {
    return {
      github: this.isGithubConnected,
      claude: this.isClaudeConnected,
      perplexity: this.isPerplexityConnected,
      notion: this.isNotionConnected,
      slack: this.isSlackConnected,
      imgflip: this.isImgflipConnected,
      buffer: this.isBufferConnected,
      meta: this.isMetaConnected,
      openai: this.isOpenAIConnected,
    };
  },

  // Export all config (for backup/transfer)
  exportConfig() {
    const keys = ['github_token','github_owner','github_repo','claude_api_key','perplexity_api_key',
      'notion_token','notion_db_id','slack_webhook','imgflip_user','imgflip_pass','buffer_token',
      'meta_ad_token','meta_ad_account_id','openai_api_key','ai_receptionist'];
    const config = {};
    keys.forEach(k => { const v = this.get(k); if (v) config[k] = v; });
    return config;
  },

  // Import config
  importConfig(config) {
    Object.entries(config).forEach(([k, v]) => this.set(k, v));
  }
};
