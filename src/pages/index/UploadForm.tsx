import React, { useState } from 'react';
import AddMetrialModal from '@/pages/ChannelManager/components/AddMetriaModal';
import { Button, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  value?: string;
  onChange?: Function;
}
const UploadForm: React.FC<Props> = props => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const getBase64Promise = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const imagePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Promise(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  const imagePreviewCancel = () => {
    setPreviewVisible(false);
  };
  const getBase64 = (img: string) => {
    const getBase64Image = (image: any, width?: number, height?: number) => {
      //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
      var canvas = document.createElement('canvas');
      canvas.width = width ? width : image.width;
      canvas.height = height ? height : image.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();
      return dataURL;
    };
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = img;
    if (img) {
      return new Promise((r, j) => {
        image.onload = () => {
          r(getBase64Image(image)); //将base64传给done上传处理
        };
        image.onerror = err => {
          j(err);
          // tslint:disable-next-line:no-console
          console.log(err);
        };
      });
    }
  };
  const handleOk = list => {
    const item = list[0];
    getBase64(item.materialUrl).then(
      base64 => {
        props.onChange?.(base64);
      },
      err => {
        props.onChange?.(item.materialUrl);
        console.log(err); //打印异常信息
      },
    );
  };
  return (
    <div>
      <Button
        onClick={() =>
          handleOk([
            {
              materialUrl:
                'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg',
            },
          ])
        }
        style={{ marginBottom: 10 }}
        icon={<PlusOutlined />}
      >
        上传图片
      </Button>
      {props.value ? (
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          fileList={[{ url: props.value, uid: '1' }]}
          onPreview={imagePreview}
          onRemove={() => {
            props.onChange?.(undefined);
          }}
        />
      ) : (
        ''
      )}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={imagePreviewCancel}
      >
        <img alt="背景图片" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
export default UploadForm;
