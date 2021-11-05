import React from 'react'
import { DatePicker, Button, Input, message } from 'antd'

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');

var time;

function onChange(value, dateString) {
    console.log('Formatted Selected Time: ', dateString);
    time=dateString
}



export default class LaunchAuction extends React.Component {

    constructor() {
        super();
        this.state = {
            bid: "",
            token_id:"",
            endtime:""
        }
    }
    
    onOk=(value) => {
        value=Date.parse(time)/1000
        this.setState({
            endtime: value
        })
    }

    getID = (e) => {
        let value = e.target.value;
        this.setState({
            token_id: value
        })
    }

    getbid = (e) => {
        let value = e.target.value;
        this.setState({
            bid: value
        })
    }

    setupAuction = async () => {
        let accounts = await web3.eth.getAccounts()
 
        try {
            console.log(this.state.endtime)
            await NFT.methods.setupAuction(this.state.token_id,this.state.endtime,this.state.bid).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            }).then(
                () => {
                    message.success("创建拍卖成功！")
                }
            );
        } catch (e) {
            console.log(e)
            message.error('输入内容有误！请检查后重试！')
        }
    }



    render() {
        return (
            <div className="center">
                <Input placeholder="要拍卖的NFT的Token_ID" style={{ width: 600 }} onChange={this.getID}></Input>
                <br/><br/>

                <DatePicker showTime onChange={onChange} onOk={this.onOk} />
                <br/><br/>

                <Input placeholder="起拍价(wei)" style={{ width: 207 }} onChange={this.getbid}></Input>
                <br/><br/>
                <Button type="primary" onClick={this.setupAuction}>发起拍卖</Button>

                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}