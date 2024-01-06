import './style/index.less';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import Notice from '@/components/source-notice';
import { SourceMusicPrefix } from '@/constant/styles/index';
import { getHomeNewModuleData } from '@/api/content';
import SourceTable from '@/components/source-table';

interface NewModuleDataType {
  title: string;
  listData: string[];
}

const Music = memo(() => {
  const prefix = SourceMusicPrefix;
  
  return (
    <div className={prefix}>
      同人音声
    </div>
  );
});

export default Music;
