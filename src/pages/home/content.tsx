import './style/index.less';
import { useCallback, useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import Notice from '@/components/source-notice';
import { SourceHomePrefix } from '@/constant/styles/index';
import { getHomeNewModuleData } from '@/api/content';

interface NewModuleDataType {
  title: string;
  listData: string[];
}

const Home = () => {
  const prefix = SourceHomePrefix;
  const [newModuleData, setNewModuleData] = useState<NewModuleDataType[]>([]);

  useEffect(() => {
    const params = {};
    getHomeNewModuleData(params)
      .then((res) => {
        if (res?.status === 200) {
          setNewModuleData(res?.data || []);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //最新讨论等list渲染方法
  const newModuleRender = useCallback(() => {
    return (
      <>
        {newModuleData.map((item: NewModuleDataType) => {
          const { title = '', listData = [] } = item || {};
          return (
            <div className={`${prefix}-new-part`}>
              <div className={`${prefix}-new-part-tile`} title={title}>
                {title}
              </div>
              <div className={`${prefix}-new-part-list`}>
                <List
                  dataSource={listData}
                  renderItem={(item: string = '') => (
                    <List.Item>
                      <div className={`${prefix}-new-part-list-row`}>
                        <div className={`${prefix}-new-part-list-row-dot`}></div>
                        <span className={`${prefix}-new-part-list-row-text`} title={item}>
                          {item}
                        </span>
                      </div>
                    </List.Item>
                  )}
                ></List>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [newModuleData]);

  return (
    <div className={prefix}>
      <div className={`${prefix}-notice`}></div>
      <div className={`${prefix}-new`}>{newModuleRender()}</div>
    </div>
  );
};

export default Home;
