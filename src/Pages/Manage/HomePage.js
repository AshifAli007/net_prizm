import React from 'react';
import SideBar from '../Components/SideBar';
import { Layout, Menu } from 'antd';
import Map from '../Components/Map';
import {
    SearchOutlined,
    BookOutlined,
    DingdingOutlined,
    DeploymentUnitOutlined,
    TeamOutlined,
    SnippetsOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const labels = [
    'Search',
    'Summary',
    'Skills',
    'Learning',
    'Badging',
    'Reports',
    'Upload Files'
]
const items = [
    SearchOutlined,
    BookOutlined,
    DingdingOutlined,
    DeploymentUnitOutlined,
    TeamOutlined,
    SnippetsOutlined,
    CloudUploadOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `${labels[index]}`,
}));

const HomePage = () => {
    // eslint-disable-next-line no-undef
    
    return (
        <Layout hasSider>
            <SideBar></SideBar>
            <Layout
                className="site-layout"
                style={{ height: '100vh', }}
            >
                {/* <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            height: '8vh',
                            backgroundColor: 'RGB(0, 33, 64)',
                            color: 'white',
                        }}
                    /> */}
                <Content
                    style={{
                        margin: '0',
                        overflow: 'initial',
                        height: '84vh'
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            paddingLeft: '6%'
                        }}
                    >
                        {<Map />}

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                        height: "8vh",
                        backgroundColor: "RGB(0, 33, 64)",
                        color: "white",
                    }}
                >
                    Net Prizm UI ©2022
                </Footer>
            </Layout>
        </Layout>)
};

export default HomePage;