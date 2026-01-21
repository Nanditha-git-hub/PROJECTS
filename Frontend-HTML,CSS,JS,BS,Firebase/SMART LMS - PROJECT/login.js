// import { authentication, db} from "./fbconfig.js";
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// import {getDoc,doc} from "htafttps://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// document.addEventListener("DOMContentLoaded", () => {
//   let loginform = document.getElementById("loginform");

//   loginform.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value;
//     let role = document.getElementById("role").value;

//     try {
//       const userSignedIn = await signInWithEmailAndPassword(authentication, email, password);
//       console.log("✅ Login Success:", userSignedIn);

//       const userdocref = doc(db,`${role}s`,userSignedIn.user.displayName) //ekkada we have just selected a person
//       const finalDocRef = await getDoc(userdocref) //it will get the doc from the reference , //paina select cheskuna person ni get  cheyli so  method - getdoc it will get doc from fb based on reference , earnlier we have stored userdoc ref so from that
//       if(finalDocRef.exists()){
//         alert("doc found in fb")
//       }else{
//         alert("doc not found")
//       }
//       console.log("✅ Login Success:", userSignedIn);

//       // console.log(finalDocRef)

//       Swal.fire({
//         title: "Welcome!",
//         text: `${role} logged in successfully!`,
//         icon: "success",
//         confirmButtonColor: "#a26eff"
//       }).then(() => {
//         location.href = `${role}dashboard.html`;
//       });

//     } catch (error) {
//       console.error("❌ Login Error:", error);

//       if (error.code === "auth/user-not-found") {
//         Swal.fire({
//           title: "User Not Found!",
//           text: "No account found with this email. Please sign up.",
//           icon: "error",
//           confirmButtonColor: "#a26eff"
//         });
//       } else if (error.code === "auth/wrong-password") {
//         Swal.fire({
//           title: "Incorrect Password!",
//           text: "The password you entered is incorrect.",
//           icon: "error",
//           confirmButtonColor: "#a26eff"
//         });
//       } else if (error.code === "auth/invalid-email") {
//         Swal.fire({
//           title: "Invalid Email!",
//           text: "Please enter a valid email address.",
//           icon: "warning",
//           confirmButtonColor: "#a26eff"
//         });
//       } else {
//         Swal.fire({
//           title: "Login Failed!",
//           text: "Something went wrong: " + error.message,
//           icon: "error",
//           confirmButtonColor: "#a26eff"
//         });
//       }
//     }
//   });
// });

import { authentication, db } from "./fbconfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginform");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const userSignedIn = await signInWithEmailAndPassword(authentication, email, password);
      const user = userSignedIn.user;
      const uid = user.uid;
      const name = user.displayName;
      // Get Firestore doc using uid
      const userDocRef = doc(db, `${role}s`, uid);
      const finalDoc = await getDoc(userDocRef);

      if (finalDoc.exists()) {
        alert("✅ Doc found in Firestore");

        Swal.fire({
          title: "Welcome!",
          text: `${role} logged in successfully!`,
          icon: "success",
          confirmButtonColor: "#a26eff"
        }).then(() => {
          location.href = `${role}dashboardhome.html`;

          // Store credentials in localStorage
          if (role === "student") {
            localStorage.setItem("studentcredentials", JSON.stringify({
              email,
              role,
              nameStudent: name,
              uid
            }));
          } else if (role === "teacher") {
            localStorage.setItem("teachercredentials", JSON.stringify({
              email,
              role,
              nameTeacher: name,
              uid
            }));
          }
        });
      } else {
        alert("❌ Doc not found in Firestore");
        Swal.fire({
          title: "Not Registered in Firestore!",
          text: `We couldn't find your ${role} record. Please contact admin or register again.`,
          icon: "error",
          confirmButtonColor: "#a26eff"
        });
      }

    } catch (error) {
      console.error("❌ Login Error:", error);

      let message = "Something went wrong: " + error.message;
      let icon = "error";

      if (error.code === "auth/user-not-found") {
        message = "No account found with this email. Please sign up.";
      } else if (error.code === "auth/wrong-password") {
        message = "The password you entered is incorrect.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
        icon = "warning";
      }

      Swal.fire({
        title: "Login Failed!",
        text: message,
        icon,
        confirmButtonColor: "#a26eff"
      });
    }
  });
});
