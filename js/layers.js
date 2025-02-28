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
        if (hasUpgrade('ch', 11)) mult = mult.times(2)
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
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "wood", // Name of prestige currency
    baseResource: "soil", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('ch', 11)) mult = mult.times(2)
        if (hasUpgrade('ch', 12)) mult = mult.times(2)
        if (hasUpgrade('ch', 13)) mult = mult.times(2)
        if (hasUpgrade('ch', 14)) mult = mult.times(4)
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
        12: {
            title: "Selection",
            description: "Unlock the choice layer and your first permanent choice.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("w", 11) },
        },
    },
    layerShown(){return player.w.unlocked || hasUpgrade("s",24)}
})

addLayer("ch", {
    name: "choice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "yellow",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "choices", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 1000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('w', 12)},

    upgrades: {
        11: {
            title: "Oak",
            description: "Double soil and wood gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('w', 12) && !hasUpgrade("ch", 12) && !hasUpgrade("ch", 13) && !hasUpgrade("ch", 14)}, 
        },
        12: {
            title: "Birch",
            description: "Double stone (soon) and wood gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('w', 12) && !hasUpgrade("ch", 11) && !hasUpgrade("ch", 13) && !hasUpgrade("ch", 14)}, 
        },
        13: {
            title: "Azalea",
            description: "Double grass and wood gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('w', 12) && !hasUpgrade("ch", 11) && !hasUpgrade("ch", 12) && !hasUpgrade("ch", 14)}, 
        },
        14: {
            title: "Basic Tree",
            description: "Quadruple wood gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('w', 12) && !hasUpgrade("ch", 11) && !hasUpgrade("ch", 12) && !hasUpgrade("ch", 13)}, 
        },
    },
})

addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        11: {
            name: "Growth",
            done() { return player.d.points.gt(0) },
            tooltip: "Perform a Dirt reset.",
            image: "",
        },
        12: {
            name: "Grass Grower",
            done() { return player.points.gte(1000) },
            tooltip: "Reach 1,000 Grass.",
            image: "",
        },
        13: {
            name: "Stonify",
            done() { return player.s.points.gt(0) },
            tooltip: "Obtain stone. Reward: 1.25x Dirt",
            image: "",
        },
        14: {
            name: "Dirt+",
            done() { return hasUpgrade('d', 21) },
            tooltip: "Buy Dirt Upgrade 5.",
            image: "",
        },
        21: {
            name: "Clayify",
            done() { return player.c.points.gt(0) },
            tooltip: "Obtain clay.",
            image: "",
        },
        22: {
            name: "Slated",
            done() { return player.sl.points.gte(3) },
            tooltip: "Obtain 3 slate.",
            image: "",
        },
        23: {
            name: "Blackstone",
            done() { return player.co.points.gt(0) },
            tooltip: "Obtain coal. Reward: x1.25 Stone",
            image: "",
        },
        24: {
            name: "Slate^2",
            done() { return player.sl.points.gte(9) },
            tooltip: "Get 9 slate.",
            image: "",
        },
        31: {
            name: "Wasteland",
            done() { return hasUpgrade('co', 14) },
            tooltip: "Buy Polluted.",
            image: "",
        },
        32: {
            name: "Cooked",
            done() { return player.g.points.gt(0) },
            tooltip: "Obtain Glass.",
            image: "",
        },
        33: {
            name: "Sprouted",
            done() { return player.t.points.gt(0) },
            tooltip: "Reset for trees.",
            image: "",
        },
        34: {
            name: "Compressed Dirt",
            done() { return player.d.points.gte(100000) },
            tooltip: "Obtain 100,000 dirt.",
            image: "",
        },
        41: {
            name: "Glass Coating",
            done() { return player.g.points.gte(3) },
            tooltip: "Obtain 3 glass.",
            image: "",
        },
        42: {
            name: "Unpurity",
            done() { return player.i.points.gt(0) },
            tooltip: "Reset for iron. Reward: x1.25 Coal",
            image: "",
        },
        43: {
            name: "Choosing",
            done() { return hasChallenge('i', 12) },
            tooltip: "Unlock permanent choices.",
            image: "",
        },
        44: {
            name: "Slate^3",
            done() { return player.sl.points.gte(27) },
            tooltip: "Reach 27 slate. Reward: Slate no longer resets anything.",
            image: "",
        },
        51: {
            name: "Fruity",
            done() { return player.f.points.gt(0) },
            tooltip: "Reset for fruit. Reward: x1.25 Trees",
            image: "",
        },
        52: {
            name: "Fertilizer",
            done() { return player.cm.points.gt(0) },
            tooltip: "Reset for compost. Reward: x1.25 Fruit",
            image: "",
        },
        53: {
            name: "Steelizer",
            done() { return player.st.points.gt(0) },
            tooltip: "Reset for steel. Reward: x1.25 Iron",
            image: "",
        },
        54: {
            name: "Supercompost",
            done() { return player.cm.points.gte(100) },
            tooltip: "Obtain 100 compost. Reward: x1.25 Compost",
            image: "",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
}, 
)
