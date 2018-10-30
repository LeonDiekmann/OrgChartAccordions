import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import requestAnimationFrame from './utils/requestAnimationFrame';

const CLOSE = 1;

const OPEN = 2;

export default class PictureAccordion extends Component {
    static propTypes = {
        head: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.node.isRequired,
        renderClosed: PropTypes.bool,
        dataGroup: PropTypes.string,
        className: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.instanceOf(Object),
        styleBody: PropTypes.instanceOf(Object),
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        defaultOpened: PropTypes.bool,
        reference: PropTypes.func,
        autogrow: PropTypes.bool,
        open: PropTypes.bool,
        removeContentClosed: PropTypes.bool,
        picture: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        className: '',
        dataGroup: null,
        id: null,
        renderClosed: false,
        style: null,
        styleBody: null,
        onOpen: null,
        onClose: null,
        defaultOpened: null,
        reference: null,
        autogrow: false,
        open: undefined,
        removeContentClosed: false,
        picture: null
    };

    constructor(props) {
        super();

        this.state = {
            currentState: (props && props.defaultOpened) ? OPEN : CLOSE,
        };
    }

    componentWillMount() {
        const { open, className } = this.props;

        if (open || (className && className.indexOf('accordion--open') !== -1)) {
            this.setState({
                currentState: OPEN
            });
        }
    }

    componentDidMount() {
        const { className, autogrow } = this.props;
        const { currentState } = this.state;

        if (className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (currentState === OPEN) {
            if (autogrow && this.body) {
                this.body.style.setProperty('max-height', 'initial', 'important');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== undefined) {
            const { open } = this.props;
            const { currentState } = this.state;

            if (open !== nextProps.open) {
                this.setState({
                    currentState: nextProps.open ? OPEN : CLOSE
                });
            }
            if (!nextProps.open && !currentState === CLOSE) {
                this.setState({
                    currentState: CLOSE
                });
            }
        }
    }

    componentDidUpdate() {
        const { autogrow } = this.props;
        const { currentState } = this.state;

        if (autogrow && this.body) {
            if (currentState === OPEN) {
                this.body.style.setProperty('max-height', 'initial', 'important');
            } else if (currentState === CLOSE) {
                this.body.style.maxHeight = null;
            }
        }
    }

    getBody() {
        const { renderClosed, children, removeContentClosed } = this.props;
        const { currentState } = this.state;

        if (currentState === OPEN || renderClosed || (this.rendered && !removeContentClosed)) {
            this.rendered = true;
            return children;
        }
        return null;
    }

    handleAccordionClick = (event) => {
        const { currentState } = this.state;
        const { dataGroup } = this.props;

        if ((!dataGroup && currentState === OPEN) || this.accordion.classList.contains('accordion--open')) {
            this.accordionCloseListener(event);
        } else {
            this.accordionOpenListener(event);
        }
    }

    accordionCloseListener(event) {
        const { onClose, autogrow } = this.props;

        if (autogrow && this.body) {
            this.body.style.setProperty('max-height', '9999px', 'important');
        }

        requestAnimationFrame(() => {
            this.setState({
                currentState: CLOSE
            });
            this.body.style.removeProperty('max-height');
        });

        if (onClose) {
            onClose(event);
        }
    }

    accordionOpenListener(event) {
        const { onOpen, dataGroup } = this.props;

        if (dataGroup) {
            document.querySelectorAll(`.accordion[data-group="${dataGroup}"].accordion--open`).forEach((node) => {
                if (node.classList.contains('.accordion--trigger')) {
                    node.click();
                } else {
                    const trigger = node.querySelectorAll('.accordion--trigger');
                    if (trigger.length > 0) {
                        trigger[0].click();
                    }
                }
            });

            this.accordion.classList.add('accordion--open');
        }

        this.setState({
            currentState: OPEN
        });

        if (onOpen) {
            onOpen(event);
        }
    }

    render() {
        const {
            dataGroup,
            id,
            style,
            className,
            styleBody,
            reference,
            head
        } = this.props;

        const { currentState } = this.state;

        return (
            <div
                className={classNames({
                    accordion: true,
                    'accordion--open': currentState === OPEN,
                    [className]: className
                })}
                data-group={dataGroup}
                ref={(ref) => {
                    this.accordion = ref;
                    if (reference) reference(ref);
                }}
                id={id}
                style={style}
            >
                <div
                    className={classNames('accordion__head')}
                    ref={(ref) => {
                        this.accordionHead = ref;
                    }}
                    
                />
                <td>
                    <img src={'https://sub60.tobit.com/u/666-39847?size=112'} style={{ padding: '10px'}}></img>
                    <p style={{ textAlign: 'center' }}>dsfsdgsdf</p>
                </td>
                <td>
                    <img src={'https://sub60.tobit.com/u/666-39847?size=112'} style={{ padding: '10px'}}></img>
                    <p>safsadfas</p>
                </td>
                <td>
                    <img src={'https://sub60.tobit.com/u/666-39847?size=112'} style={{ padding: '10px'}}></img>
                </td>

            </div>
        );
    }
}
