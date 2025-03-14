
let quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Do what you can, with what you have, where you are.",
    "Happiness depends upon ourselves.",
    "Opportunities don't happen, you create them.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "The best way to predict the future is to create it.",
    "Everything you’ve ever wanted is on the other side of fear.",
    "Act as if what you do makes a difference. It does.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    "It always seems impossible until it’s done.",
    "Believe you can and you’re halfway there.",
    "Don’t let yesterday take up too much of today.",
    "Quality means doing it right when no one is looking.",
    "Failure is simply the opportunity to begin again, this time more intelligently.",
    "Only I can change my life. No one can do it for me."
];

function showRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").innerText = quotes[randomIndex];
}
