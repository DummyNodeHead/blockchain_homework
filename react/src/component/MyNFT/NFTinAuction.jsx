import React from 'react'
import { Button } from 'antd'
import { Table } from 'antd'

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

const columns = [
    {
        title: '拍卖ID',
        dataIndex: 'Auc_id',
        key: 'Auc_id',
    },
    {
        title: '代币ID',
        dataIndex: 'tokenid',
        key: 'tokenid',
    },
    {
        title: '最高出价',
        dataIndex: 'bid',
        key: 'bid',
    },
    {
        title: '截止时间',
        dataIndex: 'time',
        key: 'time',
    },
];

function getLocalTime(nS) {    
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');    
}

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default class NFTInAuction extends React.Component {

    myNFTInAuction = async () => {
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        try {
            await NFT.methods.myNFTInAuction().call({
                from: accounts[0],
                gas: '3000000',
            }).then(
                rst => {
                    let data=[{}];
                    data.length=0;
                    console.log(rst)
                    var len=rst.length;
                    var i=0;
                    var singleNFT={
                        tokenid:"none",
                        maker:"none",
                        time:"none"
                    };
                    var temp;
                    for(i=0;i<len;i++){
                        singleNFT.Auc_id=rst[i].Auc_id;
                        singleNFT.tokenid=rst[i].NFT_token_id;
                        singleNFT.bid=rst[i].bid;
                        singleNFT.time=getLocalTime(rst[i].endTime);

                        if(singleNFT.Auc_id=="0"){
                            singleNFT.Auc_id="该拍卖已截止"
                        }

                        temp=clone(singleNFT);
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
                    Auc_id:"请点击查询获取数据",
                    tokenid:"none",
                    bid:"none",
                    time:"none"
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
                <Button type="primary" onClick={this.myNFTInAuction}>查询</Button>
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