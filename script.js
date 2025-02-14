document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    // Load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('anthem-video', {
            events: {
                'onReady': function(event) {
                    event.target.playVideo();
                }
            }
        });
    };

    const loadingScreen = document.querySelector('.loading-screen');
    const wrapper = document.querySelector('.wrapper');
    const video = document.querySelector('.video-container iframe');
    const skipText = document.createElement('p');
    const enterButton = document.querySelector('.enter-button');
    
    // Hide main content initially
    wrapper.style.display = 'none';
    
    // Add typing animation logic
    const terminalLines = document.querySelectorAll('.terminal-content p');
    let currentLine = 0;

    function typeNextLine() {
        if (currentLine < terminalLines.length) {
            const line = terminalLines[currentLine];
            line.classList.add('typing-active');
            
            // Remove typing-active from previous line
            if (currentLine > 0) {
                terminalLines[currentLine - 1].classList.remove('typing-active');
            }
            
            currentLine++;
            
            // If all lines are typed, show the enter button
            if (currentLine === terminalLines.length) {
                enterButton.style.display = 'block';
            } else {
                setTimeout(typeNextLine, 1000);
            }
        }
    }

    // Start typing animation
    typeNextLine();

    // Function to end loading screen
    function endLoadingScreen() {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s';
        wrapper.style.display = 'block';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }

    // Listen for button click
    enterButton.addEventListener('click', endLoadingScreen);

    const priceBox = document.querySelector('.price-box');
    const priceValue = document.querySelector('.price-value');
    const priceChange = document.querySelector('.price-change');
    const priceQuote = document.querySelector('.price-quote');
    const happyGif = document.querySelector('.reaction-gif[alt="Happy Borat"]');
    const sadGif = document.querySelector('.reaction-gif[alt="Sad Borat"]');

    // Solana Price Tracker Implementation
    const boratPriceQuotes = {
        up: [
            "Wawaweewa! Solana going up like my excitement!",
            "Great success! Solana strong like bull in Kazakhstan field!",
            "My neighbor Nursultan very jealous of Solana gains! High five!",
            "Price going higher than my sister's expectations for marriage!"
        ],
        down: [
            "Solana having discount! Time to buy like crazy!",
            "Dip bigger than hole in my neighbor Nursultan's roof! Buy opportunity!",
            "Price down like my wife's standards! Perfect time for shopping!",
            "Red candle remind me of time I sell potato farm - big mistake! Buy dip!"
        ]
    };

    async function updateSolanaPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            
            const price = data.solana.usd;
            const change = data.solana.usd_24h_change;
            const isUp = change > 0;

            // Update price display with animation
            priceValue.textContent = `$${price.toFixed(2)}`;
            priceValue.style.animation = 'none';
            priceValue.offsetHeight; // Trigger reflow
            priceValue.style.animation = `price${isUp ? 'Up' : 'Down'} 0.5s ease`;
            
            // Update price change display
            priceChange.className = `price-change ${isUp ? 'up' : 'down'}`;
            priceChange.querySelector('span').textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;

            // Smoothly transition between GIFs
            happyGif.classList.toggle('show', isUp);
            sadGif.classList.toggle('show', !isUp);

            // Update Borat's quote with random selection
            const quotes = isUp ? boratPriceQuotes.up : boratPriceQuotes.down;
            priceQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

        } catch (error) {
            console.error('Error fetching Solana price:', error);
            priceQuote.textContent = "My internet worse than Kazakhstan dial-up! Try again later!";
        }
    }

    // Update price immediately and then every 30 seconds
    updateSolanaPrice();
    setInterval(updateSolanaPrice, 30000);

    // BoratGPT Implementation
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const chatButton = document.querySelector('.chat-input .pill-button');
    const suggestedButtons = document.querySelectorAll('.suggested-questions .pill-button');

    const boratResponses = {
        default: [
            "Chenqui for question! But like my neighbor Nursultan brain, I not understand completely. Please ask in more simple way!",
            "This question make my head spin like disco dance in Almaty! Can you ask different way?",
            "Hmm... In my village, we have saying: clear question make happy answer. Try again, yes?",
            "Your question more confusing than time I try understand TikTok! Please explain like I am my brother Bilo.",
            "Is this financial question or you try sell me another toilet camera? Please be more specific!"
        ],
        keywords: {
            'buy': {
                'when': [
                    "Time to buy is like time to marry cousin - when price is right! Watch chart like hawk watch goat!",
                    "You want timing? Market timing harder than catching greased pig! But now looking very nice!",
                    "Buy when red like color of my suit! This simple strategy work better than financial advisor in my village!",
                    "When chart go down like my wife's mood, is best time to buy! Trust me, I learn from experience!"
                ],
                'how': [
                    "First get Phantom wallet, then get SOL from exchange like Binance or FTX (RIP Bankman, he now poor like my neighbor Nursultan). Then use Raydium to swap for BORAT! Very nice!",
                    "Process simple like milking horse! Get wallet, buy SOL, go to Raydium, click swap, GREAT SUCCESS!",
                    "Even my brother Bilo can do it! First download Phantom (is like wallet but for computer), then buy SOL, then swap on Raydium!",
                    "Is easier than stealing chicken from my neighbor! Get Phantom wallet, buy SOL, use Raydium DEX, become rich! Very nice!"
                ],
                'should': [
                    "Is like asking if you should buy premium potassium - answer always YES! But not financial advice, I just like token very much!",
                    "My financial advisor (village goat) say YES! But DYOR - Do Your Own Research, not like my brother Bilo who buy SafeMoon!",
                    "Does bear poop in woods? Does my neighbor Nursultan steal my wifi? Answer is YES! But please do own research.",
                    "If you have to ask, answer is YES! Like my father say - best time to buy was yesterday, second best time is NOW!"
                ]
            },
            'sell': {
                'when': [
                    "Sell? NEVER! In Kazakhstan, we have diamond hands stronger than woman who pull plow!",
                    "Only paper hands sell! You want be like paper hands Nursultan who sell wife for internet connection?",
                    "Selling is like giving away favorite goat - only do when absolutely necessary or goat try eat your passport!",
                    "Time to sell is like time to give up dream of becoming number one DJ in Kazakhstan - NEVER!"
                ],
                'how': [
                    "If you must sell (shame on you), use Raydium swap like buying but reverse. But why sell when moon coming?",
                    "Selling is simple but not recommended! Like my father say - HODL until you can buy whole village!",
                    "Same way as buying but backwards! But remember - every time you sell, somewhere in Kazakhstan a goat cries.",
                    "Click sell button on Raydium, but first ask yourself - do I want to be poor like my neighbor Nursultan?"
                ]
            },
            'price': {
                'prediction': [
                    "My crystal ball (is actually glass eye from grandfather) say price go UP UP UP! To moon, then Mars, then Kazakhstan!",
                    "Future price harder to predict than my sister's mood! But tokenomics very nice, much potential!",
                    "According to ancient Kazakhstan prophecy (I make up just now), price will go to moon!",
                    "Let me check my premium calculator (is actually potato with numbers carved in). It say VERY NICE numbers coming!"
                ],
                'current': [
                    "Current price very nice! Like number of goats in my village - only going up!",
                    "Price now is temporary, like my last marriage. Future price? WAWAWEEWA!",
                    "Current price like my sister - looking good but could be better! Much potential!",
                    "Price now cheaper than my neighbor Nursultan's dignity! Is good buying opportunity!"
                ],
                'target': [
                    "Target price higher than number of times my neighbor Nursultan try steal my wifi password!",
                    "We aim for price bigger than compensation I get from movie! VERY NICE number!",
                    "Target like my dream of owning beach resort in Kazakhstan - very ambitious but possible!"
                ]
            },
            'dip': {
                'buy': [
                    "Dip is like Black Friday sale in Kazakhstan - EVERYTHING MUST GO... into your wallet! Buy now, thank Borat later!",
                    "You see dip, you buy dip! Is simple like Kazakhstan space program - what go down must go up!",
                    "Dip is gift from crypto gods! Like finding untouched toilet in public restroom - very rare opportunity!",
                    "Buy dip like hungry man buy potato - with both hands and no hesitation!"
                ],
                'cause': [
                    "Dip happen because weak hands selling to buy inferior tokens. They will regret more than my first marriage!",
                    "Market red because paper hands no understand value. Like my neighbor Nursultan - he no understand anything!",
                    "Dip caused by people with paper hands softer than my brother Bilo's brain!",
                    "Is temporary like my ban from Kazakhstan - will not last forever!"
                ]
            },
            'moon': {
                'when': [
                    "Moon coming faster than my running from angry farmer! Keep eye on chart, very exciting times!",
                    "Moon schedule like Kazakhstan train schedule - nobody know exact time, but we know it coming! VERY NICE!",
                    "Soon as Americans stop being nosy and let price go up! Very nice!",
                    "When time is right, like perfect moment to high five! Cannot rush these things."
                ],
                'what': [
                    "Moon is when price go so high, even my neighbor Nursultan can afford indoor toilet! We almost there!",
                    "Moon is place where BORAT token go to meet other successful tokens. Very exclusive club, yes!",
                    "Moon is when we all become rich like oligarch, but with better fashion sense!",
                    "Moon is state of mind, like when you find out your wife is actually your sister - very shocking but exciting!"
                ]
            },
            'project': {
                'about': [
                    "BORAT token is greatest token in all of Kazakhstan! We have tokenomics better than Uzbekistan's whole economy!",
                    "This project started in finest blockchain laboratory in Kazakhstan (my cousin's garage). Now we going to MOON!",
                    "Is revolutionary project that will make Kazakhstan greatest country in world! Even better than Uzbekistan!",
                    "Project more solid than foundation of my house (which is actually very strong, only collapse two times)!"
                ],
                'team': [
                    "Team more trustworthy than my mother's recipe for horse medicine! All doxxed, all verified, very nice!",
                    "Developers have brain size of watermelon! Much smart, much wow, no scam like my neighbor Nursultan's business!",
                    "Team is like Kazakhstan Olympic team - very strong, very dedicated, slightly confused but trying best!",
                    "Each team member verified by finest background check (I look through their window for 5 minutes)!"
                ],
                'roadmap': [
                    "Roadmap more extensive than my collection of grey suits! Many exciting things coming!",
                    "Future plans bigger than my dream of owning beach in Kazakhstan! Stay tuned for much excite!",
                    "We have many steps planned, like journey across Kazakhstan but with less angry mobs chasing!",
                    "Roadmap is like my journey to America - full of surprise, excitement, and occasional police chase!"
                ]
            },
            'safe': {
                'invest': [
                    "Is safer than my sister's chastity belt! Contract audited by finest experts in all of Kazakhstan!",
                    "More safe than keeping money with my neighbor Nursultan (he try steal but we catch him)! Contract locked like political prisoner!",
                    "Contract more secure than secret recipe for Kazakhstan's finest horse urine wine!",
                    "Safer than my underground bunker where I keep collection of Pamela Anderson posters!"
                ],
                'contract': [
                    "Smart contract written by finest programmer in whole of Kazakhstan (he have two computer)!",
                    "Code more clean than my neighbor Nursultan's criminal record (which is empty because he pay police)!",
                    "Contract audited more times than my brother Bilo try escape from cage!",
                    "Security tighter than my grip on last piece of cheese in whole village!"
                ]
            }
        }
    };

    function getBoratResponse(input) {
        input = input.toLowerCase();
        
        // Check for compound keywords first
        for (let mainKey in boratResponses.keywords) {
            if (input.includes(mainKey)) {
                const subCategories = boratResponses.keywords[mainKey];
                
                // Check for sub-category matches
                for (let subKey in subCategories) {
                    if (input.includes(subKey)) {
                        const responses = subCategories[subKey];
                        return responses[Math.floor(Math.random() * responses.length)];
                    }
                }
                
                // If no sub-category matches, get a random response from any sub-category
                const allResponses = Object.values(subCategories).flat();
                return allResponses[Math.floor(Math.random() * allResponses.length)];
            }
        }
        
        // Return default response if no keywords match
        return boratResponses.default[Math.floor(Math.random() * boratResponses.default.length)];
    }

    function addMessage(text, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
        
        if (isBot) {
            const img = document.createElement('img');
            img.src = 'borat-ai.png';
            img.alt = 'BoratGPT';
            img.className = 'bot-avatar';
            messageDiv.appendChild(img);
        }
        
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserInput(text = null) {
        const userText = text || chatInput.value.trim();
        if (!userText) return;

        // Add user message
        addMessage(userText, false);

        // Get and add Borat's response
        setTimeout(() => {
            const boratResponse = getBoratResponse(userText);
            addMessage(boratResponse, true);
        }, 1000);

        // Clear input if it's from the input field
        if (!text) {
            chatInput.value = '';
        }
    }

    // Event listener for the main ask button
    if (chatButton) {
        chatButton.addEventListener('click', () => handleUserInput());
    }

    // Event listener for Enter key in input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });
    }

    // Event listeners for suggested questions
    if (suggestedButtons) {
        suggestedButtons.forEach(button => {
            button.addEventListener('click', () => {
                handleUserInput(button.textContent);
            });
        });
    }

    // Console log to check if elements are found
    console.log({
        chatButton: !!chatButton,
        chatInput: !!chatInput,
        chatMessages: !!chatMessages,
        suggestedButtons: !!suggestedButtons?.length
    });

    // Confession System Implementation
    const confessionsList = document.querySelector('.confessions-list');
    const confessionInput = document.querySelector('.confession-input');
    const nameInput = document.querySelector('.name-input');
    const submitButton = document.querySelector('.submit-story');

    // Load existing confessions from localStorage
    let confessions = JSON.parse(localStorage.getItem('confessions')) || [];

    function addConfession(text, author) {
        const confession = {
            text: text,
            author: author || 'Anonymous Trader',
            timestamp: new Date().getTime()
        };
        
        confessions.push(confession);
        localStorage.setItem('confessions', JSON.stringify(confessions));
        displayConfession(confession);
    }

    function displayConfession(confession) {
        const confessionBox = document.createElement('div');
        confessionBox.className = 'confession-box';
        
        confessionBox.innerHTML = `
            <p class="confession-text">${confession.text}</p>
            <p class="confession-author">- ${confession.author}</p>
        `;
        
        confessionsList.prepend(confessionBox);
    }

    function loadConfessions() {
        confessionsList.innerHTML = '';
        confessions.sort((a, b) => b.timestamp - a.timestamp)
            .forEach(confession => displayConfession(confession));
    }

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const text = confessionInput.value.trim();
            if (text) {
                const author = nameInput.value.trim();
                addConfession(text, author);
                confessionInput.value = '';
                nameInput.value = '';
            }
        });
    }

    // Load existing confessions on page load
    loadConfessions();

    // Carousel Implementation
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    let currentIndex = 0;

    // Set initial position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Next button click
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    // Previous button click
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Auto advance every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);
}); 