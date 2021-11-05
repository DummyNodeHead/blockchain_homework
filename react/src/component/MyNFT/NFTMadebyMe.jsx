import React from 'react'
import { Button } from 'antd'
import { Table } from 'antd'

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

const columns = [
    {
        title: '代币ID',
        dataIndex: 'tokenid',
        key: 'tokenid',
    },
    {
        title: '铸造时间',
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

export default class NFTMadebyMe extends React.Component {

    getNFTMadeByMe = async () => {
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        try {
            await NFT.methods.getNFTMadeByMe().call({
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
                        time:"none"
                    };
                    var temp;
                    for(i=0;i<len;i++){
                        singleNFT.tokenid=rst[i].token_id;
                        singleNFT.time=getLocalTime(rst[i].createTime);

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
                    tokenid:"请点击查询获取数据",
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
                <Button type="primary" onClick={this.getNFTMadeByMe}>查询</Button>
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