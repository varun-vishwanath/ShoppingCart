// exporting default actions;

const actions = {
    FETCH_ITEM: "FETCH_ITEM",
    FETCH_ITEM_SUCCESS: "FETCH_ITEM_SUCCESS",
    FETCH_ITEM_FAILURE: "FETCH_ITEM_FAILURE",

    GET_ITEMS_IN_CART: "GET_ITEMS_IN_CART",
    ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
    DELETE_ITEM_FROM_CART: "DELETE_ITEM_FROM_CART",

    APPLY_FILTER: "APPLY_FILTER",
    APPLY_SEARCH: "APPLY_SEARCH",


    onFetchItem: () => ({
        type: actions.FETCH_ITEM,
        value: 1
    }),

    onFetchItemSuccess: (result) => ({
        type: actions.FETCH_ITEM_SUCCESS,
        result
    }),

    onFetchItemError: (result) => ({
        type: actions.FETCH_ITEM_FAILURE,
        result
    }),

    getItemsinCart: () => ({
        type: actions.GET_ITEMS_IN_CART,
    }),

    onAddItemtoCart: (payload) => ({
        type: actions.ADD_ITEM_TO_CART,
        payload
    }),

    deleteItemfromCart: (payload) => ({
        type: actions.DELETE_ITEM_FROM_CART,
        payload
    }),

    onApplyFilter: (payload) => ({
        type: actions.APPLY_FILTER,
        payload
    }),

    onApplySearch: (payload) => ({
        type: actions.APPLY_SEARCH,
        payload
    })

}


export default actions;