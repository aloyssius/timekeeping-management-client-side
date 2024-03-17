import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// antd
import { Input } from 'antd';

RHFInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.string,
  required: PropTypes.bool,
};

export default function RHFInput({ name, label, required, layout = 'vertical', ...other }) {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label &&
            <label className='mt-10 d-block'>
              {label}
              <span className={required && 'required'}></span>
            </label>
          }
          <Input className='mt-10' status={error && 'error'} {...field} {...other} />
          {error && <span className='color-red mt-3 d-block'>{error?.message}</span>}
        </>
      )}

    />
  )
}
