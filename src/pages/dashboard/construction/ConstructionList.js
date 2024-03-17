import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import { API_CONSTRUCTION } from '../../../_api/_apiConstruction';
import { convertConstructionStatus, convertConstructionStatusColor, _construction } from '../../../_mock/_construction';
import { displayCurrencyVnd } from '../../../utils/formatCurrency';
import { FaPenToSquare } from "react-icons/fa6";
// antd
import { Badge, Button, Input, Segmented, Table, Tag } from 'antd';
import { FileAddFilled, SearchOutlined } from '@ant-design/icons';
// routes
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
import './construction-style.css'
// components
import Page from '../../../components/Page';
import Container from '../../../components/Container';
import { HeaderAction } from '../../../components/HeaderSection';
import IconButton from '../../../components/IconButton';
import Space from '../../../components/Space';
import Skeleton from '../../../components/Skeleton';

const columns = [
  {
    title: 'Công Trình',
    align: "center",
    render: (text, record) => {
      return (
        <>
          <span className='fw-500'>
            {record.name}
          </span>
          <span style={{ color: 'red' }}>
            {` (${displayCurrencyVnd(record.totalMoney)})`}
          </span>
        </>
      )
    },
  },
  {
    title: 'Trạng Thái',
    align: "center",
    render: (text, record) => {
      return (
        <Tag className='ms-10' color={convertConstructionStatusColor(record.status)} >{convertConstructionStatus(record.status)}</Tag>
      )
    },
  },
  {
    title: 'Thao tác',
    align: "center",
    render: (text, record) => {
      return (
        <Link to={PATH_DASHBOARD.construction.edit(record.id)}>
          <FaPenToSquare className='mt-8 fs-20' />
        </Link>
      )
    },
  },
];

const options = [
  {
    label: (
      <>
        Đang làm
        <Badge color={"blue"} className='ms-8 mb-3' count={2} />
      </>
    ),
    value: 1
  },
  {
    label: (
      <>
        Chưa làm
        <Badge className='ms-8 mb-3' count={2} />
      </>
    ),
    value: 2
  },
  {
    label: (
      <>
        Đã làm xong
        <Badge color={'green'} className='ms-8 mb-3' count={2} />
      </>
    ),
    value: 3
  },
];

export default function ConstructionList() {
  const { data, loading, remove } = useFetch(API_CONSTRUCTION.getAll);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Page title='Danh sách công trình'>
        <Container>
          <HeaderAction
            heading='Danh sách công trình'
            action={
              <Link to={PATH_DASHBOARD.construction.create}>
                <IconButton
                  name='Thêm Công Trình'
                  icon={<FileAddFilled />}
                />
              </Link>
            }
          >
          </HeaderAction>

          <Space className='mt-15 d-flex'
            title={
              <div
                className='d-flex justify-content-between'
                style={{ padding: "8px 0px 8px 0px" }}>
                <Skeleton
                  loading={loading}
                  style={{ width: '35%' }}
                  size='small'
                  type='input'
                  component={
                    <Segmented
                      style={{ padding: "8px 8px 8px 8px" }}
                      options={options}
                      onChange={(value) => {
                        console.log(value);
                      }}
                    />
                  }
                />
                {selectedRowKeys.length > 0 &&
                  <Button
                    className='remove-cons-not-mobile ms-10 mt-8'
                    danger
                    type="primary"
                  >
                    <span className='fw-500'>
                      Xóa
                    </span>
                  </Button>
                }
              </div>
            } >
            <div className='d-flex justify-content-between'>
              <Skeleton
                loading={loading}
                style={{ width: '100%' }}
                size='small'
                type='input'
                component={
                  <Input
                    addonBefore={<SearchOutlined />}
                    placeholder="Tìm kiếm công trình theo tên, tiền công..." />
                }
              />
              {selectedRowKeys.length > 0 &&
                <Button
                  className='remove-cons-is-mobile ms-10'
                  danger
                  type="primary"
                  onClick={() => remove('/constructions/1')}
                >
                  <span className='fw-500'>
                    Xóa
                  </span>
                </Button>
              }
            </div>
            <Table
              className='mt-10'
              rowKey={"id"}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              locale={{
                emptyText: (
                  <Skeleton
                    loading={loading}
                    style={{ width: '100%' }}
                    type='table'
                    size='small'
                  />
                )
              }}
            />
          </Space>
        </Container>
      </Page>
    </>
  )
}
