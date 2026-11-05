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
  :root { --bg: #fff; --text: #333; --line: #333; --muted: #888; --primary: #2456d6; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
  
  .header { padding: 16px 20px; font-size: 22px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--line); background: var(--bg); z-index: 10;}
  .header-left { display: flex; align-items: center; gap: 10px; }
  .back-btn { width: 32px; height: 32px; cursor: pointer; display: none;}
  .back-btn svg { width: 100%; height: 100%; stroke: var(--text); fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  
  .publish-btn { border: 2px solid var(--line); background: transparent; padding: 6px 16px; font-size: 14px; cursor: pointer; color: var(--text); display: none; font-weight: 600;}

  .top-nav { display: none; gap: 24px; align-items: center; margin-left: 40px; }
  .top-nav-item { font-size: 16px; font-weight: 500; cursor: pointer; color: var(--muted); transition: 0.2s;}
  .top-nav-item.active { color: var(--text); font-weight: 700; }
  .top-nav-item:hover { color: var(--text); }

  .content { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: 100px; display: none; }
  .content.active { display: block; }
  .content.no-nav { padding-bottom: 20px; }
  .container { max-width: 720px; margin: 0 auto; }

  .article-card { border: 2px solid var(--line); padding: 16px; margin-bottom: 20px; border-radius: 4px; cursor: pointer; }
  .card-header { display: flex; align-items: center; margin-bottom: 16px; }
  .avatar-small { width: 28px; height: 28px; border: 2px solid var(--line); border-radius: 50%; margin-right: 10px; object-fit: cover; background: #eee; flex-shrink: 0;}
  .author { font-size: 14px; font-weight: 500; }
  .article-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .article-body { font-size: 15px; line-height: 1.5; white-space: pre-wrap; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  .detail-author { display: flex; align-items: center; margin-bottom: 30px; margin-top: 10px; }
  .avatar-large-detail { width: 44px; height: 44px; border: 2px solid var(--line); border-radius: 50%; margin-right: 12px; object-fit: cover; background: #eee;}
  .detail-author-name { font-size: 16px; font-weight: 600;}
  .detail-content { font-size: 16px; line-height: 1.6; margin-bottom: 40px; white-space: pre-wrap; }
  
  .comments-section { border-top: 2px solid var(--line); padding-top: 20px; margin-bottom: 60px; }
  .comment-item { margin-bottom: 20px; position: relative; }
  .comment-author { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .comment-author-left { display: flex; align-items: center; }
  .comment-box { border: 2px solid var(--line); padding: 16px; font-size: 15px; white-space: pre-wrap; cursor: pointer; transition: background 0.2s;}
  .comment-box:hover { background: #f9f9f9; }
  .btn-del-comment { background: transparent; border: none; font-size: 13px; color: #d32f2f; cursor: pointer; padding: 4px 8px; }
  .btn-del-comment:hover { text-decoration: underline; }

  .owner-actions { display: flex; gap: 12px; margin-bottom: 30px; }
  .btn-outline { flex: 1; padding: 10px; border: 2px solid var(--line); background: transparent; font-size: 15px; font-weight: 600; cursor: pointer; color: var(--text);}
  .btn-outline.danger { color: #d32f2f; border-color: #d32f2f; }

  .comment-input-area { position: fixed; bottom: 0; left: 0; right: 0; padding: 16px 20px; background: var(--bg); border-top: 2px solid var(--line); display: none; justify-content: center; z-index: 10;}
  .comment-input-area.active { display: flex; }
  .comment-input-wrapper { max-width: 720px; width: 100%; display: flex; align-items: center; gap: 10px;}
  .comment-input { flex: 1; border: 2px solid var(--line); padding: 12px 16px; font-size: 15px; outline: none; background: transparent; color: var(--text); }
  .send-btn { width: 44px; height: 44px; border: 2px solid var(--line); border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; background: transparent; flex-shrink: 0; }
  .send-btn svg { width: 20px; height: 20px; stroke: var(--text); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .profile-header { display: flex; flex-direction: column; align-items: center; margin-top: 40px; margin-bottom: 40px; }
  .avatar-large { width: 120px; height: 120px; border: 3px solid var(--line); border-radius: 50%; margin-bottom: 20px; object-fit: cover; cursor: pointer; background: #eee; position: relative;}
  .avatar-large::after { content: '修改'; position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); color: white; font-size: 12px; text-align: center; padding: 4px 0; opacity: 0; transition: 0.2s; border-radius: 0 0 60px 60px;}
  .avatar-large:hover::after { opacity: 1; }
  .profile-name { font-size: 22px; font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; }
  .profile-name:hover { border-bottom-color: var(--line); }
  .section-title { font-size: 18px; font-weight: 600; margin-bottom: 15px; margin-top: 30px;}
  
  .logout-btn { margin-top: 40px; width: 100%; padding: 14px; border: 2px solid var(--line); background: transparent; font-size: 16px; font-weight: 600; color: var(--text); cursor: pointer; }
  .logout-btn:hover { background: #f0f0f0; }

  .input-title { width: 100%; border: none; outline: none; font-size: 20px; font-family: inherit; padding: 20px 0; border-bottom: 2px solid var(--line); margin-bottom: 20px; background: transparent; color: var(--text); font-weight: 600;}
  .input-content { width: 100%; border: none; outline: none; font-size: 18px; font-family: inherit; resize: none; height: 400px; line-height: 1.6; background: transparent; color: var(--text); }
  .input-title::placeholder, .input-content::placeholder { color: var(--muted); }

  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 70px; background: var(--bg); border-top: 2px solid var(--line); display: flex; justify-content: space-around; align-items: center; z-index: 10;}
  .nav-btn { width: 50px; height: 50px; border: 2px solid transparent; border-radius: 50%; background: transparent; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.2s;}
  .nav-btn.active { border-color: var(--line); }
  .nav-btn svg { width: 24px; height: 24px; stroke: var(--text); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none; justify-content: center; align-items: center; z-index: 100; }
  .modal-overlay.active { display: flex; }
  .modal-box { background: var(--bg); border: 3px solid var(--line); padding: 24px; width: 90%; max-width: 360px; text-align: center; }
  .modal-box h3 { font-size: 18px; margin-bottom: 16px; }
  .modal-box p { font-size: 15px; color: var(--muted); margin-bottom: 20px; }
  .modal-box input { width: 100%; border: 2px solid var(--line); padding: 12px; font-size: 16px; outline: none; margin-bottom: 20px; background: transparent;}
  .modal-actions { display: flex; justify-content: center; gap: 12px; }
  .modal-actions button { flex: 1; padding: 10px; border: 2px solid var(--line); background: transparent; font-size: 15px; font-weight: 600; cursor: pointer; }
  .modal-actions button.primary { background: var(--line); color: var(--bg); }

  @media (min-width: 768px) {
    .bottom-nav { display: none !important; }
    .top-nav { display: flex; }
    .content { padding-bottom: 20px; }
  }
</style>
</head>
<body>

  <div class="header" id="header">
    <div class="header-left">
      <div class="back-btn" id="btn-back" onclick="goBack()">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </div>
      <span id="header-title" style="cursor:pointer;" onclick="switchTab('home')">YL BBS</span>
    </div>
    
    <div class="top-nav">
      <div class="top-nav-item" id="top-home" onclick="switchTab('home')">首页</div>
      <div class="top-nav-item" id="top-me" onclick="switchTab('me')">个人中心</div>
    </div>

    <button class="publish-btn" id="btn-publish-action" onclick="publishPost()">发布</button>
  </div>

  <div class="content active" id="view-home"><div class="container" id="home-list"></div></div>

  <div class="content" id="view-me">
    <div class="container">
      <div class="profile-header">
        <img class="avatar-large" id="me-avatar" src="" onclick="changeAvatar()" title="点击修改头像">
        <div class="profile-name" id="me-name" onclick="changeName()">未登录</div>
      </div>
      <div class="section-title">我发布过的文章</div>
      <div id="me-list"></div>
      
      <button class="logout-btn" onclick="logout()">退出登录</button>
    </div>
  </div>

  <div class="content no-nav" id="view-write">
    <div class="container">
      <input type="text" class="input-title" id="write-title" placeholder="请输入标题">
      <textarea class="input-content" id="write-content" placeholder="请输入文本..."></textarea>
    </div>
  </div>

  <div class="content no-nav" id="view-detail">
    <div class="container">
      <div class="detail-author">
        <img class="avatar-large-detail" id="detail-avatar" src="">
        <div class="detail-author-name" id="detail-author"></div>
      </div>
      <div class="detail-content" id="detail-content"></div>
      
      <div class="owner-actions" id="owner-actions" style="display:none;">
        <button class="btn-outline" onclick="editPost()">修改文章</button>
        <button class="btn-outline danger" onclick="deletePost()">删除文章</button>
      </div>

      <div class="comments-section" id="comments-section">
        <div class="section-title">全部评论</div>
        <div id="comments-list"></div>
      </div>
    </div>
  </div>

  <div class="comment-input-area" id="comment-bar">
    <div class="comment-input-wrapper">
      <input type="text" class="comment-input" id="comment-input" placeholder="请输入评论">
      <button class="send-btn" onclick="submitComment()">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  </div>

  <div class="bottom-nav" id="bottom-nav">
    <div class="nav-btn" id="nav-home" onclick="switchTab('home')">
      <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    </div>
    <div class="nav-btn" id="nav-write" onclick="switchTab('write')">
      <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    </div>
    <div class="nav-btn" id="nav-me" onclick="switchTab('me')">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </div>
  </div>

  <div class="modal-overlay" id="modal">
    <div class="modal-box">
      <h3 id="modal-title"></h3>
      <p id="modal-desc"></p>
      <input type="text" id="modal-input" style="display:none;">
      <div class="modal-actions">
        <button onclick="closeModal()">取消</button>
        <button class="primary" id="modal-confirm-btn">确认</button>
      </div>
    </div>
  </div>

<script>
  const API_BASE = ""; 
  const SSO_URL = "https://acss.ylai.website";
  let currentTab = "home";
  let currentArticleId = null;
  let currentArticleAuthor = null;
  let allArticles = [];

  // === 弹窗控制 ===
  let modalCallback = null;
  function showModal(title, desc, isInput, inputValue, callback) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc || "";
    document.getElementById("modal-desc").style.display = desc ? "block" : "none";
    const input = document.getElementById("modal-input");
    if (isInput) { input.style.display = "block"; input.value = inputValue || ""; setTimeout(() => input.focus(), 100); } 
    else { input.style.display = "none"; }
    modalCallback = callback;
    document.getElementById("modal").classList.add("active");
  }
  function closeModal() { document.getElementById("modal").classList.remove("active"); modalCallback = null; }
  document.getElementById("modal-confirm-btn").onclick = () => {
    const val = document.getElementById("modal-input").value;
    if (modalCallback) modalCallback(val);
    closeModal();
  };

  // === 核心修复：登录与用户状态 ===
  // 优先读取你改过的自定义名字，没有才读默认名
  function getUser() { 
    const token = localStorage.getItem("bbs_token");
    if (!token) return null; 
    return localStorage.getItem("bbs_custom_name") || localStorage.getItem("bbs_user") || "匿名用户"; 
  }
  
  function getAvatar() { 
    return localStorage.getItem("bbs_avatar") || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>"; 
  }

  function requireLogin() {
    if (!localStorage.getItem("bbs_token")) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${SSO_URL}?returnUrl=${returnUrl}`; 
      return false;
    }
    return true;
  }

  // 处理从 SSO 登录回来的参数
  function handleSSOCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); 
    const username = urlParams.get('username');
    
    if (token && username) {
      localStorage.setItem("bbs_token", token);
      localStorage.setItem("bbs_user", username);

      // 【终极防御】如果你本地存过自定义名字，那就忽略这次传过来的邮箱
      const customName = localStorage.getItem("bbs_custom_name");
      if (customName) {
        localStorage.setItem("bbs_user", customName);
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  function changeAvatar() {
    if (!requireLogin()) return;
    const input = document.createElement("input"); input.type = "file"; input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
          const size = 150; canvas.width = size; canvas.height = size;
          ctx.drawImage(img, 0, 0, size, size);
          localStorage.setItem("bbs_avatar", canvas.toDataURL("image/jpeg", 0.8));
          updateUI();
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // 核心修复：改名时，同时存入专用变量
  function changeName() {
    if (!requireLogin()) return;
    showModal("修改昵称", "请输入新的用户名", true, getUser(), (newName) => {
      if (newName && newName.trim()) {
        const finalName = newName.trim();
        localStorage.setItem("bbs_user", finalName); 
        localStorage.setItem("bbs_custom_name", finalName); // 防覆盖标记
        updateUI();
      }
    });
  }
  
  function logout() {
    showModal("确认退出", "确定要退出当前账号吗？", false, "", () => {
      // 退出时，删掉 Token 和 显示名，保留自定义名 bbs_custom_name
      localStorage.removeItem("bbs_token");
      localStorage.removeItem("bbs_user");
      
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${SSO_URL}?returnUrl=${returnUrl}`;
    });
  }

  // === 视图切换 ===
  function switchTab(tab, editData = null) {
    if ((tab === 'me' || tab === 'write') && !requireLogin()) return;
    currentTab = tab;
    
    if (tab === 'home') { window.history.pushState({}, "", "/"); }
    else if (tab === 'me') { window.history.pushState({}, "", "/?tab=me"); }

    document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${tab}`).classList.add('active');
    
    const nav = document.getElementById('bottom-nav');
    const commentBar = document.getElementById('comment-bar');
    const btnBack = document.getElementById('btn-back');
    const publishBtn = document.getElementById('btn-publish-action');
    const headerTitle = document.getElementById('header-title');

    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.top-nav-item').forEach(el => el.classList.remove('active'));
    if (tab === 'home') { document.getElementById('nav-home')?.classList.add('active'); document.getElementById('top-home')?.classList.add('active'); }
    if (tab === 'me') { document.getElementById('nav-me')?.classList.add('active'); document.getElementById('top-me')?.classList.add('active'); }

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
      headerTitle.innerText = editData ? "编辑文章" : "YL BBS 发布";
      publishBtn.innerText = editData ? "确认更改" : "发布";
      document.getElementById('write-title').value = editData ? editData.title : "";
      document.getElementById('write-content').value = editData ? editData.content : "";
      publishBtn.onclick = () => editData ? submitEdit(editData.id) : publishPost();
    } else if (tab === 'detail') {
      nav.style.display = "none"; commentBar.classList.add('active'); 
      btnBack.style.display = "block"; publishBtn.style.display = "none";
      headerTitle.innerText = "YL BBS"; 
      loadArticleDetail(currentArticleId);
    }
  }

  function goBack() {
    if (currentTab === 'detail' || currentTab === 'write') switchTab('home');
  }

  // === 数据加载 ===
  async function loadHome() {
    const listBox = document.getElementById("home-list");
    listBox.innerHTML = "<p style='color:#888;text-align:center;margin-top:40px;'>加载中...</p>";
    try {
      const res = await fetch(`${API_BASE}/api/articles`);
      allArticles = await res.json();
      if (allArticles.length === 0) {
        listBox.innerHTML = "<p style='color:#888;text-align:center;margin-top:40px;'>暂无文章，快去发布吧！</p>";
        return;
      }
      listBox.innerHTML = allArticles.map(a => `
        <div class="article-card" onclick="openArticle('${a.id}')">
          <div class="card-header">
            <img class="avatar-small" src="${getAvatar()}">
            <span class="author">${a.author}</span>
          </div>
          <div class="article-title">${a.title}</div>
          <div class="article-body">${a.content}</div>
        </div>
      `).join("");
    } catch (e) { listBox.innerHTML = "<p style='color:red;text-align:center;'>加载失败，请检查网络</p>"; }
  }

  function loadMe() {
    document.getElementById("me-name").innerText = getUser() || "未登录";
    document.getElementById("me-avatar").src = getAvatar();
    const myArticles = allArticles.filter(a => a.author === getUser());
    const listBox = document.getElementById("me-list");
    if (myArticles.length === 0) { listBox.innerHTML = "<p style='color:#888;'>你还没有发布过文章</p>"; return; }
    listBox.innerHTML = myArticles.map(a => `
      <div class="article-card" onclick="openArticle('${a.id}')">
        <div class="card-header">
          <img class="avatar-small" src="${getAvatar()}">
          <span class="author">${a.author}</span>
        </div>
        <div class="article-title">${a.title}</div>
        <div class="article-body">${a.content}</div>
      </div>
    `).join("");
  }

  function openArticle(id) { 
    currentArticleId = id; 
    window.history.pushState({}, "", "/" + id); 
    switchTab('detail'); 
  }

  async function loadArticleDetail(id) {
    const contentBox = document.getElementById('detail-content');
    const authorBox = document.getElementById('detail-author');
    const avatarBox = document.getElementById('detail-avatar');
    const commentsBox = document.getElementById('comments-list');
    const ownerActions = document.getElementById('owner-actions');
    contentBox.innerText = "加载中..."; authorBox.innerText = ""; commentsBox.innerHTML = ""; ownerActions.style.display = "none";
    try {
      const res = await fetch(`${API_BASE}/api/articles/${id}`);
      const data = await res.json();
      if(!data.article) { contentBox.innerText = "文章不存在或已被删除"; return; }
      
      currentArticleAuthor = data.article.author;
      authorBox.innerText = data.article.author;
      avatarBox.src = getAvatar(); 
      contentBox.innerText = data.article.content;
      
      if (data.article.author === getUser()) { ownerActions.style.display = "flex"; }
      document.title = data.article.title + " - YL BBS";

      if (data.comments.length === 0) { 
        commentsBox.innerHTML = "<p style='color:#888;font-size:14px;'>暂无评论，快来抢沙发！</p>"; 
      } else {
        commentsBox.innerHTML = data.comments.map(c => {
          const canDelete = (c.author === getUser() || currentArticleAuthor === getUser());
          const delBtn = canDelete ? `<button class="btn-del-comment" onclick="deleteComment(event, ${c.id})">删除</button>` : '';
          
          return `
          <div class="comment-item">
            <div class="comment-author">
              <div class="comment-author-left">
                <img class="avatar-small" src="${getAvatar()}">
                <span class="author">${c.author}</span>
              </div>
              ${delBtn}
            </div>
            <div class="comment-box" onclick="copyComment(this, '${c.content.replace(/'/g, "\\\\'")}')">${c.content}</div>
          </div>
        `}).join("");
      }
    } catch (e) { contentBox.innerText = "加载失败"; }
  }

  function copyComment(el, text) {
    navigator.clipboard.writeText(text).then(() => {
      const original = el.innerText;
      el.innerText = "已复制!";
      el.style.textAlign = "center";
      setTimeout(() => { el.innerText = original; el.style.textAlign = "left"; }, 1000);
    }).catch(() => {
      showModal("提示", "复制失败，请手动长按选择");
    });
  }

  function deleteComment(e, commentId) {
    e.stopPropagation(); 
    showModal("删除评论", "确定要删除这条评论吗？", false, "", async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comments/${commentId}`, { method: "DELETE" });
        if (res.ok) { loadArticleDetail(currentArticleId); } 
        else { showModal("失败", "删除失败"); }
      } catch (error) { showModal("错误", "网络错误"); }
    });
  }

  // === 发布与修改 ===
  async function publishPost() {
    if (!requireLogin()) return;
    const title = document.getElementById("write-title").value.trim();
    const content = document.getElementById("write-content").value.trim();
    if (!title || !content) return showModal("提示", "标题和内容不能为空！");
    const btn = document.getElementById("btn-publish-action"); btn.innerText = "发布中...";
    try {
      const res = await fetch(`${API_BASE}/api/articles`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author: getUser() })
      });
      if (res.ok) { showModal("成功", "发布成功！", false, "", () => switchTab("home")); } else { showModal("失败", "发布失败"); }
    } catch (e) { showModal("错误", "网络错误"); } 
    finally { btn.innerText = "发布"; }
  }

  function editPost() {
    fetch(`${API_BASE}/api/articles/${currentArticleId}`).then(r => r.json()).then(data => {
      switchTab('write', { id: data.article.id, title: data.article.title, content: data.article.content });
    });
  }

  async function submitEdit(id) {
    const title = document.getElementById("write-title").value.trim();
    const content = document.getElementById("write-content").value.trim();
    if (!title || !content) return showModal("提示", "标题和内容不能为空！");
    const btn = document.getElementById("btn-publish-action"); btn.innerText = "保存中...";
    try {
      const res = await fetch(`${API_BASE}/api/articles/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author: getUser() })
      });
      if (res.ok) { showModal("成功", "修改成功！", false, "", () => switchTab("home")); } else { showModal("失败", "修改失败"); }
    } catch (e) { showModal("错误", "网络错误"); } 
    finally { btn.innerText = "确认更改"; }
  }

  function deletePost() {
    showModal("确认删除", "确定要永久删除这篇文章吗？", false, "", async () => {
      try {
        const res = await fetch(`${API_BASE}/api/articles/${currentArticleId}`, { method: "DELETE" });
        if (res.ok) { showModal("已删除", "文章删除成功", false, "", () => switchTab("home")); }
      } catch (e) { showModal("错误", "删除失败"); }
    });
  }

  async function submitComment() {
    if (!requireLogin()) return;
    const input = document.getElementById("comment-input"); const text = input.value.trim();
    if (!text) return;
    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: currentArticleId, content: text, author: getUser() })
      });
      if (res.ok) { input.value = ""; loadArticleDetail(currentArticleId); }
    } catch (e) { showModal("错误", "评论失败"); }
  }

  function updateUI() {
    document.getElementById("me-name").innerText = getUser() || "未登录";
    document.getElementById("me-avatar").src = getAvatar();
    if (currentTab === 'me') loadMe();
    if (currentTab === 'home') loadHome();
  }

  function initRouter() {
    handleSSOCallback();
    const path = window.location.pathname;
    if (path !== "/" && path !== "/index.html") {
      const id = path.replace("/", "");
      if (/^\d+$/.test(id)) {
        currentArticleId = id; switchTab('detail'); return;
      }
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'me') { switchTab('me'); } else { switchTab('home'); }
  }

  initRouter();
</script>
</body>
</html>
`;

// ==========================================
// 2. 后端 API 逻辑 
// ==========================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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
          const randomId = Math.floor(Date.now() / 1000) + "" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
          await env.DB.prepare("INSERT INTO articles (id, title, content, author) VALUES (?, ?, ?, ?)").bind(randomId, title, content, author).run();
          return new Response(JSON.stringify({ success: true, id: randomId }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "PUT" && url.pathname.startsWith("/api/articles/")) {
          const id = url.pathname.split("/").pop();
          const { title, content, author } = await request.json();
          const exist = await env.DB.prepare("SELECT author FROM articles WHERE id = ?").bind(id).first();
          if (!exist || exist.author !== author) return new Response("无权限", { status: 403, headers: corsHeaders });
          await env.DB.prepare("UPDATE articles SET title = ?, content = ? WHERE id = ?").bind(title, content, id).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "DELETE" && url.pathname.startsWith("/api/articles/")) {
          const id = url.pathname.split("/").pop();
          await env.DB.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (request.method === "POST" && url.pathname === "/api/comments") {
          const { article_id, content, author } = await request.json();
          if (!article_id || !content || !author) return new Response("缺少必要参数", { status: 400, headers: corsHeaders });
          await env.DB.prepare("INSERT INTO comments (article_id, content, author) VALUES (?, ?, ?)").bind(article_id, content, author).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        
        if (request.method === "DELETE" && url.pathname.startsWith("/api/comments/")) {
          const commentId = url.pathname.split("/").pop();
          await env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(commentId).run();
          return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response(HTML_CONTENT, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};