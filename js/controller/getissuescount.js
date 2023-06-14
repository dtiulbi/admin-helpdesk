import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { tukangngerjain } from ".getissues.js";

const nekot = 'Z2hwX2lmVW94RGVyaWdxWDdicXg4RzdFNklMczlQTUtGVTJnaVlZZg==';

const octokit = new Octokit({
  auth: atob(nekot)
});

const issueCount = document.getElementById('issue_count');
const assigneeStatsContainer = document.getElementById('assignee_stats');

async function getIssueCount() {
  try {
    const owner = 'dtiulbi';
    const repo = 'question-ticketing';

    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo
    });

    const issueCounted = response.data.open_issues_count;
    issueCount.textContent = issueCounted;
  } catch (error) {
    console.error('Failed to fetch issue count:', error);
  }
}

async function getAssigneeStats() {
  try {
    const owner = 'dtiulbi';
    const repo = 'question-ticketing';

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      per_page: 100, // Menampilkan maksimal 100 issues
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const issues = response.data;

    // Menghitung jumlah assignees
    const assigneeCount = {};
    issues.forEach((issue) => {
      const assignee = issue.assignee;
      if (assignee) {
        const assigneeLogin = assignee.login; // Perbaikan disini
        if (assigneeCount.hasOwnProperty(assigneeLogin)) {
          assigneeCount[assigneeLogin]++;
        } else {
          assigneeCount[assigneeLogin] = 1;
        }
      }
    });

    const sortedAssignees = Object.entries(assigneeCount).sort((a, b) => b[1] - a[1]);

    assigneeStatsContainer.innerHTML = '';

    sortedAssignees.forEach(([assigneeLogin, count]) => { 
      const assigneeName = tukangngerjain[assigneeLogin];
      const assigneeItem = document.createElement('div');
      assigneeItem.classList.add('assignee-item');
      assigneeItem.innerHTML = `
        <h2 class="self-center mb-1">Penerima Tugas Terbanyak</h2>
        <p class="assignee-name">Nama ${assigneeName} | <span class="assignee-count">Total Tugas: ${count}</span>
        </p>
      `;
      assigneeStatsContainer.appendChild(assigneeItem);
    });
  } catch (error) {
    console.error('Failed to fetch assignee stats:', error);
  }
}

// ini fungsi menghitung semua yang sudah selesai nihhh
const completedCountContainer = document.getElementById('completed_count');
const notcompletedCountContainer = document.getElementById('notcompleted_count');

async function getCompletedCount() {
  try {
    const owner = 'dtiulbi';
    const repo = 'question-ticketing';

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      per_page: 100, // Menampilkan maksimal 100 issues
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const issues = response.data;

    // Menghitung jumlah label "sudah selesai nihhhhh"
    let completedCount = 0;
    issues.forEach((issue) => {
      const labels = issue.labels;
      const isCompleted = labels.some((label) => label.name === 'Sudah Selesai');
      if (isCompleted) {
        completedCount++;
      }
    });

    completedCountContainer.textContent = completedCount;
     // Menghitung jumlah label "Sudah Diproses nihhhhh"
    let notyetcount = 0;
    issues.forEach((issue) => {
      const labels = issue.labels;
      const isnotcompleted = labels.some((label) => label.name === 'Sedang Diproses');
      if (isnotcompleted) {
        notyetcount++;
      }
    });
    notcompletedCountContainer.textContent = notyetcount;

  } catch (error) {
    console.error('Failed to fetch completed count:', error);
  }
}

getCompletedCount();
getAssigneeStats();
getIssueCount();
