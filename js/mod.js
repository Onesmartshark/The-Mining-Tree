let modInfo = {
	name: "The Mining Tree",
	author: "Onesmartshark, Amaano675",
	pointsName: "grass",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.1",
	name: "Choosing Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2.1</h3><br>
		- Added many more upgrades to wood.<br>
		- Added choice layer!<br>
	<h3>v0.2.0</h3><br>
		- Added wood!<br>
	<h3>v0.1.4</h3><br>
		- Changed an upgrade.<br>
		- Added 3 upgrades.<br>
	<h3>v0.1.3</h3><br>
		- Changed some upgrades.<br>
		- Added another upgrade.<br>
	<h3>v0.1.2</h3><br>
		- Fixed soil.<br>
		- Added another upgrade.<br>
 	<h3>v0.1.1</h3><br>
		- Added 2 new Upgrades.<br>
		- Changed Endgame Once more.<br>
	<h3>v0.1</h3><br>
		- Soil added.<br>
	<h3>v0.0.2/h3><br>
		- Small fixes.<br>
	<h3>v0.0.1</h3><br>
		- Name fix.<br>
		- Endgame change.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('s', 11)) gain = gain.times(2)
	if (hasUpgrade('s', 12) && !hasUpgrade('s',21)) gain = gain.times(1.5)
	if (hasUpgrade('s', 14)) gain = gain.times(2)
	if (hasUpgrade('s', 21)) gain = gain.times(2)
	if (hasUpgrade('s', 23)) gain = gain.times(2)
	if (hasUpgrade('w', 11)) gain = gain.times(2)
	if (hasUpgrade('ch', 13)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e6"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}