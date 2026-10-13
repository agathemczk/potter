export class Character {
    constructor(data) {
        this.name = data.name || "unknown";
        this.actor = data.actor || "who is this?";
        this.image = data.image || "./images/batman.png";
        this.house = data.house || "unknown";
        this.dateOfBirth = data.dateOfBirth || "unknown";
        this.ancestry = data.ancestry || "unknown";
        this.patronus = data.patronus || "unknown";
    }

    displayCard() {
        const div = document.createElement('div');
    
        let houseClass = "";
        if (this.house === "Gryffindor") houseClass = "house-gryffindor";
        else if (this.house === "Slytherin") houseClass = "house-slytherin";
        else if (this.house === "Ravenclaw") houseClass = "house-ravenclaw";
        else if (this.house === "Hufflepuff") houseClass = "house-hufflepuff";

        if (houseClass !== "") {
            div.classList.add(houseClass);
        }
        
        div.innerHTML = `
            <a href="details.html?name=${this.name}">
                <img src="${this.image}" alt="${this.name}" />
            </a>
            <p>${this.name}</p>
        `;

        return div;
    }
}