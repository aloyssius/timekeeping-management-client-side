import PropTypes from 'prop-types';
import { formatDate } from 'date-fns';
import { displayCurrencyVnd } from '../../../../utils/formatCurrency';
// components
import Descriptions from '../../../../components/Descriptions';
// antd
import { Tag, } from 'antd';

ConstructionDescriptions.propTypes = {
  currentConstruction: PropTypes.object,
};

const numberStyle = {
  color: 'red',
  fontWeight: '500'
}

export default function ConstructionDescriptions({ currentConstruction }) {

  return (
    <Descriptions
      items={[
        {
          label: 'Tên công trình',
          text: '25b',
        },
        {
          label: 'Tổng số tiền công',
          text: displayCurrencyVnd(20000000),
          style: numberStyle,
        },
        {
          label: 'Tiền công đã nhận',
          text: displayCurrencyVnd(10000000),
          style: numberStyle,
        },
        {
          label: 'Ngày tạo',
          text: formatDate(new Date(), 'dd/MM/yyyy'),
        },
        {
          label: 'Tình trạng',
          node: (
            <Tag color="#108ee9">Đang làm</Tag>
          ),
        },
      ]}
    >
    </Descriptions>
  )
}
