// ==========================================
// 1. 前端 HTML 页面
// ==========================================
const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>YL BBS - 社区</title>
<style>
  :root { --bg: #fff; --text: #333; --line: #333; --muted: #888; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
  .header { padding: 20px; font-size: 24px; font-weight: 500; display: flex; justify-content: space-between; align-items: center; }
  .header-left { display: flex; align-items: center; gap: 10px; }
  .back-btn { width: 32px; height: 32px; cursor: pointer; margin-left: -8px; display: none;}
  .back-btn svg { width: 100%; height: 100%; stroke: var(--text); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .content { flex: 1; overflow-y: auto; padding: 0 20px; padding-bottom: 100px; display: none; }
  .content.active { display: block; }
  .content.no-nav { padding-bottom: 20px; }
  .article-card { border: 2px solid var(--line); padding: 16px; margin-bottom: 20px; border-radius: 4px; cursor: pointer; }
  .card-header { display: flex; align-items: center; margin-bottom: 16px; }
  .avatar-small { width: 24px; height: 24px; border: 2px solid var(--line); border-radius: 50%; margin-right: 10px; position: relative; flex-shrink: 0; }
  .avatar-small::before { content: ''; position: absolute; top: 4px; left: 7px; width: 6px; height: 6px; border: 1.5px solid var(--line); border-radius: 50%; }
  .avatar-small::after { content: ''; position: absolute; bottom: 2px; left: 4px; width: 12px; height: 7px; border: 1.5px solid var(--line); border-bottom: none; border-radius: 6px 6px 0 0; }
  .author { font-size: 13px; color: var(--text); }
  .article-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .article-body { font-size: 15px; line-height: 1.5; white-space: pre-wrap; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .detail-author { display: flex; align-items: center; margin-bottom: 30px; margin-top: 10px; }
  .detail-avatar { width: 40px; height: 40px; border: 2px solid var(--line); border-radius: 50%; margin-right: 12px; position: relative; flex-shrink: 0; }
  .detail-avatar::before { content: ''; position: absolute; top: 8px; left: 11px; width: 12px; height: 12px; border: 2px solid var(--line); border-radius: 50%; }
  .detail-avatar::after { content: ''; position: absolute; bottom: 3px; left: 6px; width: 22px; height: 10px; border: 2px solid var(--line); border-bottom: none; border-radius: 10px 10px 0 0; }
  .detail-author-name { font-size: 16px; }
  .detail-content { font-size: 16px; line-height: 1.6; margin-bottom: 40px; white-space: pre-wrap; }
  .comments-section { border-top: 2px solid var(--line); padding-top: 20px; margin-bottom: 40px; }
  .comment-item { margin-bottom: 20px; }
  .comment-author { display: flex; align-items: center; margin-bottom: 10px; }
  .comment-box { border: 2px solid var(--line); padding: 16px; font-size: 15px; white-space: pre-wrap; }
  .comment-input-area { position: fixed; bottom: 0; left: 0; right: 0; padding: 16px 20px; background: var(--bg); display: none; align-items: center; gap: 10px; }
  .comment-input-area.active { display: flex; }
  .comment-input { flex: 1; border: 2px solid var(--line); padding: 12px 16px; font-size: 15px; outline: none; background: transparent; color: var(--text); }
  .send-btn { width: 40px; height: 40px; border: 2px solid var(--line); border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; background: transparent; flex-shrink: 0; }
  .send-btn svg { width: 20px; height: 20px; stroke: var(--text); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .profile-header { display: flex; flex-direction: column; align-items: center; margin-top: 40px; margin-bottom: 40px; }
  .avatar-large { width: 120px; height: 120px; border: 3px solid var(--line); border-radius: 50%; position: relative; margin-bottom: 20px; }
  .avatar-large::before { content: ''; position: absolute; top: 20px; left: 40px; width: 34px; height: 34px; border: 3px solid var(--line); border-radius: 50%; }
  .avatar-large::after { content: ''; position: absolute; bottom: 20px; left: 20px; width: 74px; height: 34px; border: 3px solid var(--line); border-bottom: none; border-radius: 40px 40px 0 0; }
  .profile-name { font-size: 22px; font-weight: 500; }
  .section-title { font-size: 18px; font-weight: 500; margin-bottom: 15px; }
  .my-article-box { border: 2px solid var(--line); padding: 16px; margin-bottom: 16px; cursor: pointer; }
  .publish-btn { border: 2px solid var(--line); background: transparent; padding: 4px 12px; font-size: 14px; cursor: pointer; color: var(--text); display: none;}
  .input-title { width: 100%; border: none; outline: none; font-size: 18px; font-family: inherit; padding: 20px 0; border-bottom: 1px solid #eee; margin-bottom: 20px; background: transparent; color: var(--text); }
  .input-content { width: 100%; border: none; outline: none; font-size: 24px; font-family: inherit; resize: none; height: 400px; line-height: 1.4; background: transparent; color: var(--text); }
  .input-title::placeholder, .input-content::placeholder { color: var(--text); opacity: 0.8; }
  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 80px; background: var(--bg); border-top: 2px solid var(--line); display: flex; justify-content: space-around; align-items: center; }
  .nav-btn { width: 56px; height: 56px; border: 2px solid var(--line); border-radius: 50%; background: transparent; display: flex; justify-content: center; align-items: center; cursor: pointer; }
  .nav-btn svg { width: 28px; height: 28px; stroke: var(--text); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
</style>
</head>
<body>

  <div class="header" id="header">
    <div class="header-left">
      <div class="back-btn" id="btn-back" onclick="goBack()">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </div>
      <span id="header-title">YL BBS</span>
    </div>
    <button class="publish-btn" id="btn-publish-action" onclick="publishPost()">发布</button>
  </div>

  <div class="content active" id="view-home"><div id="home-list"></div></div>

  <div class="content" id="view-me">
    <div class="profile-header">
      <div class="avatar-large"></div>
      <div class="profile-name" id="me-name"></div>
    </div>
    <div class="section-title">我发布过的文章</div>
    <div id="me-list"></div>
  </div>

  <div class="content no-nav" id="view-write">
    <input type="text" class="input-title" id="write-title" placeholder="请输入标题">
    <textarea class="input-content" id="write-content" placeholder="请输入文本"></textarea>
  </div>

  <div class="content no-nav" id="view-detail">
    <div class="detail-author">
      <div class="detail-avatar"></div>
      <div class="detail-author-name" id="detail-author"></div>
    </div>
    <div class="detail-content" id="detail-content"></div>
    
    <div class="comments-section" id="comments-section">
      <div class="section-title">全部评论</div>
      <div id="comments-list"></div>
    </div>
  </div>

  <div class="comment-input-area" id="comment-bar">
    <input type="text" class="comment-input" id="comment-input" placeholder="请输入评论">
    <button class="send-btn" onclick="submitComment()">
      <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    </button>
  </div>

  <div class="bottom-nav" id="bottom-nav">
    <div class="nav-btn" onclick="switchTab('home')">
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    </div>
    <div class="nav-btn" onclick="switchTab('write')">
      <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </div>
    <div class="nav-btn" onclick="switchTab('me')">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </div>
  </div>

<script>
  // 前后端合并在同一个 Worker，直接留空
  const API_BASE = ""; 
  
  const SSO_URL = "https://acss.ylai.website";
  let currentTab = "home";
  let currentArticleId = null;

  function getUser() { return localStorage.getItem("bbs_user") || null; }

  function requireLogin() {
    if (!getUser()) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = \`\${SSO_URL}?returnUrl=\${returnUrl}\`;
      return false;
    }
    return true;
  }

  function switchTab(tab) {
    if ((tab === 'me' || tab === 'write') && !requireLogin()) return;
    currentTab = tab;
    document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
    document.getElementById(\`view-\${tab}\`).classList.add('active');
    
    const nav = document.getElementById('bottom-nav');
    const commentBar = document.getElementById('comment-bar');
    const btnBack = document.getElementById('btn-back');
    const publishBtn = document.getElementById('btn-publish-action');
    const headerTitle = document.getElementById('header-title');

    if (tab === 'home') {
      nav.style.display = "flex"; commentBar.classList.remove('active');
      btnBack.style.display = "none"; publishBtn.style.display = "none";
      headerTitle.innerText = "YL BBS"; loadHome();
    } else if (tab === 'me') {
      nav.style.display = "flex"; commentBar.classList.remove('active');
      btnBack.style.display = "none"; publishBtn.style.display = "none";
      headerTitle.innerText = "YL BBS 我的"; loadMe();
    } else if (tab === 'write') {
      nav.style.display = "flex"; commentBar.classList.remove('active');
      btnBack.style.display = "block"; publishBtn.style.display = "block";
      headerTitle.innerText = "YL BBS 发布";
      document.getElementById('write-title').value = "";
      document.getElementById('write-content').value = "";
    } else if (tab === 'detail') {
      nav.style.display = "none"; commentBar.classList.add('active'); 
      btnBack.style.display = "block"; publishBtn.style.display = "none";
      headerTitle.innerText = "YL BBS"; loadArticleDetail(currentArticleId);
    }
  }

  function goBack() {
    if (currentTab === 'detail' || currentTab === 'write') switchTab('home');
  }

  async function loadHome() {
    const listBox = document.getElementById("home-list");
    listBox.innerHTML = "<p style='color:#888;text-align:center;margin-top:40px;'>加载中...</p>";
    try {
      const res = await fetch(\`\${API_BASE}/api/articles\`);
      const articles = await res.json();
      if (articles.length === 0) {
        listBox.innerHTML = "<p style='color:#888;text-align:center;margin-top:40px;'>暂无文章，快去发布吧！</p>";
        return;
      }
      listBox.innerHTML = articles.map(a => \`
        <div class="article-card" onclick="openArticle(\${a.id})">
          <div class="card-header">
            <div class="avatar-small"></div>
            <span class="author">\${a.author}</span>
          </div>
          <div class="article-title">\${a.title}</div>
          <div class="article-body">\${a.content}</div>
        </div>
      \`).join("");
    } catch (e) { listBox.innerHTML = "<p style='color:red;text-align:center;'>加载失败，请检查网络</p>"; }
  }

  function openArticle(id) { currentArticleId = id; switchTab('detail'); }

  async function loadArticleDetail(id) {
    const contentBox = document.getElementById('detail-content');
    const authorBox = document.getElementById('detail-author');
    const commentsBox = document.getElementById('comments-list');
    contentBox.innerText = "加载中..."; authorBox.innerText = ""; commentsBox.innerHTML = "";
    try {
      const res = await fetch(\`\${API_BASE}/api/articles/\${id}\`);
      const data = await res.json();
      authorBox.innerText = data.article.author;
      contentBox.innerText = data.article.content;
      if (data.comments.length === 0) {
        commentsBox.innerHTML = "<p style='color:#888;font-size:14px;'>暂无评论，快来抢沙发！</p>";
      } else {
        commentsBox.innerHTML = data.comments.map(c => \`
          <div class="comment-item">
            <div class="comment-author">
              <div class="avatar-small"></div>
              <span class="author">\${c.author}</span>
            </div>
            <div class="comment-box">\${c.content}</div>
          </div>
        \`).join("");
      }
    } catch (e) { contentBox.innerText = "加载失败"; }
  }

  async function publishPost() {
    if (!requireLogin()) return;
    const title = document.getElementById("write-title").value.trim();
    const content = document.getElementById("write-content").value.trim();
    if (!title || !content) return alert("标题和内容不能为空！");
    const btn = document.getElementById("btn-publish-action"); btn.innerText = "发布中";
    try {
      const res = await fetch(\`\${API_BASE}/api/articles\`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author: getUser() })
      });
      if (res.ok) { alert("发布成功！"); switchTab("home"); } else { alert("发布失败"); }
    } catch (e) { alert("网络错误"); } finally { btn.innerText = "发布"; }
  }

  async function submitComment() {
    if (!requireLogin()) return;
    const input = document.getElementById("comment-input"); const text = input.value.trim();
    if (!text) return;
    try {
      const res = await fetch(\`\${API_BASE}/api/comments\`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: currentArticleId, content: text, author: getUser() })
      });
      if (res.ok) { input.value = ""; loadArticleDetail(currentArticleId); }
    } catch (e) { alert("评论失败"); }
  }

  function loadMe() {
    document.getElementById("me-name").innerText = getUser() || "未登录";
    document.getElementById("me-list").innerHTML = "<p style='color:#888;'>个人文章列表需后端增加接口支持</p>";
  }

  function handleSSOCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); const username = urlParams.get('username');
    if (token && username) {
      localStorage.setItem("bbs_user", username); localStorage.setItem("bbs_token", token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  handleSSOCallback();
  switchTab("home");
</script>
</body>
</html>
`;

// ==========================================
// 2. 后端 API 逻辑 (数据库操作)
// ==========================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };
      if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

      try {
        if (request.method === "GET" && url.pathname === "/api/articles") {
          const { results } = await env.DB.prepare("SELECT * FROM articles ORDER BY created_at DESC").all();
          return new Response(JSON.stringify(results), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "GET" && url.pathname.startsWith("/api/articles/")) {
          const id = url.pathname.split("/").pop();
          const article = await env.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
          const { results: comments } = await env.DB.prepare("SELECT * FROM comments WHERE article_id = ? ORDER BY created_at ASC").bind(id).all();
          return new Response(JSON.stringify({ article, comments }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "POST" && url.pathname === "/api/articles") {
          const { title, content, author } = await request.json();
          if (!title || !content || !author) return new Response("缺少必要参数", { status: 400, headers: corsHeaders });
          await env.DB.prepare("INSERT INTO articles (title, content, author) VALUES (?, ?, ?)").bind(title, content, author).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "POST" && url.pathname === "/api/comments") {
          const { article_id, content, author } = await request.json();
          if (!article_id || !content || !author) return new Response("缺少必要参数", { status: 400, headers: corsHeaders });
          await env.DB.prepare("INSERT INTO comments (article_id, content, author) VALUES (?, ?, ?)").bind(article_id, content, author).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 直接返回前端 HTML
    return new Response(HTML_CONTENT, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};