import { useState } from 'react';
import PropTypes from 'prop-types';
import { displayCurrencyVnd } from '../../../../utils/formatCurrency';
import { formatDate } from 'date-fns';
// components
import { HeaderAction } from '../../../../components/HeaderSection';
import IconButton from '../../../../components/IconButton';
import AvatarName from '../../../../components/AvatarName';
import TimeKeepingCreateEditFormModal from '../create-edit-form/TimeKeepingCreateEditFormModal';
import Space from '../../../../components/Space';
// antd
import { Space as SpaceAntd } from 'antd';
import { FileAddFilled, UserOutlined } from "@ant-design/icons";

ConstructionTimekeeping.propTypes = {
  filterDate: PropTypes.instanceOf(Date),
  employees: PropTypes.array,
  costs: PropTypes.array,
  historyLink: PropTypes.node,
}

const numberStyle = {
  color: 'red',
  fontWeight: '500'
}

const labelStyle = {
  fontWeight: '500',
  fontSize: '16px',
  display: 'block',
}

export default function ConstructionTimekeeping({ filterDate, employees, costs, historyLink }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const isToday = new Date(filterDate).toDateString() === today.toDateString();

  return (
    <>
      <Space inner={true}
        title={
          <HeaderAction
            headingCustom={
              <span className='fs-17' style={{ marginTop: "2.5px" }}>
                {isToday && 'Hôm nay'} {" "}
                <span className='root-color'>
                  {isToday && '('}Ngày
                  {formatDate(new Date(filterDate || today), ' dd/MM/yyyy')}
                  {isToday && ')'}
                </span>
              </span>
            }
            action={
              <IconButton
                type={'primary'}
                onClick={() => setOpen(true)}
                icon={<FileAddFilled />}
                name='Chấm công'
              >
              </IconButton>
            }
            style={{ paddingBlock: "10px" }}
          />
        }
      >
        <span style={labelStyle}>Danh sách công nhân được chấm công:</span>
        {!employees && <span className='fs-15 fw-500 color-red'> (Chưa có công nhân nào được chấm công)</span>}

        <SpaceAntd className='mt-15' wrap>
          {employees && employees.map((emp) => {
            return (
              <>
                <AvatarName
                  displayNameStyle={{ marginTop: "3px" }}
                  key={emp.id}
                  size={30}
                  icon={!emp.avatar && <UserOutlined />}
                  src={emp.avatar && emp.avatar}
                  displayName={`${emp.fullName} (${emp.phoneNumber})`}
                />
              </>
            )
          })
          }
        </SpaceAntd>

        <span style={{ ...labelStyle, marginTop: '30px' }}>Chi phí phát sinh: </span>
        {!costs && <span className='fs-15 fw-500 color-red'> (Chưa có chi phí phát sinh)</span>}

        {costs && costs.map((cost) => {
          return (
            <>
              <div className='cost mt-7'>
                <span>{`${cost.costType}: `}</span>
                <span style={numberStyle}>{` ${displayCurrencyVnd(cost.total)}`}</span>
              </div>
            </>
          )
        })}
      </Space>

      <div className='text-center mt-15'>
        {historyLink}
      </div>

      <TimeKeepingCreateEditFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        employees={employees}
      />

    </>
  )

}
