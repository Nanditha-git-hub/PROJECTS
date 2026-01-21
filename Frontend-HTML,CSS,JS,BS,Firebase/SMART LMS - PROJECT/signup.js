// import { authentication, db } from "./fbconfig.js";
// import { createUserWithEmailAndPassword, updateProfile} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// document.addEventListener("DOMContentLoaded", () => {
//     let signupForm = document.getElementById("signupform");

//     signupForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         let name = document.getElementById("name").value.trim();
//         let email = document.getElementById("email").value.trim();
//         let password = document.getElementById("password").value;
//         let role = document.getElementById("role").value;

//         try {
//             const userCredentials = await createUserWithEmailAndPassword(authentication, email, password);  //usercredential lo kotha user profile motham untadi, console chesthy manaki object laga osthadhi  
//             console.log("✅ User Created:", userCredentials);

//             const userDetails=userCredentials.user; //profile
//             console.log(userDetails)

//             await updateProfile(userDetails,{    //useraccount-useraccount lo diplay name undhi, dhani input place tho name ni add cheshinam
//                 displayName:name,
//             })

        

//             await setDoc(doc(db, `${role}s`, name), {
//                 name,
//                 email,
//                 role
//             });

//             Swal.fire({
//                 title: "Good job!",
//                 text: `Your ${role} account was created successfully!`,
//                 icon: "success",
//                 confirmButtonColor: "#a26eff"
//             }).then(() => {
//                 location.href = "./login.html";
//             });

//         } catch (error) {
//             console.error("❌ Firebase Error:", error);

//             if (error.code === "auth/email-already-in-use") {
//                 Swal.fire({
//                     title: "Oops!",
//                     text: "This email is already registered. Please use a different email or log in.",
//                     icon: "error",
//                     confirmButtonColor: "#a26eff"
//                 });
//             } else if (error.code === "auth/weak-password") {
//                 Swal.fire({
//                     title: "Weak Password!",
//                     text: "Password should be at least 6 characters.",
//                     icon: "warning",
//                     confirmButtonColor: "#a26eff"
//                 });
//             } else {
//                 Swal.fire({
//                     title: "Error!",
//                     text: "Something went wrong: " + error.message,
//                     icon: "error",
//                     confirmButtonColor: "#a26eff"
//                 });
//             }
//         }
//     });
// });



import { authentication, db } from "./fbconfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupform");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        try {
            const userCredentials = await createUserWithEmailAndPassword(authentication, email, password);
            const user = userCredentials.user;

            // ✅ Set display name properly
            await updateProfile(user, {
                displayName: name
            });

            // ✅ Save Firestore doc using name as document ID
            await setDoc(doc(db, `${role}s`, user.uid), {
                name,
                email,
                role,
                uid: user.uid
            });

            Swal.fire({
                title: "Good job!",
                text: `Your ${role} account was created successfully!`,
                icon: "success",
                confirmButtonColor: "#a26eff"
            }).then(() => {
                location.href = "./login.html";
            });

        } catch (error) {
            console.error("❌ Firebase Error:", error);

            let message = "Something went wrong: " + error.message;
            let icon = "error";

            if (error.code === "auth/email-already-in-use") {
                message = "This email is already registered. Please use a different email or log in.";
            } else if (error.code === "auth/weak-password") {
                message = "Password should be at least 6 characters.";
                icon = "warning";
            }

            Swal.fire({
                title: "Error!",
                text: message,
                icon,
                confirmButtonColor: "#a26eff"
            });
        }
    });
});




















