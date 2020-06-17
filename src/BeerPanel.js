import React from 'react';

const MethodList = (props) => {
    let methodSubPanel = null;
    if (props.method !== null && typeof props.method === 'object') {
        let mash_tempJSX = [];
        let fermentationJSX = [];
        if (props.method.mash_temp.length >= 1) {
            let mash_temp = null;
            for (let mash_tempObject of props.method.mash_temp) {
                mash_temp = <li>{`${mash_tempObject.name} 
            `}</li>
            }
        }
    }
}

const IngredientsList = (props) => {
    // Assume props.ingredients will always have .hops, .malt, and .yeast as fields
    // First, build out the hops info, then the malt info and last the yeast info.
    // Hops
    let ingredientSubPanel = null;
    if (props.ingredients !== null && typeof props.ingredients === 'object') {
        let hopsJSX = [];
        let maltJSX = [];
        let yeastJSX = "";
        if (props.ingredients.hops.length >= 1) {   // Has one or more hops objects.
            let hopItem = null;
            for (let hopItemObject of props.ingredients.hops) {
                hopItem = <li>{`${hopItemObject.name} (${hopItemObject.attribute} hops) ` + 
                `${hopItemObject.amount.value} ${hopItemObject.amount.unit} ` +
                `added at the ${hopItemObject.add}.`
                }</li>
                hopsJSX.push(hopItem);
            }
        }
        // Malt
        if (props.ingredients.malt.length >= 1) {
            let maltItem = null;
            for (let maltItemObject of props.ingredients.malt) {
                maltItem = <li>{
                    `${maltItemObject.name}, ${maltItemObject.amount.value} ${maltItemObject.amount.unit}.`
                }</li>
                maltJSX.push(maltItem);
            }
        }

        // Yeast
        yeastJSX = <li>{props.ingredients.yeast}.</li>

        // Now actually build the JSX for the ingredients listing.
        ingredientSubPanel = <div className="ingredientsStyle">
            <h2>The Ingredients</h2>
            <h3>The Hops</h3>
            <ul>{hopsJSX}</ul>
            <h3>The Malts</h3>
            <ul>{maltJSX}</ul>
            <h3>The Yeast</h3>
            <ul>{yeastJSX}</ul>
        </div>
    }
    return ingredientSubPanel;
}

const BoilVolumeList = (props) => {
    // Assume that boil_volume is being passed in and it's an object
    let boilVolumeJSX = null;
    if (props.boil_volume !== null && typeof props.boil_volume === 'object') {
        boilVolumeJSX = <p>{"The boil volume for this beer is" + 
        props.boil_volume.value + " " + 
        props.boil_volume.unit}.</p>
    }
    return boilVolumeJSX;
}

const FoodPairingList = (props) => {
    // Assume food_pairing is an array of values
    let foodPairingConcatentation = "";
    let foodPairingJSX = null;
    if (props.food_pairing !== null) {
        if (props.food_pairing.length > 1) {    // 2 or more food pairing items
            let lastFoodPairingItem = props.food_pairing.pop(); // Pulls last element off of the array.
            foodPairingConcatentation = props.food_pairing.join(", ") + " or " + lastFoodPairingItem + ".";
        } else {
            foodPairingConcatentation = props.food_pairing[0] + ".";
        }
        // foodPairingConcatentation = props.food_pairing.join(", ");
        foodPairingJSX = <p>{`Here are some good food pairings with this beer: ${foodPairingConcatentation}`}</p>
    }
    return foodPairingJSX;
}

const BeerPanel = (props) => {
    // Assume that this functional component will be passed a single beer JSON object.
    // Check to see if props.beer exists
    if (props.beer !== null) {
        // Pull out the beer JSON object's top-level fields like name, abv, etc. and format them in JSX.
        let topLevelListItems = [];
        // Iterate over the props.beer JSON object and if the field being processed is NOT an object, put it into an li in JSX.
        for (let [key, value] of Object.entries(props.beer)) {
            if (typeof value !== 'object') {
                // If the value is NOT an object, assume it's a string or other primitive.
                topLevelListItems.push(<li>{key}: {value} </li>);
            }
        }
        return <div>
                    <ul>{topLevelListItems}</ul>
                    <BoilVolumeList boil_volume={props.beer.boil_volume} />
                    <FoodPairingList food_pairing={props.beer.food_pairing} />
                    <IngredientsList ingredients={props.beer.ingredients} />

                    <hr />
                </div>;
    }
}

export default BeerPanel;