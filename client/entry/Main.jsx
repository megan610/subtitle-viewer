import _ from 'lodash';
import {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Layout, BackTop, Upload, message, Button, Icon, Dragger} from 'antd';
import Editor from 'wrap-md-editor';

import './style.less';

const formatMarkdownContent = (content = []) => {
    return content.map((item, index) => {
        const {chsTxt, engTxt} = item;
        /* eslint-disable no-useless-escape */
        return `+ ${chsTxt}\n ${engTxt.replace(/^\-/g, '')}\n\n`;
        /* eslint-enable no-useless-escape */
    }).join('');
};

const renderUpload = (onUploadChanged = _.noop) => {
    const uploadProps = {
        name: 'file',
        accept: '.ass',
        action: '/api/upload',
        headers: {
            authorization: 'authorization-text'
        },
        onChange: onUploadChanged
    };
    return (
        <section className="upload">
            <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                    点击或拖拽至此处上传
                </p>
                <p className="ant-upload-hint">
                    支持.ass格式文件
                </p>
            </Upload.Dragger>
        </section>
    );
};

const renderWithEditorMd = ({content = [], onUpdateHtmlData = _.noop}) => {
    return (
        <section className="show">
            <Link to="/preview">导出html预览</Link>
            <Editor
                key={new Date()}
                config={{
                    id: 'subtitle-editor',
                    markdown: formatMarkdownContent(content),
                    onload(editor, editorThis) {
                        const editorHtml = editorThis.getHTML();
                        onUpdateHtmlData(editorHtml);
                    }
                }}
            />
        </section>
    );
};

export default class Main extends PureComponent {

    static displayName = 'EntryMain';

    static propTypes = {
        children: PropTypes.node,
        content: PropTypes.array
    };

    static defaultProps = {
        children: null,
        content: []
    };

    render() {
        const {Content, Footer, Sider} = Layout;
        const {
            onUploadChanged,
            onUpdateHtmlData,
            content,
            pdf
        } = this.props;

        return (
            <Layout className="main">
                <Layout>
                    <Content className="main-body">
                        {renderUpload(onUploadChanged)}
                        {content.length > 0 && renderWithEditorMd({content, onUpdateHtmlData})}
                    </Content>
                </Layout>
                <Footer></Footer>
                <BackTop />
            </Layout>
        );
    }
}
