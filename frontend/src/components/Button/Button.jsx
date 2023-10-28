import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from './Button.module.scss'

const cx = classNames.bind(styles);
// eslint-disable-next-line jsdoc/require-jsdoc
function Button({
  to,
  href,
  className,
  children,
  onClick,
  ...passProps
  }) {
  let Comp = 'button';

  const props = {
    onClick,
    ...passProps
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disabled) {
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function'){
        delete props[key];
      }
    })
  }

  const classname = cx('wrapper', {
    className
  });
  return ( 
    <Comp className={classname} {...props}>
      <span> { children } </span>
    </Comp>
  );
}

export default Button;