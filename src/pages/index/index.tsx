import ImageModal from './components/ImageModal';
import imgPlaceholder from './img';
import React, { useRef, useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Form, Image, ImageViewer, Slider } from 'antd-mobile';
import { getDataUrl, dataURLtoBlob } from '@/utils/file';
import { isEmpty } from 'lodash';
import { PicturesOutline, RedoOutline } from 'antd-mobile-icons';
import { useDebounceFn } from 'ahooks';
import fiveStars from '@/assets/public/fiveStars.png';

const size = 500;
const scale = 369 / 303;

const initialValues = {
  starSize: 126,
  gradualChangeSize: 520,
  gradualChangePosition: -76,
  gradualChangeSection: 4,
};

export default function IndexPage() {
  const [form] = Form.useForm();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fiveStarsRef = useRef<HTMLImageElement>(null);

  const [imgData, setImgData] = useState(imgPlaceholder);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [generateImg, setGenerateImg] = useState('');
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  useEffect(() => {
    generate();
  }, []);

  const { run: sliderChange } = useDebounceFn(
    () => {
      generate();
    },
    {
      wait: 300,
    },
  );

  const generate = async (baseImg: string = imgData) => {
    const { starSize, gradualChangeSize, gradualChangePosition, gradualChangeSection } = form.getFieldsValue();

    if (!canvasRef.current || !imageRef.current || !fiveStarsRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    ctx!.clearRect(0, 0, size, size);
    
    imageRef.current.src = baseImg;
    imageRef.current.onload = () => {
      ctx!.drawImage(imageRef.current!, 0, 0, size, size);
      // 填充渐变
      const radgrad = ctx!.createRadialGradient(
        0,
        gradualChangePosition,
        0,
        0,
        gradualChangePosition + 100,
        (gradualChangeSize * 1.414) / 1.5,
      );
      radgrad.addColorStop(0, '#d80203');
      radgrad.addColorStop(gradualChangeSection / 10, 'rgba(216,2,3,0.8)');
      radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx!.fillStyle = radgrad;
      ctx!.fillRect(0, 0, size, size);

      fiveStarsRef.current!.src = fiveStars;
      fiveStarsRef.current!.onload = () => {
        // 填充星星
        ctx!.drawImage(
          fiveStarsRef.current!,
          0,
          0,
          fiveStarsRef.current!.width,
          fiveStarsRef.current!.height,
          20,
          20,
          starSize * scale,
          starSize,
        );
        setGenerateImg(canvasRef.current!.toDataURL('image/png', 1));
      };
    };
  };

  const getFile = async () => {
    if (!isEmpty(inputRef.current?.files)) {
      const file = inputRef.current!.files![0];
      inputRef.current!.value = '';
      const base64 = await getDataUrl(file);
      setImgData(base64);
      setImageModalVisible(true);
    }
  };

  const handleReset = () => {
    form.resetFields();
    generate();
  };

  const onConfirm = (data: string) => {
    setImgData(data);
    generate(data);
    setImageModalVisible(false);
  };

  const downloadFile = () => {
    window.location.href = generateImg;
  };

  const imageModalProps = {
    imageModalVisible,
    onClose: setImageModalVisible,
    imgData,
    onConfirm,
  };

  return (
    <div className={styles.page}>
      <div className={styles.avatar}>
        <img
          src={generateImg}
          onClick={() => {
            setImageViewerVisible(true);
          }}
        />
        <div className={styles.avatarRight}>
          <div className={styles.avatarRightItem}>
            <PicturesOutline fontSize={32} />
            <div>更换图片</div>
            <input
              onInput={() => getFile()}
              ref={inputRef}
              className={styles.input}
              type="file"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className={styles.avatarRightItem} onClick={handleReset}>
            <RedoOutline fontSize={32} />
            <div>重置参数</div>
          </div>
        </div>
      </div>

      <div className={styles.sliders}>
        <Form
          form={form}
          footer={
            <a className={styles.download} href={generateImg} download="avatar.png">
              下载
            </a>
          }
          initialValues={initialValues}
        >
          <Form.Item name="starSize" label="星星大小">
            <Slider min={50} max={size / 2} onAfterChange={sliderChange} />
          </Form.Item>
          <Form.Item name="gradualChangeSize" label="渐变大小">
            <Slider max={size * 1.5} min={size / 2} onAfterChange={sliderChange} />
          </Form.Item>
          <Form.Item name="gradualChangePosition" label="渐变位置">
            <Slider max={100} min={-200} onAfterChange={sliderChange} />
          </Form.Item>
          <Form.Item name="gradualChangeSection" label="渐变区间">
            <Slider max={8} min={2} onAfterChange={sliderChange} />
          </Form.Item>
        </Form>
      </div>

      <ImageModal {...imageModalProps} />

      <ImageViewer
        image={generateImg}
        visible={imageViewerVisible}
        onClose={() => {
          setImageViewerVisible(false);
        }}
      />

      <canvas width={size} height={size} ref={canvasRef} style={{ display: 'none' }} />

      <img
        ref={imageRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'none',
        }}
      />
      <img
        ref={fiveStarsRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'none',
        }}
        width={369}
        height={303}
      />
    </div>
  );
}
