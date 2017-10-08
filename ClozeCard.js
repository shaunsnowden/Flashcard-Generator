// Cloze Card Constructor
function ClozeCard(text, cloze) {
    this.text = text.split(cloze);
    this.cloze=cloze;
};

// Test to ensure proper linkage and import executed
// console.log("ClozeCard Imported.".blue);

function ClozeCardConstruct() {
    this.ClozeRemoved = function(){
        return `${this.text[0]}...${this.text[1]}`;
    };
};

module.exports = ClozeCard;