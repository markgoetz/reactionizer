import React from 'react';

const logos = require.context('../logos/');
logos.keys().forEach(logos);

export function component(props) {
  return (<svg className={props.className}>
    <use xlinkHref={`#${props.id}`} />
  </svg>);
}
component.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.string.isRequired,
};


export function inline(id) {
  const svgElement = document.getElementById(id);
  if (svgElement == null) throw new ReferenceError();

  const svg = svgElement.innerHTML;
  return `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    ${svg}
  </svg>`;
}
