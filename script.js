let dateInput = '';
let timeInput = '';
let cityLocation = '';
let specificLocation = '';
let selectedFoods = [];
let selectedDrinks = [];

const foodImages = {
    'Fries': 'foods/Fries.jpg',
    'Burgers': 'foods/Burgers.jpg',
    'Meals': 'foods/Meals.jpg',
    'Street Foods': 'foods/StreetFoods.jpg',
    'Ice Cream': 'foods/IceCream.jpg',
    'Others': 'foods/Others.jpg'
};

const drinkImages = {
    'Water': 'drinks/Water.jpg',
    'Juice': 'drinks/Juice.jpg',
    'Carbonated Drinks': 'drinks/CarbonatedDrinks.jpg',
    'Coffee': 'drinks/Coffee.jpg',
    'Milk': 'drinks/Milk.jpg',
    'Tea': 'drinks/Tea.jpg'
};

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbydXlWXWBps_zXbKeB1RWoScOmOtdlNiqtOG_06T-ua_Ga48tIjAmG3Y70wTPvFSdYAKw/exec';

const container = document.getElementById('box');

function pageSwitcher(page) {
    switch (page) {
        case 0:
            container.innerHTML = `<h1>Aww... okie</h1>`;
            break;

        case 1:
            container.innerHTML = `
                <h1>Yey! When u free tho?</h1>
                <input id="dateInput" type="date">
                <input id="timeInput" type="time">
                <div id="errorMessage" style="color: red;"></div>
            `;
            container.appendChild(createButton('Submit', submitDateTime));
            break;

        case 2:
            container.innerHTML = `
                <h1>Alright, where u wanna go?</h1>
                <div id="btns2">
                    <button onclick="setCityLocation('Caloocan', 3.1)" type="button">Caloocan</button>
                    <button onclick="setCityLocation('Quezon', 3.2)" type="button">Quezon</button>
                    <button onclick="setCityLocation('Bulacan', 3.3)" type="button">Bulacan</button>
                </div>
            `;
            break;

        case 3.1:
        case 3.2:
        case 3.3:
            const city = page === 3.1 ? 'Caloocan' : page === 3.2 ? 'Quezon' : 'Bulacan';
            container.innerHTML = `
                <h1>Hmm, where specifically?</h1>
                <div id="btns2">
                    ${createSpecificLocationButtons(city)}
                </div>
            `;
            break;

        case 4:
            container.innerHTML = `
                <h1>What do you want to eat?</h1>
                <div class="grid-container">
                    ${createFoodSelection()}
                </div>
                <div>
                    <button onclick="pageSwitcher(5)" type="button">Next</button>
                </div>
            `;
            break;

        case 5:
            container.innerHTML = `
                <h1>What do you want to drink?</h1>
                <div class="grid-container">
                    ${createDrinkSelection()}
                </div>
                <div>
                    <button onclick="pageSwitcher(4)" type="button">Back</button>
                    <button onclick="pageSwitcher(6)" id="sendEmailButton" type="button">Submit</button>
                </div>
            `;
            document.getElementById("sendEmailButton").addEventListener("click", sendEmail);
            break;

        case 6:
            container.innerHTML = `
                <p>
                    Gotcha! Don't u dare to forget! I've noted everything!<br><br><br>
                    When? → ${dateInput}, ${timeInput}<br>
                    Where? → ${cityLocation}, ${specificLocation}<br>
                    What to Eat? → ${selectedFoods.join(', ')}<br>
                    What to Drink? → ${selectedDrinks.join(', ')}<br><br><br>
                    I'll be waiting then!!! Come, Okay? Iloveyouuu ❤
                </p>
            `;
            break;
    }
}

function createButton(text, callback) {
    const button = document.createElement('button');
    button.textContent = text;
    button.type = 'button';
    button.addEventListener('click', callback);
    return button;
}

function createSpecificLocationButtons(city) {
    const locations = {
        'Caloocan': ['House', 'Convenience Store', 'Fast Food', 'Chichaballs'],
        'Quezon': ['SM Fairview', 'Terraces', 'K-Mart', 'Fast Food'],
        'Bulacan': ['Harmony', 'Gumaoc', 'Starmall', 'Tungko']
    };

    return locations[city].map(location =>
        `<button onclick="setSpecificLocation('${location}', 4)" type="button">${location}</button>`
    ).join('');
}

function createFoodSelection() {
    const foods = ['Fries', 'Burgers', 'Meals', 'Street Foods', 'Ice Cream', 'Others'];
    return foods.map(food => `
        <label>
            <input class="card" type="checkbox" value="${food}" onchange="toggleSelection(selectedFoods, this)"> 
            <img class="card-img" src="${foodImages[food]}" alt="${food} Image">
            ${food}
        </label>
    `).join('');
}

function createDrinkSelection() {
    const drinks = ['Water', 'Juice', 'Carbonated Drinks', 'Coffee', 'Milk', 'Tea'];
    return drinks.map(drink => `
        <label>
            <input class="card" type="checkbox" value="${drink}" onchange="toggleSelection(selectedDrinks, this)"> 
            <img class="card-img" src="${drinkImages[drink]}" alt="${drink} Image">
            ${drink}
        </label>
    `).join('');
}

function submitDateTime() {
    dateInput = document.getElementById('dateInput').value;
    timeInput = document.getElementById('timeInput').value;

    const errorMessage = document.getElementById('errorMessage');

    if (!dateInput || !timeInput) {
        errorMessage.textContent = "Please fill in both date and time.";
    } else {
        errorMessage.textContent = "";
        pageSwitcher(2);
    }
}

function setCityLocation(city, nextPage) {
    cityLocation = city;
    pageSwitcher(nextPage);
}

function setSpecificLocation(location, nextPage) {
    specificLocation = location;
    pageSwitcher(nextPage);
}

function toggleSelection(selectionArray, element) {
    const value = element.value;
    if (element.checked) {
        selectionArray.push(value);
    } else {
        const index = selectionArray.indexOf(value);
        if (index > -1) selectionArray.splice(index, 1);
    }
}

(function () {
    emailjs.init("1r1ifKX00tsngN4eo");
})();

function sendEmail() {
    const serviceID = "service_tm5lv8u";
    const templateID = "template_7aa9o34";
    const templateParams = { 
        date: dateInput,
        time: timeInput,
        city: cityLocation,
        location: specificLocation,
        food: selectedFoods,
        drink: selectedDrinks,
        to_name: "Josh",
        from_name: "the website you made"
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
            console.log(`Email sent! Status: ${response.status}`);
            recordSubmission();
        })
        .catch((error) => {
            console.log(`Failed to send email: ${JSON.stringify(error, null, 2)}`);
        });
}

function recordSubmission() {
    const data = {
        date: dateInput,
        time: timeInput,
        city: cityLocation,
        location: specificLocation,
        food: selectedFoods,
        drink: selectedDrinks
    };

    fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        console.log('Submission recorded:', result);
    })
    .catch(error => {
        console.error('Error recording submission:', error);
    });
}
