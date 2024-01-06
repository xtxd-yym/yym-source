import './style/index.less';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SourceTablePrefix } from '@/constant/styles/index';
import { getSourceTableData } from '@/api/content';
import { AnyObject } from 'antd/es/_util/type';

interface SourceTableProps {
  title?: string;
}

const SourceTable = memo((props: SourceTableProps = {}) => {
  const navigate = useNavigate();
  const prefix = SourceTablePrefix;
  const { title = '' } = props;

  const [tableHide, setTableHide] = useState<boolean>(false);
  const [columnsDataIndex, setColumnsDataIndex] = useState<string[]>([]);
  const [tableData, setTableData] = useState<AnyObject[]>([]);

  useEffect(() => {
    const params = {
      type: 'diffuse',
    };
    getSourceTableData(params)
      .then((res) => {
        if (res?.status === 200) {
          setColumnsDataIndex(res?.data?.dataIndex || []);
          setTableData(res?.data?.tableData || []);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //底部table展开收缩回调
  const onShrinkClick = useCallback(() => {
    setTableHide((pre) => !pre);
  }, []);

  //table板块名称点击回调
  const onPlateClick = useCallback((path: string = "") => {
    return () => {
      navigate(path);
    }
  }, [])

  //table的板块列自定义渲染方法
  const tablePlateRender = useCallback((_: any, data: AnyObject = {}) => {
    return (
      <div className={`${prefix}-container-list-row`}>
        <span className={`${prefix}-container-list-row-plate`} onClick={onPlateClick(data?.path || "")}>{data.plate || ''}</span>
      </div>
    );
  }, []);

  //自定义渲染表格列
  const getColumns = (dataIndex: string): any => {
    switch (dataIndex) {
      case 'number':
        return { title: '数量', dataIndex: 'number', key: 'number' };
      case 'plate':
        return { title: '板块', dataIndex: 'plate', key: 'plate', render: tablePlateRender };
      case 'latest':
        return { title: '最新', dataIndex: 'latest', key: 'latest' };
    }
  };

  return (
    <div className={prefix}>
      <div className={`${prefix}-title`} title={title}>
        {title}
        <div className={`${prefix}-title-shrink`} onClick={onShrinkClick}>
          {tableHide ? <DownOutlined /> : <UpOutlined />}
        </div>
      </div>
      <div className={`${prefix}-container`}>
        {columnsDataIndex.length > 0 && (
          <Table columns={columnsDataIndex.map((item) => getColumns(item))} dataSource={tableData} pagination={false} />
        )}
      </div>
    </div>
  );
});

export default SourceTable;
