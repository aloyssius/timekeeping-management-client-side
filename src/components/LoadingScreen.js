import { AtomSpinner } from 'react-epic-spinners';
import { useEffect, useState } from 'react';
import { Progress } from 'antd';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// ----------------------------------------------------------------------

const rootStyle = {
  backgroundColor: 'white',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(90, 89, 89, 0.255)',
  padding: '20px',
  height: '500px',
  width: '100%'
}

// ----------------------------------------------------------------------

export default function LoadingScreen({ }) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });
  return (
    <>
    </>
  );
}
