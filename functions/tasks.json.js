// Cloudflare Pages Function for /tasks.json
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/xpfasd/seo-kanban/main/data/completed.json";

async function getCompletedTasks() {
  try {
    const response = await fetch(GITHUB_RAW_URL);
    if (response.ok) {
      const data = await response.json();
      return data.completed || [];
    }
  } catch (e) {
    console.log('Could not fetch completed tasks:', e.message);
  }
  return [];
}

export async function onRequestGet(context) {
  const today = new Date();
  
  // 获取已完成的任务ID
  const completedIds = await getCompletedTasks();
  
  const defaultTasks = generateDefaultTasks(today);
  
  // 标记已完成的任务
  const tasksWithStatus = defaultTasks.map(task => ({
    ...task,
    status: completedIds.includes(task.id) ? "done" : task.status
  }));
  
  const response = {
    version: "1.0",
    description: "SEO Tasks JSON API - 包含详细关键词和目标页面",
    generated_at: today.toISOString(),
    tasks: tasksWithStatus,
    projects: {
      "DaysCalculator": {
        "github": "xpfasd/DaysCalculator",
        "site": "https://dayscalculator.app/",
        "seo_target": 10,
        "seo_done": 8
      },
      "crazychicken3d": {
        "github": "xpfasd/CrazyChickenLanding",
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
  const PROJECT_TASKS = {
    'DaysCalculator': [
      { keywords: "date duration calculator, days between dates", page: "date-duration.html", desc: "日期间隔时长计算" },
      { keywords: "time zone converter, timezone calculator", page: "timezone-calculator.html", desc: "时区转换计算" },
      { keywords: "countdown timer, event countdown", page: "event-countdown.html", desc: "活动倒计时" },
      { keywords: "birthday calculator, age from birthday", page: "birthday-calculator.html", desc: "生日年龄计算" }
    ],
    'crazychicken3d': [
      { keywords: "popular io games, multiplayer browser games", page: "io-games.html", desc: "热门IO游戏" },
      { keywords: "puzzle games embed, browser puzzle", page: "puzzle-games.html", desc: "益智小游戏" },
      { keywords: "action games embed, browser action", page: "action-games.html", desc: "动作小游戏" },
      { keywords: "arcade games online, retro games", page: "arcade-games.html", desc: "经典街机游戏" }
    ],
    'GlobalLinguaHub': [
      { keywords: "google gemini cli tutorial, gemini command line", page: "gemini-cli-tutorial.html", desc: "Gemini CLI 教程" },
      { keywords: "google cli tools, google command line", page: "google-cli-tools.html", desc: "Google CLI 工具" },
      { keywords: "ai coding assistant, ai programmer", page: "ai-coding-assistant.html", desc: "AI 编程助手" },
      { keywords: "claude code vs github copilot, ai code completion", page: "ai-code-comparison.html", desc: "AI 代码工具对比" }
    ],
    'symbol': [
      { keywords: "arrow symbols copy paste, unicode arrows", page: "arrow-symbols.html", desc: "箭头符号" },
      { keywords: "math symbols copy, mathematical notation", page: "math-symbols.html", desc: "数学符号" },
      { keywords: "emoji meanings, what does emoji mean", page: "emoji-dictionary.html", desc: "Emoji含义" },
      { keywords: "heart symbols copy, love emojis", page: "heart-symbols.html", desc: "爱心符号" }
    ],
    'v0-clicker': [
      { keywords: "typing practice games, improve typing speed", page: "typing-games.html", desc: "打字练习游戏" },
      { keywords: "keyboard shortcuts, keyboard tips", page: "keyboard-shortcuts.html", desc: "键盘快捷键" },
      { keywords: "typing test wpm, measure typing speed", page: "typing-speed-test.html", desc: "打字速度测试" },
      { keywords: "mechanical keyboard, keyboard review", page: "mechanical-keyboards.html", desc: "机械键盘" }
    ],
    'Scrandle': [
      { keywords: "word game, scrabble alternative", page: "word-game.html", desc: "单词游戏" },
      { keywords: "puzzle word game, letter game", page: "letter-puzzle.html", desc: "字母解谜游戏" },
      { keywords: "multiplayer word game, online scrabble", page: "multiplayer-word.html", desc: "多人单词游戏" },
      { keywords: "word search puzzles, find words", page: "word-search.html", desc: "找单词游戏" }
    ],
    '其他1': [
      { keywords: "tool website, online utilities", page: "tools-collection.html", desc: "工具集合" },
      { keywords: "productivity tools, online software", page: "productivity-apps.html", desc: "效率工具" },
      { keywords: "free online tools, useful websites", page: "free-tools.html", desc: "免费工具" },
      { keywords: "best online tools, web utilities", page: "best-tools.html", desc: "最佳工具" }
    ],
    '其他2': [
      { keywords: "trending games 2026, popular games", page: "trending-games.html", desc: "热门游戏" },
      { keywords: "browser games, no download games", page: "browser-games.html", desc: "网页游戏" },
      { keywords: "free games online, play free", page: "free-games.html", desc: "免费游戏" },
      { keywords: "mobile games, app games", page: "mobile-games.html", desc: "手机游戏" }
    ]
  };
  
  const projectsList = Object.keys(PROJECT_TASKS);
  const tasksPerDay = 4;
  const cycleLength = 2;
  
  const result = [];
  let taskId = 1;
  let currentDay = 0;
  
  while (result.length < 20) {
    const cycleDay = currentDay % cycleLength;
    const startIdx = cycleDay * tasksPerDay;
    let addedToday = 0;
    
    for (let i = 0; i < tasksPerDay; i++) {
      const projIdx = startIdx + i;
      if (projIdx >= projectsList.length) break;
      
      const project = projectsList[projIdx];
      const projectTaskList = PROJECT_TASKS[project];
      const taskIdx = Math.floor(currentDay / cycleLength) % projectTaskList.length;
      const taskInfo = projectTaskList[taskIdx];
      
      const date = new Date(today);
      date.setDate(date.getDate() + currentDay);
      
      result.push({
        id: `task-${taskId++}`,
        title: `${project}: ${taskInfo.desc}`,
        project: project,
        date: date.toISOString().split('T')[0],
        status: currentDay === 0 ? "in_progress" : "todo",
        keywords: taskInfo.keywords,
        pages: taskInfo.page,
        desc: taskInfo.desc
      });
      addedToday++;
    }
    
    if (addedToday === 0) break;
    currentDay++;
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
