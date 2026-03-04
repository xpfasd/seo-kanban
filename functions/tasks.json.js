// Cloudflare Pages Function for /tasks.json
export async function onRequestGet(context) {
  const today = new Date();
  
  // 从 localStorage 读取任务 (在 Edge 环境下不可用，这里返回默认任务)
  // 实际部署时可以使用 Cloudflare KV 存储
  
  const defaultTasks = generateDefaultTasks(today);
  
  const response = {
    version: "1.0",
    description: "SEO Tasks JSON API",
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
  const tasks = [];
  const projects = ['DaysCalculator', 'crazychicken3d', 'GlobalLinguaHub', 'symbol', 'v0-clicker'];
  
  // 生成今天和未来7天的任务
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    if (i < 3) {
      tasks.push({
        id: `task-${i + 1}`,
        title: `为 ${projects[i]} 添加新 SEO 页面`,
        project: projects[i],
        date: dateStr,
        status: i === 0 ? "in_progress" : "todo",
        action: "create_page",
        details: `为 ${projects[i]} 项目创建一个新的 SEO 优化页面`
      });
    }
  }
  
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
