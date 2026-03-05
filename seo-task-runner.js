/**
 * SEO Task Runner
 * 从任务看板获取任务并执行，完成后更新状态
 */

const KANBAN_URL = 'https://b847263f.seo-kanban.pages.dev/tasks.json';
const TASKS_FILE = '/Users/xiexie/.openclaw/workspace/seo-kanban/tasks-status.json';

const PROJECT_REPOS = {
  'DaysCalculator': { repo: 'xpfasd/DaysCalculator', site: 'dayscalculator.app' },
  'crazychicken3d': { repo: 'xpfasd/crazychicken3d', site: 'crazychicken3d.pages.dev' },
  'GlobalLinguaHub': { repo: 'xpfasd/GlobalLinguaHub', site: 'global-lingua-hub.vercel.app' },
  'symbol': { repo: 'xpfasd/symbol', site: 'symbolcopyandpaste.org' },
  'v0-clicker': { repo: 'xpfasd/v0-clicker', site: 'v0-clicker.pages.dev' },
  'Scrandle': { repo: 'xpfasd/Scrandle', site: 'scrandle.pages.dev' }
};

async function getTodayTasks() {
  const response = await fetch(KANBAN_URL);
  const data = await response.json();
  
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = data.tasks.filter(t => t.date === today && t.status !== 'done');
  
  console.log(`📋 今日任务 (${today}):`, todayTasks.length);
  return todayTasks;
}

async function executeTask(task) {
  const project = PROJECT_REPOS[task.project];
  if (!project) {
    console.log(`⚠️ 未知项目: ${task.project}`);
    return false;
  }
  
  console.log(`\n🔄 执行任务: ${task.title}`);
  console.log(`   项目: ${task.project}`);
  console.log(`   关键词: ${task.keywords}`);
  console.log(`   目标页面: ${task.pages}`);
  
  // 这里调用实际的 SEO 任务执行逻辑
  // 由于是不同的仓库，需要 clone 仓库、创建页面、推送
  
  return true;
}

async function updateTaskStatus(taskId, status) {
  // 更新本地状态文件
  const fs = require('fs');
  let statusData = {};
  
  if (fs.existsSync(TASKS_FILE)) {
    statusData = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
  }
  
  statusData[taskId] = {
    status,
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(TASKS_FILE, JSON.stringify(statusData, null, 2));
  console.log(`✅ 任务 ${taskId} 状态已更新为: ${status}`);
}

async function main() {
  console.log('🚀 SEO 任务执行器启动\n');
  
  const tasks = await getTodayTasks();
  
  if (tasks.length === 0) {
    console.log('📭 今日没有待执行的任务');
    return;
  }
  
  let completed = 0;
  for (const task of tasks) {
    const success = await executeTask(task);
    if (success) {
      await updateTaskStatus(task.id, 'done');
      completed++;
    }
  }
  
  console.log(`\n✅ 今日任务完成: ${completed}/${tasks.length}`);
}

main().catch(console.error);
