import { Character } from "./character.js";

async function loadCharacters(selectedHouse = null) {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        let data = await response.json();
    
        if (selectedHouse) {
            data = data.filter(char => char.house === selectedHouse);
        }

        data.sort((a, b) => a.name.localeCompare(b.name));
        data = data.slice(0, 20);

        const charactersContainer = document.querySelector('.characters');
        if (charactersContainer) {
            charactersContainer.innerHTML = '';

            data.forEach(charData => {
                const character = new Character(charData);
                const card = character.displayCard();
                charactersContainer.appendChild(card);
            });
        }

    } catch (error) {
        console.error("error while loading api :/  ->", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadCharacters();
    setupResponsiveMenu();
    
    const houseDivs = document.querySelectorAll('.houses > div');
    let currentSelectedHouse = null;
    
    houseDivs.forEach(div => {
        div.addEventListener('click', () => {
            const img = div.querySelector('img');
            if (!img) return;
            
            const src = img.getAttribute('src');
            let houseName = "";
            if (src.includes('Gryffindor')) houseName = "Gryffindor";
            else if (src.includes('Slytherin')) houseName = "Slytherin";
            else if (src.includes('Ravenclaw')) houseName = "Ravenclaw";
            else if (src.includes('Hufflepuff')) houseName = "Hufflepuff";

            if (currentSelectedHouse === houseName) {
                currentSelectedHouse = null;
                div.classList.remove('selected');
                console.log("deselecting the house");
            } else {
                currentSelectedHouse = houseName;
                 houseDivs.forEach(d => d.classList.remove('selected'));
                 div.classList.add('selected');
                console.log("selected house >", currentSelectedHouse);
            }
            loadCharacters(currentSelectedHouse);
        });
    });
});


function setupResponsiveMenu() {
    const menuBtn = document.querySelector('.header__left img');
    const headerUl = document.querySelector('.header__left ul');

    if (menuBtn && headerUl) {
        menuBtn.addEventListener('click', () => {
            if (headerUl.style.display === 'flex') {
                headerUl.style.display = 'none';
            } else {
                headerUl.style.display = 'flex';
                headerUl.style.flexDirection = 'column';
                headerUl.style.position = 'absolute';
                headerUl.style.top = '80px';
                headerUl.style.right = '20px';
                headerUl.style.background = 'var(--light)';
                headerUl.style.padding = '20px';
                headerUl.style.border = '2px solid var(--gold)';
            }
        });
    }
}