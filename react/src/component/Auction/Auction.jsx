import React from 'react'
import { Button } from 'antd'
import { Table, Space } from 'antd'
import { Link } from 'react-router-dom'

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

var _this

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

function info(record) {
    console.log(record.auction)
}

const columns = [
    {
        title: '拍卖编号',
        dataIndex: 'Auc_id',
        key: 'Auc_id',
    },
    {
        title: '所售NFT',
        dataIndex: 'tokenid',
        key: 'tokenid',
    },
    {
        title: '截止日期',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '最高出价/wei',
        dataIndex: 'bid',
        key: 'bid',
    },
    {
        title: '操作',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <Link to={{
                    pathname: '/MainLayout/Bid', state: {
                        Auc_id: record.Auc_id, NFT_token_id: record.tokenid,
                        bid: record.bid, endTime: record.endTime, sender: record.sender, receiver: record.receiver
                    }
                }}>
                    <a>详情</a>
                </Link>
            </Space>
        ),
    },
]

export default class Auction extends React.Component {

    Auction = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        try {
            await NFT.methods.getAuction().call({
                from: accounts[0],
                gas: '3000000',
            }).then(
                rst => {
                    let data = [{}];
                    data.length = 0;
                    console.log(rst)
                    var len = rst.length;
                    var i = 0;
                    var single = {
                        Auc_id: "none",
                        tokenid: "none",
                        endTime: "none",
                        bid: "none"
                    };
                    var temp;
                    for (i = 0; i < len; i++) {
                        single.tokenid = rst[i].NFT_token_id;
                        single.Auc_id = rst[i].Auc_id;
                        single.bid = rst[i].bid;
                        single.endTime = getLocalTime(rst[i].endTime);
                        single.sender = rst[i].sender;
                        single.receiver = rst[i].receiver;

                        if(single.Auc_id=="0"){
                            single.Auc_id="该拍卖已截止"
                        }

                        temp = clone(single);
                        data.push(temp);
                    }
                    console.log(data);
                    this.setState({
                        data: data
                    })
                }
            );
        } catch (e) {
            console.log(e)
            alert('错误')
        }
    }

    constructor() {
        super();
        this.state = {
            address: "",
            data: [
                {
                    Auc_id: "请点击查询获取拍卖信息！否则无法进行拍卖！",
                    tokenid: "none",
                    endTime: "none",
                    bid: "none",
                    sender: "none",
                    receiver: "none"
                }
            ]
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        _this = this
        this.setState({
            address: accounts
        }, () => {
            console.log(this.state.address)
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.Auction}>查询</Button>
                <br /><br />
                <Table columns={columns} dataSource={this.state.data} />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
            </div>

        )
    }
}