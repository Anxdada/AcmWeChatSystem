import React from 'react';

export default class FloatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    handleScroll() {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 100) {
            this.setState({
                show: true,
            })
        } else {
            this.setState({
                show: false,
            })
        }
    }

    backTop = () => {
        document.documentElement.scrollTop = 0;
    }
}
