import Cropper from 'cropperjs';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import { Dialog } from 'antd-mobile';
import { getDataUrl } from '@/utils/file';
import 'cropperjs/dist/cropper.css';

interface Props {
  imageModalVisible: boolean;
  onClose(visible: boolean): void;
  onConfirm(data: string): void;
  imgData: string;
}

interface CProps {
  url: string;
  store: any;
}

const Content: React.FC<CProps> = (props) => {
  const { url, store } = props;
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      store.current = new Cropper(imageRef.current, {
        aspectRatio: 1,
        autoCropArea: 1,
        viewMode: 1,
        movable: false,
        zoomable: false,
      });
    }
  }, [url]);

  return (
    <div className={styles.image}>
      <img ref={imageRef} src={url} alt="图片" />
    </div>
  );
};

const ImageModal: React.FC<Props> = (props) => {
  const { imageModalVisible, onClose, imgData, onConfirm } = props;
  const cropperRef = useRef<any>(null);

  const handleConfirm = () => {
    cropperRef.current.getCroppedCanvas().toBlob(async (blob: Blob) => {
      const data = await getDataUrl(blob);
      onConfirm(data);
    });
  };

  return (
    <Dialog
      visible={imageModalVisible}
      title="裁切头像"
      onAction={(values) => {
        switch (values.key) {
          case 'cancel':
            onClose(false);
            break;
          case 'confirm':
            handleConfirm();
            break;
        }
      }}
      content={<Content url={imgData} store={cropperRef} />}
      actions={[
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '确认',
            bold: true,
          },
        ],
      ]}
    />
  );
};
export default ImageModal;
