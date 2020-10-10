import React, { useState, Key } from 'react';
import { Card, Form, Upload, Button } from 'antd';
import styles from './index.less';
import DragBox from './component/DragBox';

interface Props {}
const ImageCropping: React.FC<Props> = props => {
  const width = 750,
    height = 450;
  const [imgurl, setImgurl] = useState<any>();
  const [imgWidth, setImgWidth] = useState<string | number>('auto');
  const [imgHeight, setImgHeight] = useState<string | number>('auto');
  const [startCropping, setStartCropping] = useState(false);
  const beforeUpload = (file: File) => {
    // tslint:disable-next-line:no-console
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = res => {
      setImgurl(res.target?.result);
    };
    return false;
  };
  const getBounder = (): {
    left: [number, number];
    top: [number, number];
    width: Key;
    height: Key;
  } => {
    let leftMin = 0,
      leftMax = width,
      topMin = 0,
      topMax = height;
    if (typeof imgWidth == 'number') {
      leftMin = (width - imgWidth) / 2;
      leftMax = leftMin + imgWidth;
    }
    if (typeof imgHeight == 'number') {
      topMin = (height - imgHeight) / 2;
      topMax = topMin + imgHeight;
    }
    // tslint:disable-next-line:no-console
    console.log({
      left: [parseInt(leftMin + ''), parseInt(leftMax + '')],
      top: [parseInt(topMin + ''), parseInt(topMax + '')],
    });
    return {
      left: [parseInt(leftMin + ''), parseInt(leftMax + '')],
      top: [parseInt(topMin + ''), parseInt(topMax + '')],
      width: imgWidth,
      height: imgHeight,
    };
  };
  return (
    <div>
      <Card style={{ width: 800, margin: '0 auto', marginTop: 50 }}>
        <Form>
          <Form.Item label="上传图片">
            <Upload
              beforeUpload={beforeUpload}
              accept=".png,.jpeg,.jpg"
              showUploadList={false}
            >
              <div className={styles.btn}>upload</div>
            </Upload>
          </Form.Item>
        </Form>
        <div
          className={styles.workZoom}
          style={{ width: width + 2, height: height + 2 }}
        >
          <img
            src={imgurl}
            id="target"
            alt=""
            style={{ width: imgWidth, height: imgHeight }}
            onLoad={e => {
              const w = e.currentTarget.width;
              const y = e.currentTarget.height;
              let resizeW = w,
                resizeY = y;
              if (resizeY > height) {
                resizeW = (height / y) * w;
                resizeY = height;
              }
              if (resizeW > width) {
                resizeY = (width / resizeW) * resizeY;
                resizeW = width;
              }
              // tslint:disable-next-line:no-console
              console.log(resizeY, resizeW);
              setImgWidth(resizeW);
              setImgHeight(resizeY);
            }}
          />
          {startCropping && <DragBox bounder={getBounder()} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
          <div
            className={`${styles.btn} ${!imgurl ? styles.disable : ''}`}
            style={{ margin: '0 auto' }}
            onClick={() => {
              if (imgurl) {
                setStartCropping(true);
              }
            }}
          >
            start cropping
          </div>
        </div>
        <div>
          <img id="clipTarget" src="" />
        </div>
      </Card>
    </div>
  );
};
export default ImageCropping;
