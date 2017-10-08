const colors = require('colors');
const ClozeCard = require("./ClozeCard.js");
const BasicCard = require("./BasicCard.js");
const inquirer = require("inquirer");
const fs = require('fs');
const library = require("./cardLibrary.json");

var usedCard;
var playedCard; 
var count = 0;

// Title
console.log('\nMAGICAL FLASHCARD ADVENTURES\n'.rainbow);

// Call the main menu
mainMenu();


// Prompt user to use existing cards orr to create new ones
// Use inquirer npm module

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "\nChoose your journey",
            choices: ["Create", "Use All", "Random", "Shuffle", "Show All", "Exit"],
            name: "menuOptions" //reference name of the object
        }
    ]).then(function(answer){
        var loadMsg;

        switch (answer.menuOptions){
            case "Create":
                loadMsg = setTimeout(createCard, 1000);
                break;
        }
    })
}

function createCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choosing your own path...  Another fork to choose. Enter you method of rememberance.".cyan,
            choices: ["Basic Card", "Cloze Card"],
            name: "cardType" 
				} 
				//pass object into the next function in the form of a promise
    ]).then(function(appData){
				var cardType = appData.cardType;
				if (cardType === "Basic Card") {
					inquirer.prompt([
						{
							type: "input",
							message: "Enter the front of your card.",
							name: "front"
						},
						{
							type: "input",
							message: "Enter the back of your card.",
							name: "back"
						}
					]).then(function(cardData){
						var cardObj = {
							type: "Basic Card",
							front: cardData.front,
							back: cardData.back
						};
						

						library.push(cardObj);
						fs.writeFile("cardLibrary.json",2, JSON.stringify(library,null,2));

						inquirer.prompt([
							{
								type: "list",
								message: "Do you want to create another card?",
								choices: ["Yes", "No"],
								name: "anotherCard"
							}
						]).then(function(appData){
							if (appData.anotherCard === "Yes") {
								createCard();
							} else {
								setTimeout(mainMenu, 1000);
							}
						});
					});
				} else {  //Cloze creation card from first if.else statement
					inquirer.prompt([
						{
							type: "input",
							message: "Enter the full statement you would like to commit to memory.",
							name: "fullText"
						},{
							type: "input",
							message: "Enter the text to 'cloze', which will replace it in the statement with '...'",
							name: "clozeText"
						}
					]).then(function(cardData){
						
						var cardObj = {
							type: "ClozeCard",
							text: cardData.fullText,
							cloze: cardData.clozeText 
						};

						// run comparison to ensure clozeText is present in full text
						if (cardObj.fullText.indexOf(cardObj.clozeText) !== -1){
							library.push(cardObj);
							fs.writeFile("cardLibrary.json"), JSON.stringify(library, null, 2);
						} else {
							console.log("For a cloze statement to work, the cloze text must match a part of the full text.  Please try again.");
						}
						inquirer.prompt([{
							type: "list",
							message:"Do you want to make another card?",
							choices: ["Yes", "No"],
							name: "anotherCard"
						}
						]).then(function (appData){
							if (appData.anotherCard === "Yes") {
								createCard();
							} else {
								setTimeout(mainMenu, 1000)
							}
						});
					});
				}
    });
};

function getQuestion(card) {
	if (cardObj.type === "Basic Card") {
		drawnCard = new BasicCard(cardObj.front, cardObj.back);
		return drawnCard.front;
	} else {
		drawnCard = new ClozeCard (cardObj.fulltext, cardObj.clozeText);
		return drawnCard.ClozeRemoved();
	}
};
