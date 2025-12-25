import React from 'react';
import '../assets/styles/components/Card.css';

const Card = ({ 
  children, 
  className = '', 
  padding = 'lg',
  hover = false,
  shadow = 'md',
  ...props 
}) => {
  const paddingClass = `card-padding-${padding}`;
  const shadowClass = `card-shadow-${shadow}`;
  const hoverClass = hover ? 'card-hover' : '';

  return (
    <div 
      className={`card ${paddingClass} ${shadowClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`card-description ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Card;