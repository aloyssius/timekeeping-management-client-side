import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { formatCurrencyVnd } from '../../../../utils/formatCurrency';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// antd
import { Col, Row, Button, Space } from "antd"
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths"
// components
import Modal from '../../../../components/Modal';
import FormProvider from '../../../../components/hook-form/FormProvider';
import RHFInput from '../../../../components/hook-form/RHFInput';
// hooks
import useLoading from '../../../../hooks/useLoading';
import useNotification from '../../../../hooks/useNotification';


// ----------------------------------------------------------------------

ConstructionCreateEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentConstruction: PropTypes.object,
  isEditting: PropTypes.bool,
  onCloseEditting: PropTypes.func,
};

export default function ConstructionCreateEditForm({ isEdit, currentConstruction, onCloseEditting }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { onOpenLoading, onCloseLoading } = useLoading();
  const { onOpenSuccessNotify } = useNotification();

  const ConstructionSchema = Yup.object().shape({
    name: Yup.string().trim().required('Tên không được bỏ trống!')
  })

  const defaultValues = useMemo(
    () => ({
      name: '',
      totalMoney: '',
      amountReceived: '',
      // construction: currentProduct?.name || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [currentConstruction]
  );

  const methods = useForm({
    resolver: yupResolver(ConstructionSchema),
    defaultValues,
  });

  const {
    reset,
    register,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const resetAll = () => {
    reset();
    setOpen(false)

    if (!isEdit) {
      setTimeout(() => {
        navigate(PATH_DASHBOARD.construction.edit(323));
      }, 200);
    }
    else {
      setTimeout(() => {
        onCloseEditting();
      }, 200);
    }
  }

  const onSubmit = async (data) => {
    try {
      onOpenLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetAll();
      onCloseLoading();
      onOpenSuccessNotify('Cập nhật công trình thành công!')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Row className='mt-10'>
        <Col span={24}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <RHFInput
              label='Tên công trình'
              name='name'
              placeholder='Tên công trình có thể bao gồm cả địa chỉ ...'
              required={true}
            />

            <RHFInput
              label='Tiền công'
              name='totalMoney'
              placeholder='Tổng số tiền công của công trình ...'
              onChange={(e) => setValue('totalMoney', formatCurrencyVnd(e.target.value))}
            />

            <RHFInput
              label='Tiền công đã nhận'
              name='amountReceived'
              placeholder='Số tiền công mà khách hàng đã thanh toán ...'
              onChange={(e) => setValue('amountReceived', formatCurrencyVnd(e.target.value))}
            />

            <div className='mt-15 d-flex justify-content-between'>
              <Space>
                <Button
                  htmlType={!isValid ? 'submit' : 'button'}
                  onClick={() => {
                    if (isValid) {
                      setOpen(true);
                    }
                  }}
                  type='primary'
                >
                  Xác nhận
                </Button>
                <Button onClick={reset}>Làm mới</Button>
              </Space>
              {isEdit && <Button onClick={onCloseEditting} type='primary'>Xem chi tiết</Button>}
            </div>

          </FormProvider>
        </Col>
      </Row>

      <Modal
        title={`Xác nhận ${isEdit ? 'cập nhật' : 'thêm mới'}`}
        confirm={true}
        isOpen={open}
        onClose={() => setOpen(false)}
        children={`Bạn có chắc chắn muốn ${isEdit ? 'cập nhật' : 'thêm mới'} không?`}
        footer={
          <form onSubmit={handleSubmit(onSubmit)}>
            <Space>
              <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
              <Button htmlType='submit' type='primary'>Xác nhận</Button>
            </Space>
          </form>
        }
      >
      </Modal>
    </>
  )
}
