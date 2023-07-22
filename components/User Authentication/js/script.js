const firebaseConfig = {
    apiKey: "AIzaSyDHfULZxXT_Rl0JVJT8vw_TpWjHVZoRfeA",
    authDomain: "user-auth---js.firebaseapp.com",
    projectId: "user-auth---js",
    storageBucket: "user-auth---js.appspot.com",
    messagingSenderId: "251885986994",
    appId: "1:251885986994:web:88eb6b4b054f68199055ab",
    measurementId: "G-FN9HPQL70K"
};
firebase.initializeApp(firebaseConfig);

function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        backgroundColor: type === 'error' ? "#ff4444" : "#00C851",
        gravity: "top",
        position: "right",
        className: `toastify toastify-${type} animate__animated animate__bounceInRight`,
    }).showToast();
}


function signup() {
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            showToast('Signup successful! Please log in.', 'success');
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
        })
        .catch(function (error) {
            console.error(error);
            showToast('Signup failed. Please try again.', 'error');
        });
}

function login() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            var user = userCredential.user;
            displayProfile(user.email);
            switchForms('loginForm', 'profile');
            document.getElementById('signupForm').style.display = 'none';
        })
        .catch(function (error) {
            console.error(error);
            showToast('Login failed. Please try again.', 'error');
        });
}

function logout() {
    firebase.auth().signOut()
        .then(function () {
            switchForms('profile', 'loginForm');
            document.getElementById('signupForm').style.display = 'block';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
        })
        .catch(function (error) {
            console.error(error);
        });
}

function displayProfile(email) {
    document.getElementById('userEmail').textContent = email;
}

function switchForms(fromFormId, toFormId) {
    document.getElementById(fromFormId).style.display = 'none';
    document.getElementById(toFormId).style.display = 'block';
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        displayProfile(user.email);
        switchForms('loginForm', 'profile');
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('auth-rules').style.display = 'none';
    } else {
        if (document.getElementById('loginForm').style.display !== 'block') {
            switchForms('profile', 'loginForm');
            document.getElementById('signupForm').style.display = 'block';
        }
    }
});

// Go Back
function goBack() {
    history.back();
}