addLayer("s", {
    name: "soil", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#873e23",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "soil", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(2)
        if (hasUpgrade('s', 22)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for soil", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "More Grass",
            description: "Double your Grass gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Even More Grass",
            description: "1.5x your Grass gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("s", 11) },
        },
        13: {
            title: "Packed Soil",
            description: "2x your Soil gain.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("s", 12) },
        },
        14: {
            title: "Grass Covering",
            description: "Artifical grass covering provides x1.5 grass!",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("s", 13) },
        },
        21: {
            title: "Real grass",
            description: "Grow more grass to replace the artifical, removing the 1.5x but then giving a 2x!",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade("s", 14) },
        },
        22: {
            title: "Piles",
            description: "Create piles out of excess dirt for x2 soil!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("s", 21) },
        },
        23: {
            title: "Moss",
            description: "Farm moss for x2 grass!",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade("s", 22) },
        },
        24: {
            title: "Wooden",
            description: "Start farming wood!",
            cost: new Decimal(60),
            unlocked() { return hasUpgrade("s", 23) },
        },
    },
    layerShown(){return true}
})
addLayer("w", {
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#873e23",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "wood", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('w', 11)) mult = mult.times(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for wood", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Mossy Wood",
            description: "The wood is covered in moss. x2 Grass.",
            cost: new Decimal(1),
        },
    },
    layerShown(){return player.w.unlocked || hasUpgrade("s",25)}
})
