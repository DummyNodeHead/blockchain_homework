import React from 'react'
import "../CSS/MainLayout.css"

let web3 = require('./eth/metamask');

export default class Userinfo extends React.Component {

    constructor(){
        super();
        this.state={
            address:"",
            balance:0
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        
        this.setState({
            address: accounts,
        },()=>{
            console.log(this.state.address)
        })
    }

    render() {
        return (
            <div>
                <div className="Welcome">
                    Welcome to MYNFT!
                    <br/><br/>
                </div>
                <div className="AboutMe">
                    It's a DApp developed by 赵灿宇-3190105358
                </div>
                <br/>
                <div className="Welcome">
                    指南
                </div>
                <div className="Guide">
                    1. 请先下载并连接MetaMask再使用本系统<br/>
                    2. 在【在线拍卖】菜单中可以跳转到关于拍卖的界面<br/>
                    3. 在【我的NFT】菜单中可以进行对NFT的相关操作<br/>
                    4. 连接或切换钱包后，请刷新界面<br/>
                </div>
                <div className="Welcome">
                    <br/><br/><br/>
                    您的地址
                    <br/>
                    {this.state.address}
                    <br/>
                    <br/><br/><br/>
                    <br/><br/><br/><br/>
                </div>
            </div>
        )
    }
}