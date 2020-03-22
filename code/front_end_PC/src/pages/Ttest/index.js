import React from 'react';
import './index.less';
import { Card, Timeline, Result, Button, Icon, Upload, Modal, message, notification } from 'antd';
import cookie from 'react-cookies';
import { EventEmitter2 } from 'eventemitter2';
import { AddPhoto, GetLoginUserName, DetailAnnouncementTag } from './../../config/dataAddress';
import Fetch from './../../fetch';
import UploadMy from './../upload';
import { TestEditTable } from './../ui/editTable';



var emitter = new EventEmitter2();
const { Dragger } = Upload;

const props = {
    accept: '.xlsx, .xls, .jpg, .png',
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class AddPhotoView extends React.Component{
    state = { visible: false }
  
    showModal = () => {
        console.log('--');
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
  
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    customRequest = (option) => {
        const formData = new FormData()
        formData.append('myFileName', option.file);
        formData.append('albumId', 2);
        fetch(AddPhoto,{
            method: 'POST',
            headers: {
                'Authorization': cookie.load('token'),
            },
            body: formData
        }).then(res => res.json()).then(
            data => {
                console.log(data);
                if (data.status == 0) {
                    message.success(data.msg);
                    this.setState({
                        visible: false,
                    });
                    emitter.emit('selectPhoto', this.props.photoId);
                } 
                else {
                    if (data.status < 100) {
                        message.error(data.msg);
                    } else {
                        notification.error({
                            message: data.error,
                            description: data.message
                        });
                    }
                }
            }
        )
    }
    render(){
        return(
        <span>
            <Button type="primary"
                onClick={this.showModal} >
                <Icon type="upload" /> 上传照片
            </Button>
            <Modal
                title="上传图片"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer = {null}
            > 
                <Dragger 
                    {...props}
                    customRequest = {this.customRequest}
                    showUploadList = {false}
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
            </Modal>
        </span>
        );
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
        ],
    };

  handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
        <div className="clearfix">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
  }
}

class TtestView extends React.Component {

    state = {
        show: true
    }

    handleLinkBtn = () => {
        Fetch.requestPost({
            url: DetailAnnouncementTag,
            info: 'announcementTagId='+2+'&announcementTagName='+'111'
            +'&announcementTagColor='+'222'
        }).then( 
            res => {
                console.log(res);
            }
        ).catch(err => {
            console.log("err", err);
        });
    }

    handleClick = () => {
        let show = this.state.show
        this.setState(() => ({show: !show}))
    }

    render() {
        let show = this.state.show
        return (
            <div>
                <Card title={<span>测试</span>} className="timeLineFormat">

                    <PicturesWall />

                    <div className={show ? 'show' : 'hide'}>Hello</div>
                    <button onClick={this.handleClick}>css动画渐变</button>

                    <div class="sky">
                        <div class="cloud_one"></div>
                        <div class="cloud_two"></div>
                        <div class="cloud_three"></div>
                    </div>

                    <TestEditTable />

                    {/* <Button type="primary" onClick={this.handleLinkBtn} >点击</Button> */}

                    <AddPhotoView />
                    <br ></br>

                    <img alt="example" style={{ width: '100%' }} src="http://localhost:9999/avatar/dali.jpg"/>
        

                    <UploadMy />

                    <Timeline pending="等你续写传奇..." reverse="true">
                            <Timeline.Item color="green">2013年 成都信息工程大学ACM校队创办 </Timeline.Item>
                            <Timeline.Item color="green">2013年 我校首次进入区域赛 </Timeline.Item>
                            <Timeline.Item color="green">2014年 我校首获CCPC(国际大学生程序设计竞赛)铜奖, 赛站: 长沙</Timeline.Item>
                            <Timeline.Item color="green">2015年 我校首获ICPC(国际大学生程序设计竞赛)铜奖, 赛站: 西安</Timeline.Item>
                            <Timeline.Item color="green">2016年 我校首获ICPC(国际大学生程序设计竞赛)银奖, 赛站: 大连</Timeline.Item>
                            <Timeline.Item color="green">2017年 我校首获ICPC(国际大学生程序设计竞赛)金奖, 赛站: 青岛</Timeline.Item>
                            <Timeline.Item color="green">2018年 我校首获CCPC(中国大学生程序设计竞赛)银奖, 赛站: 桂林</Timeline.Item>
                    </Timeline>
                    <Result
                        icon={<Icon type="smile" theme="twoTone" />}
                        title="请你继续加油哦~ "
                        extra={<Button type="primary">Next</Button>}
                    />,
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                    <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, the server is wrong."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                </Card>
            </div>
        );
    }
}

export default class Ttest extends React.Component {

    render() {
        return (
            <div>
                <TtestView />
            </div>
        );
    }
}