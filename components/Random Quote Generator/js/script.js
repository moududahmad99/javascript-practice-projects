const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier. -Mother Teresa",
    "When you reach the end of your rope, tie a knot in it and hang on. -Franklin D. Roosevelt",
    "Always remember that you are absolutely unique. Just like everyone else. -Margaret Mead",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn. -Benjamin Franklin"
];


function generatingQuotes () {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    document.getElementById('quote').textContent = quotes[randomIndex]
}

const quoteUpdate = document.getElementById('clickOnChange');
quoteUpdate.addEventListener('click', generatingQuotes)

generatingQuotes()