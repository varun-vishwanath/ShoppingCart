
import { Component } from "react";

import Filter from "../components/Filter";
import Sorter from "../components/Sorter";
import ShoppingList from "../components/ShoppingList";

import { List, Avatar, Row, Col, Card, Button } from 'antd';
import CartIcon from "../components/CartIcon";

import actions from "../redux/action";
import { connect } from "react-redux";

import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { onFetchItem } = actions;

const jsondata = [{ "name": "item 1", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 2", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 3", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 4", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 5", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 6", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 7", "price": { "actual": 319, "display": 900 }, "discount": 64 }, { "name": "item 8", "price": { "actual": 319, "display": 900 }, "discount": 64 }]

class ListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFromSorter: []
        }
    }

    callChild = (dataFromSorter) => {
        this.setState({
            dataFromSorter: dataFromSorter
        })
    }


    render() {
        console.log("props data", this.props.shoppingListData)
        return (
            <>
                <div className="containerDiv">
                    <div className="leftNav">
                        <Filter />
                    </div>
                    <div className="mainComponent">
                        <Sorter callParent={this.callChild} listData={this.props.shoppingListData} />
                        <ShoppingList
                            listData={this.props.shoppingListData}
                            renderSortedData={this.state.dataFromSorter}
                        />
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        shoppingListData: state.shoppingListData
    };
};


export default connect(
    mapStateToProps, { onFetchItem }
)(ListPage);
