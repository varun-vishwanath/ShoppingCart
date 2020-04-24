
import { Component } from "react";
import { Card, Col, Row, Button } from 'antd';
import Link from 'next/link';
import actions from "../redux/action";
import { connect } from "react-redux";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { getItemsinCart } = actions;

class CartList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartDisplayItems: [],
            initialItems: 1,
            totalPriceOfItems: 0,
            totalDiscountedPrice: 0,
            totalPriceDisplay: 0
        }
    }

    componentDidMount() {
        let _this = this;
        this.setState({
            cartDisplayItems: this.props.itemsInCart,
        }, () => {
            if (_this.props.itemsInCart && _this.props.itemsInCart.length > 0)
                _this.calculatePriceSum();
        })

        console.log(" this.props.itemsInCart did mount", this.props.itemsInCart)
    }

    componentWillReceiveProps(nextProps) {
        console.log("NExt props in cartjs", nextProps)
    }

    calculatePriceSum = () => {
        let price = 0;
        let discountedPrice = 0;
        this.state.cartDisplayItems.map(x => {
            price += x.item.price.actual;
            discountedPrice += x.item.price.display;

        })

        let discPrice = discountedPrice - price;

        this.setState({
            totalPriceOfItems: price,
            totalPriceDisplay: discountedPrice,
            totalDiscountedPrice: discPrice
        })
        return price;
    }

    increment = (item, index) => {
        let price = this.state.totalPriceOfItems;
        let discPrice = this.state.totalDiscountedPrice;
        let firstPrice = this.state.totalPriceDisplay;

        price += item.price.actual;
        firstPrice += item.price.display;
        discPrice = firstPrice - price;


        this.setState({
            totalPriceOfItems: price,
            totalPriceDisplay: firstPrice,
            totalDiscountedPrice: discPrice,
            [index + item.name]: this.state[index + item.name] ? (this.state[index + item.name] + 1) : (this.state.initialItems + 1)
        })
    }

    decrement = (item, index) => {
        let price = this.state.totalPriceOfItems;
        let discPrice = this.state.totalDiscountedPrice;
        let firstPrice = this.state.totalPriceDisplay;
        if (this.state[index + item.name] != undefined) {
            price -= item.price.actual;
            firstPrice -= item.price.display;
            discPrice = firstPrice - price;
        }
        this.setState({
            totalPriceOfItems: price,
            totalPriceDisplay: firstPrice,
            totalDiscountedPrice: discPrice,
            [index + item.name]: this.state[index + item.name] ? (this.state[index + item.name] - 1) : (this.state.initialItems - 1)
        })
    }

    removeItems = (item, idx) => {
        let arr = this.state.cartDisplayItems;
        let _this = this;
        let index = arr.map(x => {
            return x.key;
        }).indexOf(item.key);
        arr.splice(index, 1);
        this.setState({
            cartDisplayItems: arr
        }, () => {
            if (_this.state.cartDisplayItems.length > 0) {
                _this.calculatePriceSum();
            }
        })
        console.log("Array after deleteion", arr)
    }


    render() {
        console.log("props data in casrt", this.props.itemsInCart)
        console.log("props data in casrt cartDisplayItems", this.state.cartDisplayItems)
        const { itemsInCart } = this.props;
        return (
            <>
                <div className="cartContainerDiv">
                    {(this.state.cartDisplayItems && this.state.cartDisplayItems.length > 0) ?
                        <div>
                            <div className="cartLeftNav">
                                <div>

                                    {this.state.cartDisplayItems.map((i, index) =>
                                        <Row gutter={16} key={index} style={{ border: "1px solid black", marginBottom: "5px" }}>
                                            <Col span={6}>
                                                <div className="cartListDiv">
                                                    <img
                                                        alt="example"
                                                        src="https://cdn.britannica.com/s:700x500/77/170477-050-1C747EE3/Laptop-computer.jpg"
                                                    />
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className="cartListText">
                                                    <span>{i.item.name}</span>
                                                    <p>
                                                        <span><strong>&#8377; {i.item.price.actual}</strong> </span>
                                                        <span style={{ textDecoration: "line-through", fontSize: "12px", fontWeight: "bold", color: "#A9A9A9", marginLeft: "8px" }}>
                                                            {i.item.price.display}
                                                        </span>
                                                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#009966", marginLeft: "8px" }}>
                                                            {i.item.discount} % off
                                                </span>
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className="cartListText">
                                                    <Button type="primary" shape="circle" icon={<PlusOutlined />}
                                                        size="middle"
                                                        onClick={() => this.increment(i.item, index)} />

                                                    <Button type="dashed">
                                                        {this.state[index + i.item.name] > 0 ? this.state[index + i.item.name] : this.state.initialItems}
                                                    </Button>

                                                    <Button type="primary" shape="circle" icon={<MinusOutlined />}
                                                        size="middle"
                                                        disabled={this.state[index + i.item.name] == 1 ? true : false}
                                                        onClick={() => this.decrement(i.item, index)} />
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className="cartListText">
                                                    <Button type="link" danger onClick={() => this.removeItems(i.item, index)}>
                                                        <strong> Remove </strong>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            </div>
                            <div className="cartRightNav">
                                <Card title="Price Details" style={{ width: 300, border: "1px solid black " }}>

                                    <Row gutter={16} style={{ marginBottom: "5px", marginTop: "5px" }}>
                                        <Col span={16}>
                                            Price
                                </Col>
                                        <Col span={8}>
                                            {this.state.totalPriceDisplay}
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            Discount
                                </Col>
                                        <Col span={8}>
                                            {this.state.totalDiscountedPrice}
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row gutter={16} style={{ marginBottom: "5px", marginTop: "5px" }}>
                                        <Col span={16}>
                                            Total
                                </Col>
                                        <Col span={8}>
                                            {this.state.totalPriceOfItems}
                                        </Col>
                                    </Row>

                                </Card>
                            </div>
                        </div>
                        :

                        <div>
                            Cart is Empty
                            To add items into cart click
                                      <Link href='/'>
                                <a> Home</a>
                            </Link>
                        </div>
                    }

                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        itemsInCart: state.itemsInCart,
    };
};


export default connect(
    mapStateToProps, { getItemsinCart }
)(CartList);