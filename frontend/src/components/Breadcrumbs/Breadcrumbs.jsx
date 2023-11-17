import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const subpaths = pathname.split('/');
  if (subpaths.length > 1 && subpaths[subpaths.length - 1] === '') {
    subpaths.pop();
  }
  return (
    <div>
      {
        subpaths.map((subpath, index) => (
          <Link key={subpath} to={subpaths.slice(0, index + 1).join('/')} className={index === subpaths.length - 1 ? 'text-blue-900' : 'text-blue-700'}>
            <span className='after:content-["/"]'>
              {` ${capitalize(subpath || 'home')} `}
            </span>
          </Link>
        ))
      }
    </div>
  );
}
