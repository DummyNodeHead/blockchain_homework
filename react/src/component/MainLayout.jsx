import React from "react";
import "antd/dist/antd.css";
import "../CSS/MainLayout.css";
import { Layout, Menu } from "antd";
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import Auction from './Auction/Auction'
import LaunchAuction from './Auction/LaunchAuction'
import MyAuction from './Auction/MyAuction'
import MyNFT from './MyNFT/MyNFT'
import NFTMadebyMe from './MyNFT/NFTMadebyMe'
import NFTinAuction from './MyNFT/NFTinAuction'
import UnclaimNFT from './MyNFT/UnclaimNFT'
import CreateNFT from './MyNFT/CreateNFT'
import Userinfo from './Userinfo'
import NFTBought from "./MyNFT/NFTBought";
import PastBelong from './MyNFT/PastBelong'
import Bid from './Auction/Bid'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="sub1" icon={<UserOutlined />}>
            用户指南
            <Link to="/MainLayout/Userinfo"/>
          </Menu.Item>
          <SubMenu key="sub2" icon={<ShoppingCartOutlined />} title="在线拍卖">
            <Menu.Item key="5">发起拍卖
              <Link to="/MainLayout/LaunchAuction"/>
            </Menu.Item>
            <Menu.Item key="6">我的拍卖
              <Link to="/MainLayout/MyAuction"/>
            </Menu.Item>
            <Menu.Item key="7">拍卖行
              <Link to="/MainLayout/Auction"/>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UploadOutlined />} title="我的NFT">
            <Menu.Item key="13">新建NFT
              <Link to="/MainLayout/CreateNFT"/>
            </Menu.Item>
            <Menu.Item key="8">我拥有的NFT
              <Link to="/MainLayout/MyNFT"/>
            </Menu.Item>
            <Menu.Item key="9">我铸造的NFT
              <Link to="/MainLayout/NFTMadebyMe"/>
            </Menu.Item>
            <Menu.Item key="10">买入的NFT
              <Link to="/MainLayout/NFTBought"/>
            </Menu.Item>
            <Menu.Item key="11">正在拍卖的NFT
              <Link to="/MainLayout/NFTinAuction"/>
            </Menu.Item>
            <Menu.Item key="12">未认领的NFT
              <Link to="/MainLayout/UnclaimNFT"/>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub4" icon={<QuestionCircleOutlined />}>
            NFT过去所属查询
            <Link to="/MainLayout/PastBelong"/>
          </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Switch>
              <Route path="/MainLayout/Userinfo" component={Userinfo}></Route>
              <Route path="/MainLayout/Auction" component={Auction}></Route>
              <Route path="/MainLayout/LaunchAuction" component={LaunchAuction}></Route>
              <Route path="/MainLayout/MyAuction" component={MyAuction}></Route>
              <Route path="/MainLayout/MyNFT" component={MyNFT}></Route>
              <Route path="/MainLayout/NFTinAuction" component={NFTinAuction}></Route>
              <Route path="/MainLayout/UnclaimNFT" component={UnclaimNFT}></Route>
              <Route path="/MainLayout/NFTMadebyMe" component={NFTMadebyMe}></Route>
              <Route path="/MainLayout/CreateNFT" component={CreateNFT}></Route>
              <Route path="/MainLayout/NFTBought" component={NFTBought}></Route>
              <Route path="/MainLayout/PastBelong" component={PastBelong}></Route>
              <Route path="/MainLayout/Bid" component={Bid}></Route>
              <Redirect to="/MainLayout/Userinfo"></Redirect>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
