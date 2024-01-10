import './style/index.less';
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SourceMusicPrefix } from '@/constant/styles/index';
import { getSourceMusicMainData } from '@/api/content';
import SourceTable from '@/components/source-table';
import { AnyObject } from 'antd/es/_util/type';

interface NewModuleDataType {
  title: string;
  listData: string[];
}

interface TableDataType {
  id: string;
  title: string;
  url: string;
}

const Music = memo(() => {
  const prefix = SourceMusicPrefix;
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableDataType[][]>([[]]);

  useEffect(() => {
    const params = {};
    getSourceMusicMainData(params)
      .then((res) => {
        if (res?.status === 200) {
          hadnleTableData(res?.data || {});
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //处理音乐Card接口数据
  const hadnleTableData = (data: AnyObject = {}) => {
    const { row = 5, col = 4, count = 20, imgData = [] } = data;
    const imgTableData: TableDataType[][] = new Array(row).fill(0).map(() => new Array(col).fill(0));
    let index = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (index >= imgData.length) {
          break;
        }

        imgTableData[i][j] = imgData[index];
        index++;
      }
    }

    setTableData(imgTableData);
  };

  //音乐card 点击事件
  const onMusicCardClick = useCallback((id: string) => {
    return () => {
      navigate(`/music/${id}`)
    }
  }, [])

  //音乐Card渲染方法
  const musicCardRender = useCallback((data: TableDataType) => {
    const { id = '', title = '', url = '' } = data || {};
    return (
      <div className={`${prefix}-container-card`}>
        <div className={`${prefix}-container-card-content`} onClick={onMusicCardClick(id)}>
          <div className={`${prefix}-container-card-content-img`}>
            <img src={`${window.location?.origin}${url}`}></img>
          </div>
          <div className={`${prefix}-container-card-content-title`}>{title}</div>
        </div>
        <div className={`${prefix}-container-card-bottom`}></div>
      </div>
    );
  }, []);

  return (
    <div className={prefix}>
      <div className={`${prefix}-tab`}></div>
      <div className={`${prefix}-container`}>
        {tableData.map((item, index) => (
          <Row key={index}>
            {item.map((data, dataIndex) => (
              <Col key={dataIndex} span={Math.floor(24 / (item?.length || 1))}>
                {musicCardRender(data)}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
});

export default Music;
