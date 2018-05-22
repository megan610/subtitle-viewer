import _ from 'lodash';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Layout, BackTop} from 'antd';

import './style.less';

export default class Main extends PureComponent {

    static displayName = 'PreviewMain';

    static propTypes = {};

    static defaultProps = {};

    render() {

        return (
            <div dangerouslySetInnerHTML={{__html: this.props.htmlData}}>
            </div>
        );
    }
}
