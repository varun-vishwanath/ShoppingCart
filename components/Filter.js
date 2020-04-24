import { Menu, Slider, Button } from 'antd';
import { PureComponent } from 'react';
import actions from "../redux/action";
import { connect } from "react-redux";

const { onApplyFilter } = actions;

class Filter extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            amountRange: [100, 900]
        }
    }


    getAmountRange = (value) => {
        console.log("Value", value)
        this.setState({
            amountRange: value
        })
        //this returns an aray
    }

    onApplyFilter = () => {
        console.log("Price range", this.state.amountRange)
        this.props.onApplyFilter(this.state.amountRange)
    }

    render() {
        const marks = {
            100: {
                style: {
                    color: "grey",
                },
                label: <strong> &#8377; 100</strong>,
            },
            3000: {
                style: {
                    color: 'grey',
                    marginLeft: "-60px"
                },
                label: <strong> &#8377; 3000</strong>,
            },
        };
        return (

            <div className="filterConatiner">
                <h3>Filters</h3>
                <Slider
                    range
                    min={100}
                    max={3000}
                    marks={marks}
                    defaultValue={[100, 900]}
                    tooltipVisible
                    tooltipPlacement="bottom"
                    onChange={this.getAmountRange}
                />
                <Button type="primary"
                    shape="round"
                    size="middle"
                    style={{ marginTop: "50px", left: "30%", width: "100px" }}
                    onClick={this.onApplyFilter}>
                    Apply
                </Button>

            </div>
        );
    }
}




const mapStateToProps = state => {
    return {

    };
};


export default connect(
    mapStateToProps, { onApplyFilter }
)(Filter);


