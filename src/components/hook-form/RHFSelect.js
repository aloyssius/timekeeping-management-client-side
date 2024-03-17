import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// antd
import { Select, Form } from 'antd';

RHFSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default function RHFSelect({ name, label, rules, children, ...other }) {

  const { control } = useFormContext();

  if (label) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item
            name={rules && name || null}
            label={label}
            rules={rules || undefined}
          >
            <Select
              {...field}
              {...other}
            >
              {children}
            </Select>
          </Form.Item>
        )}
      >
      </Controller>
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          {...other}
        >
          {children}
        </Select>
      )}
    >
    </Controller>
  )


}

