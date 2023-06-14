import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { createLabelButton } from "./createlabel.js";
import { getLabelColor } from "./randomlabel.js"


const nekot = 'Z2hwX2lmVW94RGVyaWdxWDdicXg4RzdFNklMczlQTUtGVTJnaVlZZg==';

const octokit = new Octokit({
  auth: atob(nekot)
});

const perPage = 7; // Jumlah data per halaman
let currentPage = 1; // Halaman saat ini
let totalPages = 0; // Jumlah total halaman

const issueTable = document.getElementById('issue_table'); // Ambil elemen tabel
const tbody = document.getElementById('issue_body'); // Ambil elemen tbody
const prevButton = document.getElementById('prev_button'); // Tombol halaman sebelumnya
const nextButton = document.getElementById('next_button'); // Tombol halaman berikutnya


prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getIssues();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    getIssues();
  }
});

async function getIssues() {
  try {
    const owner = 'dtiulbi';
    const repo = 'question-ticketing';

    tbody.innerHTML = '';

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      per_page: perPage,
      page: currentPage,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const issues = response.data;
    totalPages = Math.ceil(response.headers['link'] ? response.headers['link'].match(/page=(\d+)>; rel="last"/)[1] : 1);

    
    issues.forEach((issue) => {
      const row = document.createElement('tr');

      const titleCell = document.createElement('td');
      titleCell.textContent = issue.title;
      row.appendChild(titleCell);

      const assigneeCell = document.createElement('td');
      assigneeCell.textContent = getFormattedAssignee(issue.assignee);
      row.appendChild(assigneeCell);

      const sinceCell = document.createElement('td');
      const date = new Date(issue.since || issue.created_at); 
      
      const formattedDate = formatDate(date); 
      sinceCell.textContent = formattedDate;      
      row.appendChild(sinceCell);

      const labelsCell = document.createElement('td');
      issue.labels.forEach((label) => {
        const labelButton = createLabelButton(label.name);
        const labelStyle = getLabelColor(label.name);
        labelButton.style.margin = labelStyle.margin;
        labelsCell.appendChild(labelButton);
      });
      row.appendChild(labelsCell);

      tbody.appendChild(row);
    });

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    document.getElementById('current_page').textContent = currentPage;
    document.getElementById('total_pages').textContent = totalPages;
  } catch (error) {
    console.error('Failed to fetch issues:', error);
  }
}




  
  function getFormattedAssignee(assignee) {
    if (assignee && tukangngerjain.hasOwnProperty(assignee.login)) {
      return tukangngerjain[assignee.login];
    } else {
      return assignee ? assignee.login : 'Tidak Ada Penerima Tugas';
    }
  }

  export const tukangngerjain = {
    "valenrio66": "Valen Rionald",
    "christyuda": "Christian Yuda Pratama",
    "Bachtiar21": "Bachtiar Ramadhan",
    "rofinafiin": "Rofi Nafiis Zain",
    "jpratama7": "Jose Chasey Pratama",
    

  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }
  
  getIssues();
