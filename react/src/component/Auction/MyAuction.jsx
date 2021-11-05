import React from 'react'
import { Button } from 'antd'
import { Table } from 'antd';

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

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
        dataIndex: 'end',
        key: 'end',
    },
    {
        title: '最高出价/wei',
        dataIndex: 'bid',
        key: 'bid',
    },
];

function getLocalTime(nS) {    
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');    
}

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default class MyAuction extends React.Component {

    getAuction = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        try {
            await NFT.methods.myAuction().call({
                from: accounts[0],
                gas: '3000000',
            }).then(
                rst => {
                    let data=[{}];
                    data.length=0;
                    console.log(rst)
                    var len=rst.length;
                    var i=0;
                    var single={
                        Auc_id:"none",
                        tokenid:"none",
                        end:"none",
                        bid:"none"
                    };
                    var temp;
                    for(i=0;i<len;i++){
                        single.tokenid=rst[i].NFT_token_id;
                        single.Auc_id=rst[i].Auc_id;
                        single.bid=rst[i].bid;
                        single.end=getLocalTime(rst[i].endTime);

                        if(single.Auc_id=="0"){
                            single.Auc_id="该拍卖已截止"
                        }

                        temp=clone(single);
                        data.push(temp);
                    }
                    console.log(data);
                    this.setState({
                        data:data
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
            data:[
                {
                    Auc_id:"请点击查询获取拍卖信息",
                    tokenid:"none",
                    end:"none",
                    bid:"none"
                }
            ]
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()

        this.setState({
            address: accounts
        }, () => {
            console.log(this.state.address)
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.getAuction}>查询</Button>
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