// import { db } from "./fbconfig.js";
// import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { db } from "./fbconfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  let loggedinStudent = JSON.parse(localStorage.getItem("studentcredentials"));
  console.log(loggedinStudent)

  let studentName = document.getElementById("studentName");
  studentName.innerHTML = loggedinStudent.nameStudent;
});


async function fetchFiles(subject) {
  const filesCol = collection(db, "subjects", subject, "files");
  const filesSnap = await getDocs(filesCol);
  const files = [];
  filesSnap.forEach(doc => files.push(doc.data()));
  return files;
}

// Example usage for Mathematics

window.viewNotes = async function(subject) {
  const filesList = await fetchFiles(subject);
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  filesList.forEach(file => {
    if (file.materialType === "Notes" && file.link) {
      notesList.innerHTML += `<a href="${file.link}" target="_blank">Google Drive Link</a><br>`;
    }
  });
  const notesModal = new bootstrap.Modal(document.getElementById('notesModal'));
  notesModal.show();
};

window.viewQuestions = async function(subject) {
  const filesList = await fetchFiles(subject);
  const questionsList = document.getElementById("questionsList");
  questionsList.innerHTML = "";
  filesList.forEach(file => {
    if (file.materialType === "Important Questions" && file.link) {
      questionsList.innerHTML += `<a href="${file.link}" target="_blank">Google Drive Link</a><br>`;
    }
  });
  const questionsModal = new bootstrap.Modal(document.getElementById('questionsModal'));
  questionsModal.show();
};


 document.getElementById("logoutLink").addEventListener("click", () => {
  localStorage.removeItem("studentcredentials");
  window.location.href = "login.html";})