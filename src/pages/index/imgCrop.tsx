import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload, Button } from 'antd';

interface Props {}
const ImgCropComp: React.FC<Props> = props => {
  const [fileList, setFileList] = useState<any[]>([]);
  return (
    <div>
      <ImgCrop
        modalTitle="图片剪切"
        modalOk="确定"
        modalCancel="取消"
        aspect={1 / 1}
      >
        <Upload
          fileList={fileList}
          onChange={({ fileList }) => {
            setFileList(fileList);
            console.log(fileList);
          }}
          listType="picture-card"
        >
          + Add image
        </Upload>
      </ImgCrop>
    </div>
  );
};
export default ImgCropComp;
