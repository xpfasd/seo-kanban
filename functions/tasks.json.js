// Cloudflare Pages Function for /tasks.json
export async function onRequestGet(context) {
  const today = new Date();
  
  // 从 localStorage 读取任务 (在 Edge 环境下不可用，这里返回默认任务)
  // 实际部署时可以使用 Cloudflare KV 存储
  
  const defaultTasks = generateDefaultTasks(today);
  
  const response = {
    version: "1.0",
    description: "SEO Tasks JSON API - 包含详细关键词和目标页面",
    generated_at: today.toISOString(),
    tasks: defaultTasks,
    projects: {
      "DaysCalculator": {
        "github": "xpfasd/DaysCalculator",
        "site": "https://dayscalculator.app/",
        "seo_target": 10,
        "seo_done": 8
      },
      "crazychicken3d": {
        "github": "xpfasd/crazychicken3d",
        "site": "https://crazychicken3d.pages.dev/",
        "seo_target": 10,
        "seo_done": 6
      },
      "GlobalLinguaHub": {
        "github": "xpfasd/GlobalLinguaHub",
        "site": "https://global-lingua-hub.vercel.app/",
        "seo_target": 10,
        "seo_done": 6
      },
      "symbol": {
        "github": "xpfasd/symbol",
        "site": "https://symbolcopyandpaste.org/",
        "seo_target": 5,
        "seo_done": 3
      },
      "v0-clicker": {
        "github": "xpfasd/v0-clicker",
        "site": null,
        "seo_target": 5,
        "seo_done": 3
      }
    }
  };
  
  return new Response(JSON.stringify(response, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

function generateDefaultTasks(today) {
  const tasks = [
    // Day 1 - 3 tasks
    { project: "DaysCalculator", keywords: "date duration calculator, days between dates", pages: "date-duration.html", desc: "日期间隔时长计算页面" },
    { project: "crazychicken3d", keywords: "popular io games, multiplayer browser games", pages: "io-games-collection.html", desc: "嵌入热门IO游戏集合" },
    { project: "GlobalLinguaHub", keywords: "language exchange apps, tandem language", pages: "language-exchange.html", desc: "语言交换应用推荐" },
    // Day 2 - 2 tasks
    { project: "symbol", keywords: "arrow symbols copy paste, unicode arrows", pages: "arrow-symbols.html", desc: "箭头符号页面" },
    { project: "v0-clicker", keywords: "typing practice games, improve typing speed", pages: "typing-games.html", desc: "打字练习游戏页面" },
    // Day 3 - 3 tasks
    { project: "DaysCalculator", keywords: "time zone converter, timezone calculator", pages: "timezone-calculator.html", desc: "时区转换计算器" },
    { project: "crazychicken3d", keywords: "puzzle games embed, browser puzzle", pages: "puzzle-games.html", desc: "嵌入热门益智小游戏" },
    { project: "GlobalLinguaHub", keywords: "podcast learning english, listen english", pages: "english-podcasts.html", desc: "英语播客推荐" },
  ];
  
  const result = [];
  for (let i = 0; i < tasks.length; i++) {
    const dayIndex = i; // 每天都有任务
    const date = new Date(today);
    date.setDate(date.getDate() + dayIndex);
    
    result.push({
      id: `task-${i + 1}`,
      title: `${tasks[i].project}: ${tasks[i].desc}`,
      project: tasks[i].project,
      date: date.toISOString().split('T')[0],
      status: i < 3 ? "in_progress" : "todo",
      keywords: tasks[i].keywords,
      pages: tasks[i].pages,
      desc: tasks[i].desc
    });
  }
  
  return result;
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
