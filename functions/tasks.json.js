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
    {
      id: "task-1",
      title: "DaysCalculator: 创建日期计算器新页面",
      project: "DaysCalculator",
      date: today.toISOString().split('T')[0],
      status: "in_progress",
      keywords: "business day calculator, working days between dates",
      pages: "business-days-calculator.html",
      desc: "研究并创建工作日计算器页面，优化相关长尾关键词"
    },
    {
      id: "task-2", 
      title: "crazychicken3d: 添加新游戏攻略页面",
      project: "crazychicken3d",
      date: new Date(today.getTime() + 86400000).toISOString().split('T')[0],
      status: "todo",
      keywords: "3d chicken game tips, crazy chicken strategy guide",
      pages: "advanced-strategies.html",
      desc: "创建高级游戏策略指南页面"
    },
    {
      id: "task-3",
      title: "GlobalLinguaHub: 英语学习新页面",
      project: "GlobalLinguaHub",
      date: new Date(today.getTime() + 172800000).toISOString().split('T')[0],
      status: "todo",
      keywords: "english vocabulary apps, vocabulary learning tools",
      pages: "vocabulary-apps.html",
      desc: "创建英语词汇学习应用推荐页面"
    }
  ];
  
  return tasks;
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
