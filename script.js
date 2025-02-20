document.addEventListener("DOMContentLoaded", function () {
    // المتغيرات العامة
    const darkModeButton = document.getElementById("toggle-dark-mode");
    const commentForm = document.getElementById("commentForm");
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const commentsContainer = document.getElementById("comments-container");
    const commentCount = document.getElementById("comment-count");
    const loginButton = document.getElementById("login-button");
    const loginPopup = document.getElementById("loginPopup");
    const closePopup = document.getElementById("closePopup");
    const submitLogin = document.getElementById("submitLogin");

    // ✅ تفعيل الوضع الداكن
    darkModeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // ✅ تحميل التعليقات المخزنة
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    function updateCommentsUI() {
        commentsContainer.innerHTML = "";
        comments.forEach((comment, index) => {
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");
            commentBox.innerHTML = `
                <strong>${comment.name}</strong>: ${comment.text}
                <div class="comment-actions">
                    <button class="edit-btn" data-index="${index}">تعديل</button>
                    <button class="delete-btn" data-index="${index}">حذف</button>
                </div>
            `;
            commentsContainer.appendChild(commentBox);
        });

        commentCount.textContent = `(${comments.length})`;
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    // ✅ إضافة تعليق جديد
    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const commentText = commentInput.value.trim();

        if (name === "" || commentText === "") {
            alert("يرجى إدخال الاسم والتعليق!");
            return;
        }

        comments.push({ name, text: commentText });
        updateCommentsUI();
        nameInput.value = "";
        commentInput.value = "";
    });

    // ✅ تعديل أو حذف التعليقات باستخدام تفويض الأحداث
    commentsContainer.addEventListener("click", function (event) {
        const index = event.target.dataset.index;
        if (event.target.classList.contains("delete-btn")) {
            comments.splice(index, 1);
            updateCommentsUI();
        } else if (event.target.classList.contains("edit-btn")) {
            const newComment = prompt("قم بتعديل تعليقك:", comments[index].text);
            if (newComment !== null) {
                comments[index].text = newComment;
                updateCommentsUI();
            }
        }
    });

    // ✅ عرض وإخفاء نافذة تسجيل الدخول
    loginButton.addEventListener("click", function () {
        loginPopup.classList.remove("hidden");
    });

    closePopup.addEventListener("click", function () {
        loginPopup.classList.add("hidden");
    });

    // ✅ تسجيل الدخول
    submitLogin.addEventListener("click", function () {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("يرجى إدخال اسم المستخدم وكلمة المرور!");
            return;
        }

        alert(`تم تسجيل الدخول بنجاح! مرحبًا، ${username}!`);
        loginPopup.classList.add("hidden");
    });

    // ✅ إغلاق النافذة عند النقر خارجها
    window.addEventListener("click", function (event) {
        if (event.target === loginPopup) {
            loginPopup.classList.add("hidden");
        }
    });

    // ✅ تحديث التعليقات عند التحميل
    updateCommentsUI();
});
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    const loginPopup = document.getElementById("loginPopup");
    const closePopup = document.getElementById("closePopup");
    const overlay = document.createElement("div");

    // إضافة طبقة شفافة خلف النافذة
    overlay.classList.add("popup-overlay");
    document.body.appendChild(overlay);

    loginButton.addEventListener("click", function () {
        loginPopup.classList.remove("hidden");
        overlay.style.display = "block";
    });

    closePopup.addEventListener("click", function () {
        loginPopup.classList.add("hidden");
        overlay.style.display = "none";
    });

    // إغلاق النافذة عند الضغط على الخلفية الشفافة
    overlay.addEventListener("click", function () {
        loginPopup.classList.add("hidden");
        overlay.style.display = "none";
    });
});
