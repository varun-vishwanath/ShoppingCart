import actions from "./action";



const initialState = {
    shoppingListData: [],
    itemsInCart: [],
    applyRangeFilter: [],
    applySearchFilter: "",
};
const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "FETCH_ITEM_SUCCESS":
            console.log("Inside reducer", action.result)
            newState.shoppingListData = action.result.items
            break;

        case "GET_ITEMS_IN_CART":
            newState.itemsInCart = newState.itemsInCart;
            console.log("To get items in cart ", newState.itemsInCart)
            break;

        case "ADD_ITEM_TO_CART":
            console.log("Addinf more items ", action.payload)
            let tempData = action.payload;
            let { itemsInCart: temp = [] } = newState;
            temp.push(tempData);
            newState.itemsInCart = temp;
            console.log("After Adding items", newState.itemsInCart)
            break;

        case "DELETE_ITEM_FROM_CART":
            console.log("Addinf more items ", action.payload)
            let tempDelData = action.payload;
            let tempDel = newState.itemsInCart;
            tempDel.push(tempDelData);
            newState.itemsInCart = tempDel;
            break;

        case "APPLY_FILTER":
            newState.applyRangeFilter = action.payload
            break;

        case "APPLY_SEARCH":
            newState.applySearchFilter = action.payload
            break;


    }
    return newState;
};






export default reducer;