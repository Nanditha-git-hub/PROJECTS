import { db } from "./fbconfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const storage = getStorage();

document.addEventListener("DOMContentLoaded", () => {
  let loggedinTeacher = JSON.parse(localStorage.getItem("teachercredentials"));
  // console.log(loggedinTeacher)
  let teacherNameElement  = document.getElementById("teacherName");
  teacherNameElement.innerHTML = loggedinTeacher.nameTeacher;
  // teacherNameElement.innerHTML = loggedinTeacher?.name|| "Teacher";
  
});

document.getElementById("logoutLink").addEventListener("click", () => {
  localStorage.removeItem("teachercredentials");
  window.location.href = "login.html";
});

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = document.getElementById("subjectSelect").value;
  const materialType = document.getElementById("materialType").value;
  const driveLink = document.getElementById("driveLink").value.trim();
  if (!subject || !materialType || !driveLink) {
    alert("Please fill all fields.");
    return;
  }

  // Save Drive link in Firestore
  await addDoc(collection(db, "subjects", subject, "files"), {
    link: driveLink,
    materialType,
    uploadedBy: "teacher"
  });

  alert("Drive link saved and visible to students!");
});

