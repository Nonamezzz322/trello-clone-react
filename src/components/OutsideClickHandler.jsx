// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';

// export default class OustideClickHandler extends Component {
//   static propTypes = {
//     children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
//     onClickInside: PropTypes.func,
//     onClickOutside: PropTypes.func,
//     shouldListenClick: PropTypes.bool
//   };

//   static defaultProps = {
//     shouldListenClick: true
//   };

//   id = uuidv4();

//   componentDidMount() {
//     window.addEventListener('click', this.handleOutsideClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.handleOutsideClick);
//   }

//   handleOutsideClick = e => {
//     if (!this.props.shouldListenClick) {
//       return;
//     }
//     console.log(props);
//     if (document.getElementById(this.id).contains(e.target)) {
//       if (this.props.onClickInside) {
//         this.props.onClickInside();
//       }
//     } else if (this.props.onClickOutside) {
//       this.props.onClickOutside(e);
//     }
//   };

//   render() {
//     return <div id={this.id}>{this.props.children}</div>;
//   }
// }

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function OustideClickHandler(props) {
  const {
    shouldListenClick = true,
    onClickInside,
    onClickOutside,
    children
  } = props;
  const id = uuidv4();

  const handleOutsideClick = e => {
    if (!shouldListenClick) {
      return;
    }
    if (document.getElementById(id).contains(e.target)) {
      if (onClickInside) {
        props.onClickInside(e);
      }
    } else if (onClickOutside) {
      props.onClickOutside(e);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
  }, []);

  return <div id={id}>{children}</div>;
}

OustideClickHandler.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  onClickInside: PropTypes.func,
  onClickOutside: PropTypes.func,
  shouldListenClick: PropTypes.bool
};

export default OustideClickHandler;
