import { Select, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import AvatarName from '../../../../components/AvatarName';
import Modal from '../../../../components/Modal';
import { UserOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useForm, Controller } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import FormProvider from '../../../../components/hook-form/FormProvider';
import RHFInput from '../../../../components/hook-form/RHFInput';
import { formatCurrencyVnd } from '../../../../utils/formatCurrency';
import { costs, convertCost } from '../../../../_mock/_cost';
import useNotification from '../../../../hooks/useNotification';
import useResponsive from '../../../../hooks/useResponsive';
import { isBlankStr } from '../../../../utils/validateHelper';
import isEmpty from 'lodash/isEmpty';
import useLoading from '../../../../hooks/useLoading';


TimeKeepingCreateEditFormModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  employees: PropTypes.array,
}

const [eatDrink, toolMaterial, other] = costs;

const { Option } = Select;

const AvatarEmp = ({ avtSize, avtStyle, boxStyle, emp }) => {
  if (emp) {
    return (
      <div style={{ ...boxStyle }}>
        <AvatarName style={{ ...avtStyle }}
          displayName={`${emp.fullName} (${emp.phoneNumber})`}
          key={emp.id}
          size={avtSize}
          icon={!emp.avatar && <UserOutlined />}
          src={emp.avatar && emp.avatar}
        />
      </div>
    )
  }
}

export default function TimeKeepingCreateEditFormModal({ isOpen, onClose, employees }) {
  const { isMobile } = useResponsive();
  const { onOpenSuccessNotify, onOpenErrorNotify } = useNotification();
  const { onOpenLoading, onCloseLoading } = useLoading();

  const [open, setOpen] = useState(false);
  const [selectedCosts, setSelectedCosts] = useState([]);

  const handleCloseOpen = () => {
    setOpen(false);
  }

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCosts((prevSelectedCosts) => [...prevSelectedCosts, value]);
    } else {
      setSelectedCosts((prevSelectedCosts) => prevSelectedCosts.filter((type) => type !== value));
    }
  };

  const defaultValues = useMemo(
    () => ({
      selectedEmployees: [],
      eatDrink: '',
      toolMaterial: '',
      other: '',
      typeOther: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [currentConstruction]
  );

  const methods = useForm({
    defaultValues
  });

  const {
    reset,
    register,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const resetAll = () => {
    reset();
    setSelectedCosts([]);
    onClose();
    handleCloseOpen();
  }

  const onSubmit = async (data) => {
    try {
      onOpenLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetAll();
      onCloseLoading();
      onOpenSuccessNotify('Đã chấm công thành công ngày hôm nay! ');
    } catch (error) {
      console.error(error);
    }
  }
  const validateTimeKeepingForm = () => {
    const requiredCosts = [
      { name: eatDrink, message: 'Bạn chưa nhập chi phí phát sinh ăn uống!' },
      { name: toolMaterial, message: 'Bạn chưa nhập chi phí phát sinh vật liệu, dụng cụ!' },
    ];
    const messageOther = 'Bạn chưa nhập đầy đủ thông tin chi phí phát sinh khác!';

    const showErrorMessageNotification = (message) => {
      onOpenErrorNotify(message);
    }

    const isEmptyCost = (cost) => {
      return isEmpty(watch(cost));
    }

    for (const req of requiredCosts) {
      if (selectedCosts.includes(req.name) && isEmptyCost(req.name)) {
        showErrorMessageNotification(req.message);
        return false;
      }
    }
    if (selectedCosts.includes(other) && (isEmptyCost(other) || isBlankStr(watch('typeOther')))) {
      showErrorMessageNotification(messageOther);
      return false;
    }

    return true;
  }

  const handleChangeTotalMoney = (event, costType) => {
    const value = event.target.value;
    setValue(costType, formatCurrencyVnd(value));
  }

  return (
    <>
      <Modal
        title='Tiến hành chấm công'
        isOpen={isOpen}
        onFinish={() => setOpen(true)}
        onClose={onClose}
        icon={
          <ExclamationCircleFilled className='root-color' style={{ fontSize: "25px" }} />
        }
        style={{ marginTop: "-30px" }}
        buttonCancelText='Đóng'
        buttonConfirmText='Đồng ý'
      >
        <span className='fw-500 fs-15'>Chọn công nhân</span>

        <FormProvider methods={methods}>
          <Controller
            name='selectedEmployees'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                optionLabelProp='display'
                allowClear
                placeholder='Danh sách công nhân hiện tại'
                filterOption={(input, option) => {
                  return (
                    option.filterName.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.filterPhone.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );

                }}
                maxTagCount={5}
                maxTagPlaceholder={`+ ${getValues('selectedEmployees').length - 5} công nhân`}
                style={{
                  width: '100%',
                  marginTop: "5px",
                }}
              >
                {employees.map((emp) => {
                  return (
                    <Option
                      value={emp.id}
                      key={emp.id}
                      filterName={`${emp.fullName}`}
                      filterPhone={`(${emp.phoneNumber})`}
                      display={
                        <AvatarEmp
                          avtSize={19}
                          avtStyle={{ marginTop: '2px' }}
                          emp={emp}
                        />
                      }
                    >
                      <AvatarEmp
                        avtSize={25}
                        boxStyle={{ padding: '5px' }}
                        emp={emp}
                      />
                    </Option>
                  )
                })}
              </Select>
            )}
          >
          </Controller>

          <hr className='mt-20' style={{ borderColor: '#f7f7f7' }} />

          <span className='fw-500 fs-15 d-block mt-15'>Chi phí phát sinh</span>
          {costs.map((costType, index) => {
            return (
              <>
                <Checkbox className={index === 0 ? 'mt-10' : 'mt-15'}
                  key={index}
                  checked={selectedCosts.includes(costType)}
                  onChange={handleCheckboxChange}
                  value={costType}
                >
                  {convertCost(costType)}
                </Checkbox>

                {selectedCosts.includes(costType) && (
                  <>
                    {costType === other &&
                      <RHFInput
                        name='typeOther'
                        placeholder='Nhập loại chi phí'
                      />
                    }
                    <RHFInput
                      name={costType}
                      placeholder='Nhập số tiền'
                      onChange={(event) => handleChangeTotalMoney(event, costType)}
                    />
                  </>
                )}
                {index !== costs.length - 1 && <br />}
              </>
            )
          })}

        </FormProvider>
      </Modal>

      <Modal
        style={{ marginTop: isMobile ? '100px' : '' }}
        isOpen={open}
        title='Xác nhận chấm công'
        onClose={handleCloseOpen}
        onFinish={() => {
          validateTimeKeepingForm() ? onSubmit() : setTimeout(handleCloseOpen, 100);
        }}
        confirm={true}
        buttonCancelText='Hủy bỏ'
        buttonConfirmText='Xác nhận'
      >
        Bạn có chắc muốn chấm công cho ngày hôm nay không ?
      </Modal>

    </>
  )

}
