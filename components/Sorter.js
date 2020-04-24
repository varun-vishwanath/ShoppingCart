import { Menu } from 'antd';
import { PureComponent } from 'react';
import {
    FallOutlined,
    MoneyCollectOutlined,
    RiseOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
export default class Sorter extends PureComponent {

    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e.key);
        let active = e.key;
        this.setState({
            current: e.key,
        });

        if (active == "highlow") {
            this.applySort("HL");
        } else if (active == "lowhigh") {
            this.applySort("LH");
        } else if (active == "discount") {
            this.applySort("DIS");
        } else {
            console.log("Else")
        }
    };

    applySort = (type) => {

        // test data
        // let items = [
        //     { "name": "item 1", "price": { "actual": 100, "display": 900 }, "discount": 64 },
        //     { "name": "item 2", "price": { "actual": 200, "display": 900 }, "discount": 64 },
        //     { "name": "item 3", "price": { "actual": 300, "display": 900 }, "discount": 64 },
        //     { "name": "item 4", "price": { "actual": 700, "display": 900 }, "discount": 64 },
        //     { "name": "item 5", "price": { "actual": 600, "display": 900 }, "discount": 64 },
        //     { "name": "item 6", "price": { "actual": 900, "display": 900 }, "discount": 64 },
        //     { "name": "item 7", "price": { "actual": 400, "display": 900 }, "discount": 64 },
        //     { "name": "item 8", "price": { "actual": 200, "display": 900 }, "discount": 64 }
        // ]

        // let items = this.props.listData;
        items.sort(function (a, b) {
            if (type == "HL") {
                return a.price.actual - b.price.actual;
            }
            if (type == "LH") {
                return b.price.actual - a.price.actual;
            }
            if (type == "DIS") {
                return a.discount - b.discount;
            }

        })

        console.log("Items sorted", items)
        this.props.callParent(items);

    }



    render() {
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="sortby" disabled>
                        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>Sort By  </span>
                    </Menu.Item>
                    <Menu.Item key="highlow">
                        <FallOutlined />
                        Price -- High Low
                    </Menu.Item>
                    <Menu.Item key="lowhigh">
                        <RiseOutlined />
                        Price -- Low High
                    </Menu.Item>
                    <Menu.Item key="discount">
                        <MoneyCollectOutlined />
                       Discount
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

