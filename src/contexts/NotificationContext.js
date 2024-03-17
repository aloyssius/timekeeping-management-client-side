import PropTypes from 'prop-types';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  onOpenSuccessNotify: () => { },
  onOpenErrorNotify: () => { },
  onOpenWarningNotify: () => { },
  onOpenInfoNotify: () => { },
}

const NotificationContext = createContext(initialState);

// ----------------------------------------------------------------------

NofiticationProvider.propTypes = {
  children: PropTypes.node,
};

const emitterToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
}

function NofiticationProvider({ children }) {
  const successNotify = (message) => toast.success(message, { emitterToast });
  const errorNotify = (message) => toast.error(message, { emitterToast });
  const warningNotify = (message) => toast.warning(message, { emitterToast });
  const infoNotify = (message) => toast.info(message, { emitterToast });

  return (
    <NotificationContext.Provider
      value={{
        onOpenSuccessNotify: successNotify,
        onOpenErrorNotify: errorNotify,
        onOpenWarningNotify: warningNotify,
        onOpenInfoNotify: infoNotify,
      }}
    >
      <ToastContainer limit={3} pauseOnFocusLoss={false} />
      {children}
    </NotificationContext.Provider>
  )

}
export { NofiticationProvider, NotificationContext }
