import React from 'react'
import { Button } from 'antd'
import { Table, Space, message } from 'antd';

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

var _this;

const columns = [
    {
        title: '拍卖编号',
        dataIndex: 'Auc_id',
        key: 'Auc_id',
    },
    {
        title: '代币id',
        dataIndex: 'tokenid',
        key: 'tokenid',
    },
    {
        title: '操作',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <a onClick={claim.bind(_this,record)}>claim</a>
            </Space>
        ),
    },
];

async function claim(record){
    try {
        let accounts = await web3.eth.getAccounts()
        console.log(record.bid)
        await NFT.methods.claim(record.Auc_id).send({
            from: accounts[0],
            value: web3.utils.toWei(record.bid, 'wei'),
            gas: '3000000',
        }).then(
            () =>{
                var i=0;
                for(i=0;i<_this.state.data.length;i++){
                    if(_this.state.data[i].Auc_id==record.Auc_id){
                        _this.state.data.splice(i,1);
                        break;
                    }
                }
                message.success("认领成功！")
            }
        )}
        catch (e) {
            console.log(e)
            message.error("认领错误！请确保有未认领的代币存在！")
        }
}

var clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}


export default class UnclaimNFT extends React.Component {

    getUnclaim = async () => {
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)
        try {
            await NFT.methods.getUnclaim().call({
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
                        bid:"none"
                    };
                    var temp;
                    for(i=0;i<len;i++){
                        single.tokenid=rst[i].NFT_token_id;
                        single.Auc_id=rst[i].Auc_id;
                        single.bid=rst[i].bid;

                        if(single.Auc_id=="0"){
                            single.Auc_id="该拍卖还未截止，请耐心等待。"
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
            message.error("数据请求错误！请检查智能合约！")
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
                }
            ]
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        _this=this;

        this.setState({
            address: accounts
        }, () => {
            console.log(this.state.address)
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.getUnclaim}>查询</Button>
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