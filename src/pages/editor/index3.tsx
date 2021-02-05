import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default () => {
  const quill = useRef(null);
  const [value, setValue] = useState('<p>quill测试文本</p>');
  useLayoutEffect(() => {
    var options = {
      debug: 'info',
      modules: {
        toolbar: '#toolbar',
      },
      placeholder: 'Compose an epic...',
      readOnly: true,
      theme: 'snow',
    };
    quill.current = new Quill('#editor', options);
  }, []);
  return <div id="editor"></div>;
};
