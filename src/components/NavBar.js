import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import '../styles/NavBar.css';

const _navBarProperties = [{
  direction: 'center',
  text: 'Eve',
  className: 'eveMenuDropDown',
  children: [
    {
      name: 'About Eve'
    },
    {
      name: 'View License'
    },
    {
      name: 'Version'
    },
    {
      name: 'Preferences'
    }
  ]
}, {
  direction: 'left',
  text: 'File',
  children: [
    {
      name: 'New File'
    },
    {
      name: 'Open'
    },
    {
      name: 'Save File'
    },
    {
      name: 'Save File As'
    }
  ]
}, {
  direction: 'left',
  text: 'Edit',
  children: null
}, {
  direction: 'left',
  text: 'Settings',
  children: null
}, {
  direction: 'left',
  text: 'Help',
  children: [
    {
      name: 'View Documentation'
    },
    {
      name: 'GitHub'
    },
    {
      name: 'Frequently Asked Questions'
    }
  ]
}];

const _initialState = _navBarProperties.map(function() { return false; });

const NavBar = React.createClass({
  getInitialState() {
    return {
      open: _initialState
    };
  },

  close(id) {
    var open = this.state.open;
    open[id] = false;
    this.setState({ open: open });
  },

  toggle(id) {
    var open = this.state.open;
    open[id] = !open[id];
    this.setState({ open: open });
  },

  getToggle(text, onClick, isOpen) {
    return (
      <div className={text === 'Eve' ? 'eveMenuDropDown' + (isOpen ? ' active' : '') : 'tab' + (isOpen ? ' active' : '')}>
        <button className={text === 'Eve' ? 'eveMenuText' : ''} type="button" onClick={onClick}>{text}</button>
      </div>
    );
  },

  click(id, name) {
    if (name === 'GitHub') { window.open("http://www.github.com/jacobsteves/eve"); }
    else if (name === 'Frequently Asked Questions') { window.open("http://www.github.com/jacobsteves/eve"); }
    else if (name === 'View Documentation') { window.open("http://www.github.com/jacobsteves/eve"); }
    else if (name === 'Preferences') { this.props.toggleEditMode(true) }
    else if (name === 'Save File') { this.props.toggleMustSave(true) }
    else { alert(name); }
    this.close(id);
  },

  _renderChildren(children) {
    return children.map((child, i) => {
      // <li className="separator" role="separator" />
      // component="a"
      return (
        <DropdownMenuItem key={i} action={this.click.bind(null, i, child.name)} childrenProps={{href: "#"}}>
          {child.name}
        </DropdownMenuItem>
      );
    });
  },

  render() {
      return (
          <div className={'navBarFiller'}>
            {_navBarProperties.map((item, i) => {
              return (
                <DropdownMenu
                    isOpen={this.state.open[i]}
                    forceCloseFunction={this.close.bind(this, i)}
                    toggle={this.getToggle(item.text, this.toggle.bind(this, i), this.state.open[i])}
                    direction={item.direction}
                    key={'item' + i}
                    className={'titleNav ' + item.className}>
                  <ul>
                    {item.children && this._renderChildren(item.children)}
                  </ul>
                </DropdownMenu>
              );
            })}
          </div>
      );
    }
});

const DropdownMenu = React.createClass({

  getDefaultProps() {
    return {
      direction: 'center',
      className: '',
      component: 'div'
    };
  },

  /* Only have the click events enabled when the menu is open */
  componentDidUpdate(prevProps, prevState) {
    if(this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside);
    } else if(!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  },

  /* If clicked element is not in the dropdown menu children, close menu */
  handleClickOutside(e) {
    var children = ReactDOM.findDOMNode(this).getElementsByTagName('*');
    for(var x in children) {
      if(children[x] == e.target) { return; }
    }

    this.props.forceCloseFunction(e);
  },

  handleKeyDown(e) {
    var key = e.which || e.keyCode;
    if(key !== 9) { // tab
      return;
    }

    var items = ReactDOM.findDOMNode(this).querySelectorAll('button,a');
    var id = e.shiftKey ? 1 : items.length - 1;
    if(e.target == items[id]) {
      this.props.forceCloseFunction(e);
    }
  },


  render() {
    var items = this.props.isOpen ? this.props.children : null;

    return (
      <div className={'dd-menu' + (this.props.className ? ' ' + this.props.className : '')}>
        {this.props.toggle}
        <CSSTransitionGroup
          transitionAppear={true}
          transitionLeaveTimeout={300}
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionName={'grow-from-' + this.props.direction}
          component="div"
          className="dd-menu-items"
          onKeyDown={this.handleKeyDown}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
});

const DropdownMenuItem = React.createClass({

  getDefaultProps() {
    return {
      tabIndex: 0,
      component: 'button',
      className: '',
      childrenProps: {}
    };
  },

  handleKeyDown(e) {
    var key = e.which || e.keyCode;
    if(key === 32) { // spacebar
      e.preventDefault(); // prevent page scrolling
      this.props.action();
    }
  },

  render() {
    var children = React.createElement(this.props.component, this.props.childrenProps, this.props.children);
    return (
      <li className={this.props.className} onClick={this.props.action}>
        {children}
      </li>
    );
  }
});

DropdownMenuItem.propTypes = {
  action: PropTypes.func.isRequired,
  childrenProps: PropTypes.object,
  tabIndex: PropTypes.number,
  component: PropTypes.oneOf(['button', 'a']),
  className: PropTypes.string
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  forceCloseFunction: PropTypes.func.isRequired,
  toggle: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['center', 'right', 'left']),
  className: PropTypes.string,
  component: PropTypes.oneOf(['div', 'span', 'li'])
}
export default NavBar;
