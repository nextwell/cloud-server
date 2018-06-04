
import React from 'react';

import { Menu, Icon, Modal, Button, Upload, message } from 'antd';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: "http:/\/localhost:8080/upload",
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} загружен успешно.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} не загрузился, ошибка.`);
    }
  },
};

export default class MainFunctions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  uploaderModal: false };
    }
    setUploaderVisible(uploaderModal) {
        this.setState({ uploaderModal });
    }
    render() {
        return (
            <Menu
                theme="light"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                selectable={false}
            >
                <Menu.Item key="1">
                    <Button icon="upload" onClick={() => this.setUploaderVisible(true)}>Загрузить</Button>
                </Menu.Item>
                <Modal
                  title="Загрузка файлов"
                  wrapClassName="vertical-center-modal"
                  visible={this.state.uploaderModal}
                  onOk={() => this.setUploaderVisible(false)}
                  onCancel={() => this.setUploaderVisible(false)}
                  okText="Ок"
                  cancelText="Закрыть"
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Кликните или перетащите файл для загрузки</p>
                        <p className="ant-upload-hint">Поддерживается как одиночная загрузка, так и множественная.</p>
                    </Dragger>
                </Modal>
            </Menu>
        );
    }
}