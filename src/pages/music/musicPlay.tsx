import './style/index.less';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import Notice from '@/components/source-notice';
import { SourceMusicPlayPrefix } from '@/constant/styles/index';
import { getSourceMusicPlayData } from '@/api/content';
import SourceTable from '@/components/source-table';
import { AnyObject } from 'antd/es/_util/type';
import { useParams } from 'react-router-dom';

interface MusicPlayData {
  url: string;
  title: string;
}

const MusicPlay = memo(() => {
  const prefix = SourceMusicPlayPrefix;
  const urlParams = useParams();

  const [imgUrl, setImgUrl] = useState<string>('');
  const [musicTitle, setMusicTitle] = useState<string>('');

  useEffect(() => {
    const params = {
      id: urlParams?.id || '',
    };
    getSourceMusicPlayData(params)
      .then((res) => {
        if (res?.status === 200) {
          hadnleMusicPlayData(res?.data || {});
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //处理音乐播放界面数据
  const hadnleMusicPlayData = useCallback((data: MusicPlayData) => {
    console.log(data);
    const { url = '', title = '' } = data || {};
    setImgUrl(url);
    setMusicTitle(title);
  }, []);

  return (
    <div className={prefix}>
      <div className={`${prefix}-top`}>
        <div className={`${prefix}-top-img`}>
          <img src={`${window.location?.origin}${imgUrl}`}></img>
        </div>
        <div className={`${prefix}-top-title`} title={musicTitle}>{musicTitle}</div>
      </div>
      <div className={`${prefix}-mid`}></div>
      <div className={`${prefix}-bottom`}></div>
    </div>
  );
});

export default MusicPlay;
