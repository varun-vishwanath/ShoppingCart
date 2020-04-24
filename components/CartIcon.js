import { Menu, Badge } from 'antd';
import { Component } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import actions from "../redux/action";

import { connect } from "react-redux";

const { getItemsinCart } = actions;

class CartIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.props.getItemsinCart();
    }

    componentWillReceiveProps(nextProps) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", nextProps.itemsInCart)


    }

    render() {

        return (
            <span>
                <Badge count={this.props.itemsInCart ? this.props.itemsInCart.length : 0}>
                    <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Badge>

            </span>
        );
    }
}


const mapStateToProps = state => {
    return {
        itemsInCart: state.itemsInCart,
    };
};


export default connect(
    mapStateToProps, { getItemsinCart }
)(CartIcon);

