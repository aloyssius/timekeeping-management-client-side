import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from "../../../routes/paths"
// components
import Page from '../../../components/Page';
import Container from '../../../components/Container';
import { HeaderBreadcrumbs } from '../../../components/HeaderSection';
import ConstructionTimekeeping from '../../../sections/dashboard/construction/details/ConstructionTimekeeping'
// antd
import { Select } from 'antd';
// hooks
import useNotification from '../../../hooks/useNotification';
// _mock
import { historyDateAgo, convertHistoryDateAgo } from '../../../_mock/_construction';
import { _employee } from '../../../_mock/_employee';
import { _cost } from '../../../_mock/_cost';

const { Option } = Select;
ConstructionTimekeeping.propTypes = {
  timekeepings: PropTypes.array,
}

export default function ConstructionHistoryTimeKeeping({ timekeepings }) {

  return (
    <Page title='Lịch sử chấm công'>
      <Container>
        <HeaderBreadcrumbs
          action={
            <Select
              placeholder='Chọn thời gian'
              style={{ width: '150px' }}
            >
              {historyDateAgo.map((date, index) => {
                return (
                  <>
                    <Option key={index} value={date}>{convertHistoryDateAgo(date)}</Option>
                  </>
                )
              })}
            </Select>
          }
          heading={'Lịch sử chấm công'}
          links={[
            {
              title: <Link to={PATH_DASHBOARD.construction.list}>Danh sách công trình</Link>,
            },
            {
              title: <Link to={PATH_DASHBOARD.construction.edit(123)}>Công trình name</Link>,
            },
            {
              title: 'Lịch sử công trình',
            },
          ]}
        >

        </HeaderBreadcrumbs>

        <ConstructionTimekeeping
          employees={_employee}
          costs={_cost}
        />
        <ConstructionTimekeeping
          // filterDate={filterDate}
          employees={_employee}
          costs={_cost}
        />
      </Container>
    </Page>
  )

}
