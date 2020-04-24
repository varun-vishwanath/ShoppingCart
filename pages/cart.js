
import CartList from "../components/CartList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Component } from "react";
import { connect } from "react-redux";
import actions from "../redux/action";
const { getItemsinCart } = actions;
class CartPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // fetchList
        console.log("Propsssssssssssssssssss", this.props)
        this.props.getItemsinCart();
    }
    render() {

        return (
            <div>
                <Header />
                <Layout>
                    <CartList {...this.props} />
                </Layout>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

    };
};


export default connect(
    mapStateToProps, { getItemsinCart }
)(CartPage);
