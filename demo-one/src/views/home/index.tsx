import React from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  return (
    <div>
      <Layout>
        <Header style={{ color: "#fff" }}>首页</Header>
        <Layout>
          <Sider style={{ color: "#fff" }}>侧边123</Sider>
          <Content>
            <div style={{ minHeight: 200 }}>内容</div>
          </Content>
        </Layout>
        <Footer>底部</Footer>
      </Layout>
    </div>
  );
};

export default Home;
