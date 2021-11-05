import React from 'react'
import { Input, Button, message } from 'antd'
import { Table } from 'antd'

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

const columns = [
    {
        title: '持有者(按持有时间先后从上到下排序)',
        dataIndex: 'owner',
        key: 'owner',
    },
];

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default class PastBelong extends React.Component {

    Belong = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(this.state.Input)
        let data = [{}];
        data.length = 0;
        var i = 0;
        var single = {
            owner: "none",
        };
        var temp;
        try {
            await NFT.methods.Belong(this.state.Input).call({
                from: accounts[0],
                gas: '3000000',
            }).then(
                rst => {
                    var len = rst.length;
                    for (i = 0; i < len; i++) {
                        single.owner = rst[i];

                        temp = clone(single);
                        data.push(temp);
                    }
                    console.log(data)
                }
            );
            
            this.setState({
                data: data
            })
        } catch (e) {
            console.log(e)
            message.error('输入内容有误！请检查后重试！')
        }
    }

    constructor() {
        super();
        this.state = {
            Input: "",
            data: [
                {
                    owner: "none",
                }
            ]
        }
    }

    getInput = (e) => {
        let value = e.target.value;
        this.setState({
            Input: value
        })
    }

    render() {
        return (
            <div className="center">
                <Input placeholder="输入要查询的NFT的Token_ID" style={{ width: 600 }} onChange={this.getInput}></Input>
                <br /><br />
                <Button type="primary" onClick={this.Belong}> 查询</Button>
                <br /><br />
                <Table columns={columns} dataSource={this.state.data} />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />

            </div>
        )
    }
}