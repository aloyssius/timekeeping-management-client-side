import { useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom"
// antd
import { DatePicker, Select } from "antd"
import { DiffFilled } from "@ant-design/icons";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths"
// components
import Page from '../../../components/Page';
import Container from '../../../components/Container';
import IconButton from '../../../components/IconButton';
import Space from '../../../components/Space';
import { HeaderBreadcrumbs, HeaderAction } from '../../../components/HeaderSection';
import ConstructionCreateEditForm from '../../../sections/dashboard/construction/create-edit-form/ConstructionCreateEditForm';
import ConstructionDescriptions from '../../../sections/dashboard/construction/details/ConstructionDescriptions';
import ConstructionTimekeeping from '../../../sections/dashboard/construction/details/ConstructionTimekeeping';
// date
import moment from 'moment';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
// hooks
import useNotification from '../../../hooks/useNotification';
// _mock
import { _employee } from '../../../_mock/_employee';
import { _cost } from '../../../_mock/_cost';
import { constructionStatus, convertConstructionStatus } from '../../../_mock/_construction';

const { Option } = Select;

export default function ConstructionCreateEdit() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const { onOpenSuccessNotify } = useNotification();
  const [editting, setEditting] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());

  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }

  return (
    <>
      <Page title='Cập nhật công trình'>
        <Container>
          <HeaderBreadcrumbs
            heading={isEdit ? 'Cập nhật công trình' : 'Thêm công trình mới'}
            action={isEdit &&
              <Select
                defaultValue={'COMPLETED'}
                style={{ width: '130px' }}
                onSelect={() => setTimeout(() => onOpenSuccessNotify('Chuyển trạng thái thành công'), 200)}
              >
                {constructionStatus.slice(0, 2).map((status, index) => {
                  return (
                    <>
                      <Option key={index} value={status}>{convertConstructionStatus(status)}</Option>
                    </>
                  )
                })}
              </Select>
            }
            links={[
              {
                title: <Link to={PATH_DASHBOARD.construction.list}>Danh sách công trình</Link>,
              },
              {
                title: isEdit ? 'Cập nhật công trình' : 'Thêm công trình mới',
              },
            ]}
          />

          {isEdit && !editting &&
            <Space inner={true}
              title={
                <HeaderAction
                  headingStyle={{ fontSize: '19px', marginTop: "2.5px" }}
                  heading='Thông tin công trình'
                  action={
                    <IconButton
                      onClick={() => setEditting(true)}
                      icon={<DiffFilled />}
                      name='Sửa công trình'
                    >
                    </IconButton>
                  }
                  style={{ paddingBlock: "10px" }}
                />
              }
            >
              <ConstructionDescriptions
                currentConstruction={null}
              />
            </Space>
            ||
            <ConstructionCreateEditForm
              isEdit={isEdit}
              currentConstruction={null}
              onCloseEditting={() => setEditting(false)}
            />
          }
        </Container>

        {isEdit &&
          <Container className='mt-20'>
            <HeaderAction
              heading={'Quản lý chấm công'}
              action={
                <DatePicker locale={locale}
                  onChange={(newValue) => setFilterDate(newValue)}
                  // value={fo}
                  disabledDate={disabledDate}
                  format={'DD/MM/YYYY'}
                  placeholder='Chọn ngày chấm công'
                  style={{ width: "200px" }}
                />
              }
            />

            <ConstructionTimekeeping
              filterDate={filterDate}
              historyLink={
                <Link to={PATH_DASHBOARD.construction.history(123)} >Xem lịch sử chấm công</Link>
              }
              employees={_employee}
              costs={_cost}
            />
          </Container>
        }
      </Page>

    </>
  )

}
