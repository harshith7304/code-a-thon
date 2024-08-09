import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
    {
      to: '/dashboard/service',
      title: 'View Service History',
    }
  ];

const Breadcrumb = ({ title, items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link key={index} to={item.to}>
          {item.title}
        </Link>
      ))}
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
