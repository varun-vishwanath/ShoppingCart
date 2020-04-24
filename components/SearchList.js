import { PureComponent } from "react"
import { Button, Tooltip, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import actions from "../redux/action";
import { connect } from "react-redux";

const { onApplySearch } = actions;

const { Search } = Input;

class SearchList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    valOfSearchList = (value) => {
        console.log("Values", value)
        this.props.onApplySearch(value);
    }

    render() {
        return (

            <Search
                placeholder="input search text"
                onSearch={this.valOfSearchList}
                // onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
        );
    }
}


const mapStateToProps = state => {
    return {

    };
};


export default connect(
    mapStateToProps, { onApplySearch }
)(SearchList);

