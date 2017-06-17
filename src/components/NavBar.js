import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group'
import '../styles/NavBar.css';

const _navBarProperties = [{
  direction: 'center',
  text: 'Eve',
  className: 'eveMenuDropDown'
}, {
  direction: 'left',
  text: 'File'
}, {
  direction: 'left',
  text: 'Edit'
}, {
  direction: 'left',
  text: 'Settings'
}, {
  direction: 'left',
  text: 'Help'
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

  click(id) {
    alert(id);
    this.close(id);
  },

  // render() {
  //   return (
  //     <div className="navBar">
  //       <div
  //         onClick={() => console.log('Eve')}
  //         className={'eveMenuDropDown'}>
  //         Eve
  //       </div>
  //       <div onClick={() => console.log('File')}>File</div>
  //       <div onClick={() => console.log('Edit')}>Edit</div>
  //       <div onClick={() => console.log('Settings')}>Settings</div>
  //       <div onClick={() => console.log('Help')}>Help</div>
  //     </div>
  //   );
  // }

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
                    <DropdownMenuItem component="a" action={this.click.bind(null, i)} childrenProps={{href: "#"}}>Example 1</DropdownMenuItem>
                    <DropdownMenuItem action={this.click.bind(this, i)}>Example 2</DropdownMenuItem>
                    <DropdownMenuItem action={this.click.bind(this, i)}>Lorem ipsum pretend</DropdownMenuItem>
                    <li className="separator" role="separator" />
                    <DropdownMenuItem action={this.click.bind(this, i)}>Example 3</DropdownMenuItem>
                  </ul>
                </DropdownMenu>
              );
            })}
          </div>
      );
    }
});

const DropdownMenu = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    forceCloseFunction: React.PropTypes.func.isRequired,
    toggle: React.PropTypes.node.isRequired,
    direction: React.PropTypes.oneOf(['center', 'right', 'left']),
    className: React.PropTypes.string,
    component: React.PropTypes.oneOf(['div', 'span', 'li'])
  },

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
        <CSSTransitionGroup transitionName={'grow-from-' + this.props.direction} component="div"
                          className="dd-menu-items" onKeyDown={this.handleKeyDown}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
});

const DropdownMenuItem = React.createClass({
  propTypes: {
    action: React.PropTypes.func.isRequired,
    childrenProps: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    component: React.PropTypes.oneOf(['button', 'a']),
    className: React.PropTypes.string
  },

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


export default NavBar;
