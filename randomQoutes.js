let quotes = [
    {
        a1: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        b1: "Do what you can, with what you have, where you are.",
        c1: "Happiness depends upon ourselves.",
        nestedQuotes1: {  
            a1: "Opportunities don't happen, you create them.",
            b1: "Don’t watch the clock; do what it does. Keep going.",
            c1: "The secret of getting ahead is getting started.",
            nestedQuotes1: {  
                a1: "The best way to predict the future is to create it.",
                b1: "Everything you’ve ever wanted is on the other side of fear.",
                c1: "Act as if what you do makes a difference. It does."
            }, 
            nestedQuotes2: {  
                a1: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
                b1: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
                c1: "We may encounter many defeats but we must not be defeated."
            }, 
        },    
        nestedQuotes2: {  
            a2: "It always seems impossible until it’s done.",
            b2: "Believe you can and you’re halfway there.",
            c2: "Don’t let yesterday take up too much of today.",
            nestedQuotes1: {  
                a1: "Quality means doing it right when no one is looking.",
                b1: "Failure is simply the opportunity to begin again, this time more intelligently.",
                c1: "Only I can change my life. No one can do it for me."
            }
        }, 
        nestedQuotes3: {  
            a3: "Strive not to be a success, but rather to be of value.",
            b3: "You can’t go back and change the beginning, but you can start where you are and change the ending.",
            c3: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
            nestedQuotes1: {  
                a1: "The only limit to our realization of tomorrow is our doubts of today.",
                b1: "The road to success and the road to failure are almost exactly the same.",
                c1: "Success is getting what you want. Happiness is wanting what you get."
            }
        },    
        nestedQuotes4: {  
            a4: "Do what you feel in your heart to be right – for you’ll be criticized anyway.",
            b4: "It is never too late to be what you might have been.",
            c4: "We generate fears while we sit. We overcome them by action."
        }
    },    

    {
        a2: "It takes courage to grow up and become who you really are.",
        b2: "Don’t count the days, make the days count.",
        c2: "Life isn’t about finding yourself. Life is about creating yourself."
    }, 

    {
        a3: "The purpose of our lives is to be happy.",
        b3: "Life is really simple, but we insist on making it complicated.",
        c3: "Do what you love and the money will follow."
    },    

    {
        a4: "All our dreams can come true, if we have the courage to pursue them.",
        b4: "A person who never made a mistake never tried anything new.",
        c4: "Change your thoughts and you change your world."
    }
];



const randomIndex = Math.floor(Math.random()*quotes.length);

Object.values(quotes[0])[1];

let c = document.getElementById('quotes').innerText = quotes[randomIndex].text;

