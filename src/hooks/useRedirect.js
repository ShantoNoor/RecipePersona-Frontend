import { useLocation, useNavigate } from "react-router-dom";

const useRedirect = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const redirect = () => {
    if (state?.pathname) {
      return navigate(state.pathname, {
        state: { title: state.title },
      });
    } else {
      return navigate("/");
    }
  };

  return redirect;
};

export default useRedirect;
