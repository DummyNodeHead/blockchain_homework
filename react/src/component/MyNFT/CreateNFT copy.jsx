import React from 'react'
import { Upload, Button, message } from 'antd'
import md5 from 'js-md5'

import "../../CSS/MainLayout.css"

let web3 = require('../eth/metamask');
let NFT = require('../eth/caller');
var content;
var md5value

export default class CreateNFT extends React.Component {
    getPicInfo = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
            content = result.target.result;
            md5value=md5(content)
            console.log(md5value)
            //var file = new File([targetNum], "pic.png");
            //saveAs(file,"1.png")
        }

        return false;
    }

    CreateNFT = async () => {
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        console.log(accounts[0])
        console.log(md5value)
        try {
            await NFT.methods.createNFT(md5value).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '6000000',
            }).then(
                rst => {
                    console.log(rst)
                    message.success("铸造成功！")
                }
            );
            
        } catch (e) {
            console.log(e)
            message.error("该图片已铸造过！")
        }
    }

    constructor() {
        super();
        this.state = {
            address: "",
            NFT: ""
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
            <div className="center">
                <div className="tips">每次铸造请求需要收取0.1 ether的手续费</div>
                <br/>
                <div className="tips">每张图片只能铸造一个NFT</div>
                <br/><br/>
                <Upload action="" accept=".png,.jpg" beforeUpload={this.getPicInfo} showUploadList={false}>
                    <Button>上传图片</Button>
                </Upload>
                <br/><br/><br/>
                <Button onClick={this.CreateNFT} type="primary">铸造</Button>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}