import React from 'react'
import { Input, message } from 'antd'
import { Descriptions, Badge, Button } from 'antd';

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

export default class Bid extends React.Component {

    componentWillMount() {
        var Auc_id = this.props.location.state.Auc_id;
        var NFT_token_id = this.props.location.state.NFT_token_id;
        var bid = this.props.location.state.bid;
        var endTime = this.props.location.state.endTime;
        var sender = this.props.location.state.sender;
        var receiver = this.props.location.state.receiver;

        this.setState({
            Auc_id: Auc_id,
            NFT_token_id: NFT_token_id,
            endTime: endTime,
            bid: bid,
            sender: sender,
            receiver: receiver
        })
    }

    bid = async () => {
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()

        if(this.state.Auc_id=="该拍卖已截止"){
            message.error("你不能竞拍一个已经截止的交易")
            return;
        }

        console.log(accounts)
        try {
            await NFT.methods.bid(this.state.Auc_id, this.state.price).send({
                from: accounts[0],
                gas: '3000000',
            }).then(
                () => {
                    message.success('竞标成功！')
                }
            );
        } catch (e) {
            console.log(e)
            message.error('竞标失败！请确保出价高于当前出价，拍卖未截止，且您不是拍卖的发起者！')
        }
    }

    constructor() {
        super();
        this.state = {
            Auc_id: "请点击查询获取拍卖信息",
            NFT_token_id: "none",
            endTime: "none",
            bid: "none",
            sender: "none",
            receiver: "none",
            price: "none"
        }
    }

    getbid = (e) => {
        let value = e.target.value;
        this.setState({
            price: value
        })
    }

    render() {
        return (
            <div className="center">
                <Descriptions title="拍卖详情" bordered>
                    <Descriptions.Item label="拍卖ID" span={3}>{this.state.Auc_id}</Descriptions.Item>
                    <Descriptions.Item label="NFT_ID" span={3}>{this.state.NFT_token_id}</Descriptions.Item>
                    <Descriptions.Item label="最高出价/wei" >{this.state.bid}</Descriptions.Item>
                    <Descriptions.Item label="截止日期" span={2}>{this.state.endTime}</Descriptions.Item>
                    <Descriptions.Item label="拍卖发起者" span={1}>
                        <Badge status="processing" />
                        {this.state.sender}
                    </Descriptions.Item>
                    <Descriptions.Item label="最高出价者(若为0则表示目前无人出价)" span={2}>
                        <Badge status="processing" />
                        {this.state.receiver}
                    </Descriptions.Item>
                </Descriptions>
                <br /><br />
                <Input placeholder="出价" style={{ width: 207 }} onChange={this.getbid}></Input>
                <br /><br />
                <Button type="primary" onClick={this.bid}> 竞标</Button>
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}