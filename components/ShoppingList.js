
import { Component } from 'react';
import { Card, Col, Row, Button } from 'antd';

import actions from "../redux/action";
import { connect } from "react-redux";

const { onAddItemtoCart, getItemsinCart } = actions;

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            existingItemsinCart: [],
            displayList: [],
            isDisabled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("items in cart on update", nextProps)
        const { applyRangeFilter = [] } = nextProps;
        this.setState({
            displayList: nextProps.listData
        })
        if (nextProps.renderSortedData && nextProps.renderSortedData.length > 0) {
            this.setState({
                displayList: nextProps.renderSortedData
            })
        }
        if (applyRangeFilter.length > 0) {
            this.amountFilteredList(applyRangeFilter);
        }
        if (nextProps.applySearchFilter && nextProps.applySearchFilter != "") {
            this.searchFilteredList(nextProps.applySearchFilter);
        }
    }

    searchFilteredList = (val) => {
        console.log("Search value", val)
        let tempArr = [];
        let { listData: currentData = [] } = this.props;

        currentData.map(item => {
            if (item.name == val) {
                tempArr.push(item)
            }
        })
        this.setState({
            displayList: tempArr
        })

    }

    amountFilteredList = (rangeVal) => {
        // if the price range is between rangeval then add that item to another array
        let tempArr = [];
        let currentData = this.props.listData;

        currentData.map(item => {
            if ((item.price.actual > rangeVal[0]) && (item.price.actual < rangeVal[1])) {
                tempArr.push(item)
            }
        })
        this.setState({
            displayList: tempArr
        })
    }

    componentDidMount() {
        this.props.getItemsinCart();
    }




    addItemtoCart = (item, index) => {
        let dataObj = {
            index,
            item
        }

        this.setState({
            [index + item.name]: true
        })

        this.props.onAddItemtoCart(dataObj);
        this.props.getItemsinCart();
    }

    render() {
        const { listData: displayList = [] } = this.props;

        console.log("renderSortedData <<<<<>>>>>> renderSortedData", this.props.renderSortedData)

        return (
            <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {this.state.displayList.map((item, index) =>
                            <Col span={4} className="listCols" key={index}>
                                <Card
                                    style={{ padding: "7px" }}
                                    cover={<img alt="example" src="https://cdn.britannica.com/s:700x500/77/170477-050-1C747EE3/Laptop-computer.jpg" />}
                                >

                                    <p>{item.name}</p>
                                    <p>
                                        <span><strong> &#8377;{item.price.actual} </strong> </span>
                                        <span style={{ textDecoration: "line-through", fontSize: "12px", fontWeight: "bold", color: "#A9A9A9", marginLeft: "8px" }}> {item.price.display}</span>
                                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#009966", marginLeft: "8px" }}>  {item.discount}% off</span>
                                    </p>
                                    <Button type="primary"
                                        shape="round"
                                        size="middle"
                                        disabled={this.state[index + item.name] ? this.state[index + item.name] : this.state.isDisabled}
                                        style={{ backgroundColor: "#FFCC00", border: "0px", color: "#000000", marginLeft: "12%" }}
                                        onClick={() => this.addItemtoCart(item, index)}>
                                        Add to Cart
                                    </Button>
                                </Card>
                            </Col>
                        )
                        }



                    </Row>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        itemsInCart: state.itemsInCart,
        applySearchFilter: state.applySearchFilter,
        applyRangeFilter: state.applyRangeFilter
    };
};


export default connect(
    mapStateToProps, { onAddItemtoCart, getItemsinCart }
)(ShoppingList);


