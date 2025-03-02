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
        if (hasUpgrade('w', 22)) mult = mult.times(2)
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
    branches: ['s'],
    color: "#873e23",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "wood", // Name of prestige currency
    baseResource: "soil", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('w', 13)) mult = mult.times(1.5)
        if (hasUpgrade('w', 14)) mult = mult.times(1.25)
        if (hasUpgrade('w', 21)) mult = mult.times(2)
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
            description: "Unlock the choice layer and your first permanent choice. You can pick a tree type!",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("w", 11) },
        },
        13: {
            title: "Planks",
            description: "Create some planks out of excess wood. x1.5 Wood!",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('ch', 11) || hasUpgrade("ch", 12) || hasUpgrade("ch", 13) || hasUpgrade("ch", 14) },
        },
        14: {
            title: "Sticks",
            description: "Create some sticks out of excess planks. x1.25 Wood!",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("w", 13) },
        },
        21: {
            title: "Axe",
            description: "Create a wooden axe. x2 Wood!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
        },
        22: {
            title: "Shovel",
            description: "Create a wooden shovel. x2 Soil!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
        },
        23: {
            title: "Pickaxe",
            description: "Create a wooden pickaxe. Unlock stone (soon)",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
        },
    },
    layerShown(){return player.w.unlocked || hasUpgrade("s",24)}
})
addLayer("st", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "St", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['w'],
    color: "#873e23",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "wood", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('w', 21)) mult = mult.times(2)
        if (hasUpgrade('ch', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Rock Types",
            description: "Unlocks another choice.",
            cost: new Decimal(1),
        },
        12: {
            title: "Mossy Rocks",
            description: "Unlock the choice layer and your first permanent choice. You can pick a tree type!",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("w", 11) },
        },
        13: {
            title: "Planks",
            description: "Create some planks out of excess wood. x1.5 Wood!",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('ch', 11) || hasUpgrade("ch", 12) || hasUpgrade("ch", 13) || hasUpgrade("ch", 14) },
        },
        14: {
            title: "Sticks",
            description: "Create some sticks out of excess planks. x1.25 Wood!",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("w", 13) },
        },
        21: {
            title: "Axe",
            description: "Create a wooden axe. x2 Wood!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
        },
        22: {
            title: "Shovel",
            description: "Create a wooden shovel. x2 Soil!",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
        },
        23: {
            title: "Pickaxe",
            description: "Create a wooden pickaxe. Unlock stone (soon)",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("w", 14) },
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
        21: {
            title: "Basic",
            description: "Quadruple stone gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('st', 11) && !hasUpgrade("ch", 22) && !hasUpgrade("ch", 23) && !hasUpgrade("ch", 24)}, 
        },
        22: {
            title: "Mossy",
            description: "Double grass and stone gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('st', 11) && !hasUpgrade("ch", 21) && !hasUpgrade("ch", 23) && !hasUpgrade("ch", 24)}, 
        },
        23: {
            title: "Dirty",
            description: "Double soil and stone gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('st', 11) && !hasUpgrade("ch", 21) && !hasUpgrade("ch", 22) && !hasUpgrade("ch", 24)}, 
        },
        24: {
            title: "Placeholder_Wood_Rock",
            description: "Double wood and stone gain.",
            cost: new Decimal(0),
            unlocked() { return hasUpgrade('st', 11) && !hasUpgrade("ch", 21) && !hasUpgrade("ch", 22) && !hasUpgrade("ch", 23)}, 
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
            name: "Basics",
            done() { return player.s.points.gt(0) },
            tooltip: "Perform a Soil reset.",
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
