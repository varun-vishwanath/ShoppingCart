
import ListPage from "./list";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Component } from "react";
import { connect } from "react-redux";
import actions from "../redux/action";
const { onFetchItem } = actions;
class BasePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // fetchList
    console.log("Propsssssssssssssssssss", this.props)
    this.props.onFetchItem();
  }
  render() {

    return (
      <div>
        <Header />
        <Layout>
          <ListPage {...this.props} />
        </Layout>
        <Footer />
      </div>
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
)(BasePage);
